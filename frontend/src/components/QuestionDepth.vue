<template>
    <template v-if="concept"> 
        <div class="relative px-4 bg-cyan-800 text-lg md:text-2xl text-zinc-300 w-full flex gap-x-20 flex-wrap items-center leading-tight">
            <div><span class="text-cyan-200">Concept:</span> <span class="font-light">{{ slugToTitle(concept.concept) }}</span></div>
            <div class="w-full flex justify-end sm:w-fit"><button @click="$emit('reset')" class="font-light text-sm md:text-xl border-1 border-zinc-300 rounded px-3 py-1">&larr; Go back</button></div>
        </div>
        <ul class="overflow-y-auto h-full" style="scroll-snap-type: y mandatory;">
            <li v-for="level of bloomsLevels" :key="level" class="px-2 py-12 grid gap-6 h-full shadow-2xl question-slide" :class="levelColorMap[level]" style="scroll-snap-align: start;">
                <h3 class="font-black text-4xl md:text-[6rem]">{{level.toUpperCase()}}</h3>
                <p class="font-light text-2xl leading-relaxed ml-4 md:text-5xl px-[10vw] text-center">{{ concept[level] }}</p>
            </li>
        </ul>
    </template>
    <Loader v-else />
   
</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import type { Concept } from '@/types/global';
import { bloomsLevels, slugToTitle, levelColorMap } from '@/assets/helpers';
import Loader from '@/components/Loader.vue';
    const {conceptId} = defineProps<{
        conceptId: string
    }>()
    defineEmits<{reset: []}>()
    

const baseURL = 'https://www.bloomexplorer.xyz/api';    
// const baseURL = '/api'
    const concept = ref<Concept | null>(null);
    const metaTag = computed<string>(()=>{
        return `Grade ${concept.value?.gradeLevel}, ${concept.value?.subjectArea}`
    })

    onMounted(async () => {
        const response = await fetch(`${baseURL}/concepts/${conceptId}`)
        concept.value = await response.json();
      });

    


</script>
