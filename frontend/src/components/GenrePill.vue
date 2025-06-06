<template>
    <span class="px-5 py-1 rounded-full bg-black/50" :class="genreColorMap[genre]">{{ genre }}</span>
</template>

<script setup lang="ts">
    import { genreColorMap } from '@/assets/helpers';
    defineProps<{
        genre: string
    }>();
</script>