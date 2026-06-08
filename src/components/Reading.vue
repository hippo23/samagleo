<script setup lang="ts">
import type { Reading } from '../types'
import type { PropType } from 'vue'
import { computed } from 'vue'

const props = defineProps({
  reading: { type: Object as PropType<Reading>, required: true },
})

const date = computed(() =>
  new Date(props.reading.last_updated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
)
</script>

<template>
  <div class="main">
    <img :src="props.reading.thumbnail" style="height: 100%" />
    <div style="display: flex; flex-direction: column; justify-content: center; gap: 2px">
      <h3>{{ props.reading.title }}</h3>
      <div style="font-size: 0.7rem">Status: {{ props.reading.status.toUpperCase() }}</div>
      <div style="font-size: 0.7rem; margin-top: 5px">Last updated: {{ date }}</div>
    </div>
  </div>
</template>

<style scoped>
.main {
  width: fit-content;
  height: 100px;
  display: flex;
  flex-direction: row;
  gap: 5px;
}
</style>
