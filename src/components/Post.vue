<script setup lang="ts">
import type { Post } from '../types'
import type { PropType } from 'vue'
import { computed } from 'vue'
import MarkdownIt from 'markdown-it'
import mathjax3 from 'markdown-it-mathjax3'

const md = new MarkdownIt()
md.use(mathjax3)

const props = defineProps({
  post: { type: Object as PropType<Post>, required: true },
})

const title = computed(() => {
  return md.renderInline(props.post.title)
})

const summary = computed(() => {
  return md.renderInline(props.post.summary)
})

const date = computed(() =>
  new Date(props.post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
)
</script>

<template>
  <div class="main">
    <div class="msg_body">
      <RouterLink
        :to="`/posts/${post.slug}`"
        v-html="title"
        style="font-size: 0.95rem; margin-bottom: 10px; min-width: 0"
      />
      <p v-html="summary" style="padding-bottom: 10px; min-width: 0" />
      <p style="font-size: 0.7rem; margin-top: auto; min-width: 0">
        {{ date }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 5px;
  min-height: 75px;
}

.msg_body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
}
</style>
