<script setup lang="ts">
import type { Post } from './types'
import { RouterLink, RouterView } from 'vue-router'
import fm from 'front-matter'
import PostCard from './components/Post.vue'
</script>

<template>
  <div class="main">
    <header>
      <div style="font-size: 1.2rem; margin-bottom: 5px; color: #2596be">
        Simon Benedict A. Magleo
      </div>
      <div>
        Undergraduate, Department of Computer Science, University of the Philippines - Diliman
      </div>
      <div style="font-size: 0.8rem">
        E-mail: <a href="mailto:simon.benedict.magleo@gmail.com">simon.benedict.magleo@gmail.com</a>
      </div>
    </header>
    <hr />
    <RouterView />
  </div>
</template>

<style scoped>
.main {
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: fit-content;
  padding-bottom: 50px;
}
</style>
