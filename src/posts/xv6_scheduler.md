---
title: 'A Scheduler (and a lot of locks) in xv6'
summary: 'Our first of two projects in CS140 (operating systems) involved making a scheduler based on custom-specifications. Missing from those specifications was whether or not it should be able to handle multi-tasking. I ended up implementing it (and most of the other parts) anyway.'
thumbnail: /images/sqrt2.jpg
date: 2025-10-27
---

# A Scheduler (and a lot of locks) in xv6

We essentially made a scheduler based on specifications given to us. It was widly impractical and did not have much performance benefits (an expired and running set of processes, meaning that once a process was in the expired set, it would have to wait for a "flip" before running again), it was rather complicated to implement, so I believe it is at least a good demonstration of what we learned regarding OS programming.

## Specifications

<iframe
  src="https://drive.google.com/file/d/1dIVFp8nDAzRuU1YPkc3Uukszpq4pwRqf/preview"
  width="100%"
  height="600"
>
</iframe>

## Some of the Locks

To give a bit of an example of the awful locks we had to deal with:

<br />

```c
void transfer_queue(struct queue *o, struct queue *d, int reset)
{
  if (!holding(&o->lock))
    panic("transfer_runnable: should be holding origin lock");

  if (!reset){
    if (!holding(&d->lock))
      panic("transfer_runnable: should be holding destination lock");
  }

  transfer_runnable(o, d, reset);
  transfer_running(o, d, reset);
}
```

<br />

This function was used whenever a queue quanta expires. In particular, it transfered the processes that were not currently running. As you would expect, there would be another function to handle the currently running process.

<br />

```c
void transfer_running(struct queue *o, struct queue *d, int reset)
{
  if (!holding(&o->lock))
    panic("transfer_runnable: should be holding origin lock");

  if (!reset){
    if (!holding(&d->lock))
      panic("transfer_runnable: should be holding destination lock");

    struct proc *p;
    for (p = proc; p < &proc[NPROC]; p++)
    {
      acquire(&p->lock);
      if (p->state == RUNNING && p->rlevel == o->set_idx)
      {
        p->quantum = MQSS_PROC_QUANTUM;
        p->rlevel = d->set_idx;
        p->level_exp = 1;
      }
      release(&p->lock);
    }
  } else {
    struct proc *p;
    for (p = proc; p < &proc[NPROC]; p++)
    {
      acquire(&p->lock);
      if (p->state == RUNNING && p->rlevel == o->set_idx)
      {
        p->quantum = MQSS_PROC_QUANTUM;
        p->rlevel = p->start_level;
        p->level_exp = 1;
      }
      release(&p->lock);
    }
  }
}
```

<br />

Here, we reset the metadata of the process (for example, the queue it's currently running in, and `level_exp`, which handles race conditions where, in multi-tasking, some other process may expire the level quanta of this currently running process).

<br />

That is just a taste of the logic that went into the scheduler, so you may refer to the [Github repository](https://github.com/hippo23/xv6_scheduler/tree/phase4) where the changes are documented in-depth.
