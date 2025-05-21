<template>
    <div>
      <div class="flex flex-wrap justify-center px-2 py-12 md:px-6 md:py-20 gap-x-4 gap-y-2 md:gap-y-4 bg-cyan-800 max-h-full overflow-y-auto mask-y-from-90%">
      <button v-for="concept of concepts" :key="concept._id" @click="$emit('update', concept)" class="px-3 py-2 md:px-5 md:py-3 md:text-xl md:rounded-xl border-1 border-cyan-600 bg-black/25 text-zinc-300 cursor-pointer rounded">
        {{ slugToTitle(concept.concept) }}
      </button>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { Concept } from '@/types/global';
import { slugToTitle } from '@/assets/helpers';

    defineProps<{
        concepts: Concept[]
    }>()
    defineEmits<{
        update: [qid: Concept]
    }>()
</script>