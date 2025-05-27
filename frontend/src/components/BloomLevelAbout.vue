<template>
  <li class="taxonomy-level h-[90dvh] w-full relative about-slide" :class="styles" style="scroll-snap-align: start;">
    <h3 class="py-8 px-6 font-black text-4xl md:text-[6rem] uppercase">{{ level.name }}</h3>
    <div class="px-6 flex flex-wrap gap-4 text-xl md:text-2xl">
      <div class="min-w-[300px] grow border-l-1 border-white pl-8 py-4 bg-gradient-to-r from-white/10 to-transparent to-30% rounded-xl">
        <h4><strong>Definition:</strong></h4>
        <p class="mt-4 font-extralight">{{ level.definition }}</p>
      </div>
      <div class="min-w-[300px] grow border-l-1 border-white pl-8 py-4 bg-gradient-to-r from-white/10 to-transparent to-30% rounded-xl">
        <h4><strong>Keywords:</strong></h4>
        <p class="mt-4 font-extralight">{{ level.keywords }}</p>
      </div>
      <div class="min-w-[300px] grow border-l-1 border-white pl-8 py-4 bg-gradient-to-r from-white/10 to-transparent to-30% rounded-xl">
        <h4><strong>Example:</strong></h4>
        <p class="mt-4 font-extralight">{{ level.example }}</p>
      </div>
    </div>
</li>
</template>

<script setup lang="ts">
    import { levelColorMap } from '@/assets/helpers';
import type { BloomLevelType } from '@/types/global';
    const {level} = defineProps<{level: BloomLevelType}>()
    const styles = levelColorMap[level.name.toLowerCase()];
    console.log(levelColorMap[level.name.toLowerCase()])
</script>