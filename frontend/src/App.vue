

<template>
  <header class="bg-black p-2 h-[12dvh] sm:h-[12vh] flex items-center justify-between w-full md:px-4">
    <div class="flex items-center gap-1 md:gap-2">
      <img :src="logo" width="60px" height="60px" alt="Bloom Explorer" class="inline size-8 sm:size-13 md:size-16 mr-1 md:mr-2">
      <h1 class="inline font-black text-2xl sm:text-4xl md:text-[4rem] text-zinc-300 text-left w-full">BLOOM EXPLORER</h1>
    </div>
  </header>

  <main class="w-full h-[90dvh] sm:h-[90vh] bg-cyan-800">
    <GradeExplorer />
  </main>
</template>

<script setup lang="ts">

import GradeExplorer from '@/components/GradeExplorer.vue'
import logo from '@/assets/logo.png';




</script>