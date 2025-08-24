<template>
  <PageHeader />
  <main class="w-screen h-[88dvh] sm:h-[88dvh] bg-cyan-800 overflow-x-hidden">
    <RouterView />
  </main>
  <a v-if="!isMobile" href="https://buymeacoffee.com/stevenhutchisonkc" target="_blank" class="fixed bottom-4 right-4 z-20 w-fit px-6 py-2 bg-purple-600 rounded-full text-md text-white shadow-md hover:shadow-black/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
      Buy Me a Coffee
    </a>
  <ToastStack />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import PageHeader from './components/PageHeader.vue'
import { onMounted, onUnmounted, ref } from 'vue';
import ToastStack from './components/ToastStack.vue';

const isMobile = ref(window.innerWidth < 768)

function handleResize() {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
