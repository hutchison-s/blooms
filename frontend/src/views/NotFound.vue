<script setup lang="ts">
    import { RouterLink, useRouter } from 'vue-router';
    const router = useRouter();

</script>

<template>
    <div class="w-full h-2/3 flex flex-col justify-center items-center">
        <h1 class="text-[5rem] md:text-[8rem] lg:text-[10rem] font-black uppercase text-zinc-300 drop-shadow-xl">404</h1>
        <p class="text-2xl md:text-4xl lg:text-5xl font-light text-cyan-300 mb-12">Page not found</p>
        <RouterLink to="/" class="text-zinc-300 block mx-auto w-fit transition-all duration-200 border-1 border-zinc-300 rounded text-xl px-6 py-2 bg-black hover:bg-blue-300 hover:text-black hover:scale-102 hover:shadow-xl">Return to Home Page</RouterLink>
        <button class="text-zinc-300 block mx-auto w-fit transition-all duration-200 border-1 border-zinc-300 rounded text-xl px-6 py-2 hover:bg-black/10 hover:scale-102 hover:shadow-xl my-8" @click="router.go(-2)">Back</button>

    </div>
</template>