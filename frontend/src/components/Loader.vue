<template>
    <div class="w-full h-full grid place-items-center relative">
      <img :src="logo" alt="Bloom Explorer Logo" width="120px" height="120px" class="opacity-25 suggest">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border-10 border-b-transparent orbit border-black/10 rounded-full"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-10 border-l-transparent orbit-outter border-black/10 rounded-full"></div>
    </div>
</template>

<script setup lang="ts">
    import logo from '@/assets/logo.png';
</script>