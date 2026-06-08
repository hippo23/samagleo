<script setup lang="ts">
import type { Post } from '../types'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import fm from 'front-matter'
import MarkdownIt from 'markdown-it'
import mathjax3 from 'markdown-it-mathjax3'
import hljs from 'highlight.js'
import highlight from 'markdown-it-highlightjs'

import 'highlight.js/styles/github.css'


const md = new MarkdownIt({ html: true })
md.use(mathjax3)
md.use(highlight, { hljs })

const route = useRoute();

const posts = import.meta.glob("/src/posts/*.md", {
  eager: true,
  query: '?raw'
});

const raw = posts[`/src/posts/${route.params.slug}.md`];

const post_raw =
  typeof raw === "string"
    ? raw
    : (raw as any)?.default;

if (typeof post_raw !== "string") {
  throw new Error("Markdown not loaded as string");
}

if (!post_raw) throw new Error('Post not found')
const { attributes, body } = fm<Omit<Post, 'slug' | 'content'>>(post_raw)

const post =  {
  ...attributes,
  content: body,
} satisfies Post

const title = computed(() => {
  return md.renderInline(post.title)
})

const summary = computed(() => {
  return md.renderInline(post.summary)
})

const content = computed(() => {
  return md.render(post.content)
})

const date = computed(() =>
  new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
)
</script>

<template>
  <div class="main">
    <div v-html="content" />
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  height: fit-content;
  min-width: 0;
}

.main * {
  min-width: 0;
}

.main :deep(h1),
.main :deep(h2),
.main :deep(h3),
.main :deep(h4) {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.main :deep(ul),
.main :deep(ol) {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.main :deep(pre) {
  overflow-x: auto;
  max-width: 100%;
  min-width: 0;
}

.main :deep(code) {
  white-space: pre;
  font-size: 0.75rem;
  min-width: 0;
}
</style>
