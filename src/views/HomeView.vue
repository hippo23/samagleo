<script setup lang="ts">
import type { Post, Reading } from '@/types'
import { RouterLink, RouterView } from 'vue-router'
import fm from 'front-matter'
import PostCard from '@/components/Post.vue'
import ReadingCard from '@/components/Reading.vue'

const post_files = import.meta.glob('/src/posts/*.md', { eager: true, query: '?raw' })
const reading_files = import.meta.glob('/src/readings/*.txt', { eager: true, query: '?raw' })

let posts = Object.entries(post_files).map(([path, raw]) => {
  const content = typeof raw === 'string' ? raw : (raw as any)?.default;

  if (typeof content !== 'string') {
    throw new Error(`Post is not string: ${path}`);
  }

  const { attributes, body } = fm<Omit<Post, 'slug' | 'content'>>(content);

  return {
    slug: path.split('/').pop()!.replace('.md', ''),
    ...attributes,
    content: body,
  } satisfies Post;
});

const readings = Object.entries(reading_files).map(([path, raw]) => {
  const content = typeof raw === 'string' ? raw : (raw as any)?.default;

  if (typeof content !== 'string') {
    throw new Error(`Reading is not string: ${path}`);
  }

  const { attributes, body } = fm<Omit<Reading, 'slug' | 'content'>>(content);

  return {
    slug: path.split('/').pop()!.replace('.txt', ''),
    ...attributes,
  } satisfies Reading;
});

posts.sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime()
})

readings.sort((a, b) => {
  return new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
})
</script>

<template>
  <div
    style="
      margin-top: 5px;
      width: 100%;
      height: fit-content;
      display: flex;
      flex-direction: column;
      gap: 50px;
    "
  >
    <div style="margin-top: 5px; display: flex; flex-direction: column; gap: 5px">
      <div class="intro">
        <img src="/src/assets/me2.jpg" style="width: 300px; margin-right: 10px" />
        <p style="min-width: 0">
          Hi, I'm Simon! An aspiring mathematician, currently in my 3rd year of Computer Science at
          UP Diliman. I mainly find myself interested in theoretical fields, though anything that
          has to do with calculations and equations on a blackboard piques my interest. <br /><br />
          When I'm not studying Math and not procastinating studying it either, you will probably
          find me enjoying hiking, bouldering, and nature-walking in the pines of my hometown in
          Baguio City, Benguet.
        </p>
      </div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 5px" class="readings">
      <h3 style="font-size: 1.1rem">Overdue Readings, Digests, & Solutions (Soon)</h3>
      <hr />
      <div style="display: flex; flex-direction: column; gap: 20px">
        <ReadingCard v-for="reading in readings" :key="reading.slug" :reading="reading" />
      </div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 5px" class="posts">
      <h3 style="font-size: 1.1rem">Projects</h3>
      <hr />
      <div style="display: flex; flex-direction: column; gap: 20px">
        <PostCard v-for="post in posts" :key="post.slug" :post="post" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.intro {
  display: flex;
  flex-direction: row;
}

@media (max-width: 728px) {
  .intro {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}

.readings * {
  min-width: 0;
}
</style>
