<template>
    <template v-if="concept"> 
        <div class="relative px-4 bg-cyan-800 text-lg md:text-2xl text-zinc-300 w-full flex gap-x-20 flex-wrap items-center leading-tight h-[10dvh]">
            <div><span class="text-cyan-200">Concept:</span> <span class="font-light">{{ slugToTitle(concept.concept) }}</span></div>
            <div class="w-full flex justify-end sm:w-fit"><button @click="goBack" class="font-light text-sm md:text-xl border-1 border-zinc-300 rounded px-3 py-1">&larr; Go back</button></div>
        </div>
        <ul class="overflow-y-auto h-[78dvh]" style="scroll-snap-type: y mandatory;">
            <li v-for="level of bloomLevels" :key="level" class="px-2 py-12 grid gap-6 h-full shadow-2xl question-slide" :class="levelColorMap[level]" style="scroll-snap-align: start;">
                <h3 class="font-black text-4xl md:text-[6rem]">{{level.toUpperCase()}}</h3>
                <p class="font-light text-2xl leading-relaxed ml-4 md:text-5xl px-[10vw] text-center">{{ concept[level] }}</p>
            </li>
        </ul>
    </template>
    <Loader v-else />
   
</template>

<script setup lang="ts">
import type {BookBloomLevel, Concept} from '@/types/global';
import { slugToTitle, levelColorMap } from '@/assets/helpers';
import Loader from '@/components/LogoLoader.vue';
import {useRouter} from 'vue-router'
    const {concept} = defineProps<{
        concept?: Concept
    }>()    

const router = useRouter();

const goBack = ()=>router.back()

const bloomLevels: BookBloomLevel[] = [
  "knowledge",
  "comprehension",
  "application",
  "analysis",
  "synthesis",
  "evaluation"
];
    


</script>
