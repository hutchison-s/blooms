

<template>
  <header class="bg-black p-2 h-[12dvh] sm:h-[12vh] flex items-center justify-between w-full md:px-4">
    <RouterLink to="/" class="flex items-center gap-1 md:gap-2">
      <img :src="logo" width="60px" height="60px" alt="Bloom Explorer" class="inline size-8 sm:size-10 md:size-12 mr-1 md:mr-2">
      <h1 class="inline font-black text-2xl sm:text-3xl md:text-4xl lg:text-[4rem] text-zinc-300 text-left w-full">BLOOM EXPLORER</h1>
    </RouterLink>
    <ResponsiveMenu />
  </header>

  <main class="w-screen h-[90dvh] sm:h-[90vh] bg-cyan-800 overflow-x-hidden">
    <RouterView />
  </main>
</template>

<script setup lang="ts">

import logo from '@/assets/logo.png';
import { RouterLink, RouterView } from 'vue-router';
import ResponsiveMenu from './components/ResponsiveMenu.vue';




</script>