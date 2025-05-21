<template>
    <div v-if="!concept">loading...</div>
    <div v-else class=" grid grid-rows-[20dvh_1fr] md:grid-rows-[10vh_1fr] h-full">
        <div class="relative px-2 bg-cyan-800 text-2xl text-zinc-300 w-full flex gap-x-20 flex-wrap items-center">
            <div><span class="text-cyan-200">Concept:</span> <span class="font-light">{{ slugToTitle(concept.concept) }}</span></div>
            <button @click="$emit('reset')" class="absolute bottom-2 right-0 md:bottom-auto md:right-auto scale-90 md:scale-100 md:relative font-light text-xl border-1 border-zinc-300 rounded px-3 py-1">&larr; Go back</button>
        </div>
        <ul class="overflow-y-auto h-full" style="scroll-snap-type: y mandatory;">
            <li v-for="level of bloomsLevels" :key="level" class="px-2 py-12 grid gap-6 h-full shadow-2xl question-slide" :class="bgMap[level as LevelName]" style="scroll-snap-align: start;">
                <h3 class="font-black text-4xl md:text-[6rem]">{{level.toUpperCase()}}</h3>
                <p class="font-light text-2xl leading-relaxed ml-4 md:text-5xl px-[10vw] text-center">{{ concept[level] }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import type { Concept, LevelName } from '@/types/global';
import { bloomsLevels, slugToTitle } from '@/assets/helpers';
    const {conceptId} = defineProps<{
        conceptId: string
    }>()
    defineEmits<{reset: []}>()
    const bgMap: Record<LevelName, string[]> = {
        'knowledge': ['bg-cyan-300', 'text-zinc-800'],
        'comprehension': ['bg-cyan-400', 'text-zinc-800'],
        'application': ['bg-cyan-500', 'text-zinc-800'],
        'analysis': ['bg-cyan-600', 'text-zinc-200'],
        'synthesis': ['bg-cyan-700', 'text-zinc-200'],
        'evaluation': ['bg-cyan-800', 'text-zinc-200']
    }

    // const baseURL = 'http://localhost:3000' + '/api/concepts'
    const baseURL = '/api'
    const concept = ref<Concept | null>(null)

    onMounted(async () => {
        const response = await fetch(`${baseURL}/concepts/${conceptId}`)
        concept.value = await response.json();
      });

    


</script>