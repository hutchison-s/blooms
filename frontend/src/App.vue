<template>
  <PageHeader />
  <main class="w-screen h-[88dvh] sm:h-[88dvh] bg-cyan-800 overflow-x-hidden">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue'
</script>
