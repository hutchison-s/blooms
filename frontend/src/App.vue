

<template>
  <header class="bg-black p-2 h-[10vh] flex items-center">
    <img :src="logo" width="60px" height="60px" alt="Bloom Explorer" class="size-12 sm:size-18 md:size-24 mr-1 md:mr-2">
    <h1 class="font-black text-3xl sm:text-4xl md:text-[4rem] text-zinc-300 text-left w-full">BLOOM EXPLORER</h1>
  </header>

  <main class="w-full h-[90vh] bg-cyan-800">
    <GradeExplorer />
  </main>
</template>

<script setup lang="ts">

import GradeExplorer from '@/components/GradeExplorer.vue'
import logo from '@/assets/logo.png';




</script>