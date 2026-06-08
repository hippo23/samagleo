---
title: 'A Filesystem PageRank Calculator using MapReduce: C-Standard Library Only'
summary: "Our final project in CS140 (Operating Systems) made us recreate the PageRank calculator using only the C-standard library. No templates were given, strictly mathematical formulas. Through grit (and a good amount of luck), we managed to pull through."
thumbnail: /images/sqrt2.jpg
date: 2025-12-03
---
# A Filesystem PageRank Calculator using MapReduce: C-Standard Library Only

This is probably one of the projects I am most proud of, not only because I managed to pull through the subject it was for without taking a final exam (it's a long story), but also because it was the first time I've ever translated purely mathematical ideas into a large-scale coding projects.

<br />

Without getting into the nitty-gritty (I've already left the specifications and the github repository should the reader be curious), what we essentially had to do is recreate PageRank but for a filesystem.

<br />

Now, PageRank basically ranks nodes based on the probability of a user transitioning to them based on their current location. Through some *interesting* mathematics (Markov Chains), we can essentially determine how likely a user is to end up at certain files if they were to just randomly click links. 

<br />

This calculation leans heavily into eigenvectors, more specifically, it uses repeated matrix multiplication to find a stable probability distribution from which we can derive our ranking. Such an operation is often tedious in terms of both time and memory. Hence, *MapReduce* is used to operate independently on slices of the matrices and combine the results together, basically allowing us to thread operations to speed up overall computation time. To solve the memory problem, Compressed Sparse Row (CSR) matrices were used to store the various stages of the operation.

<br />

In the end, we created a tool that can handle 100,000+ files and 300,000+ links with ease, competing with other PageRank implementations you see in libraries.

* [Github](https://github.com/hippo23/PageRank-Calculator-CSR)

<iframe
  src="https://drive.google.com/file/d/1JMNO1vEMaAbSkh2TgQ8amqj-OxguBb3Q/preview"
  width="100%"
  height="600"
/>
