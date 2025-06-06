<template>
  <article
    class="taxonomy-level h-[88dvh] w-full relative about-slide"
    :class="styles"
    style="scroll-snap-align: start"
  >
    <h3 class="pt-8 pb-4 px-6 font-black text-4xl sm:text-6xl md:text-[6rem] uppercase">
      {{ level.name }}
    </h3>
    <ul
      class="px-6 flex flex-wrap gap-4 text-xl sm:text-4xl md:text-4xl sm:gap-12 sm:pt-12 md:gap-20 md:pt-20"
    >
      <li
        :class="borderColor"
        class="min-w-[300px] grow border-l-1 pl-8 py-4 to-transparent to-30% rounded-xl md:w-full"
      >
        <h4 :class="titleColor"><strong>Definition:</strong></h4>
        <p class="mt-4 font-extralight">{{ level.definition }}</p>
      </li>
      <li
        :class="borderColor"
        class="min-w-[300px] grow border-l-1 pl-8 py-4 to-transparent to-30% rounded-xl"
      >
        <h4 :class="titleColor"><strong>Keywords:</strong></h4>
        <p class="mt-4 font-extralight">{{ level.keywords }}</p>
      </li>
      <li
        :class="borderColor"
        class="min-w-[300px] grow border-l-1 pl-8 py-4 to-transparent to-30% rounded-xl"
      >
        <h4 :class="titleColor"><strong>Example:</strong></h4>
        <p class="mt-4 font-extralight">{{ level.example }}</p>
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
import { levelColorMap } from '@/assets/helpers'
import type { BloomLevelType } from '@/types/global'
const { level } = defineProps<{ level: BloomLevelType }>()
const styles = levelColorMap[level.name.toLowerCase()]

const index = Object.keys(levelColorMap).findIndex(
  (lev) => String(level.name).toLowerCase() == lev.toLowerCase(),
)
const titleColor = index > 2 ? 'text-white' : 'text-black'
const borderColor =
  index > 2
    ? 'border-white bg-gradient-to-r from-white/10'
    : 'border-cyan-900 bg-gradient-to-r from-cyan-900/10'
</script>
