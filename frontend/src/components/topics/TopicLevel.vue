<template>
  <article
    :aria-labelledby="`level-title-${title}`"
    class="px-2 py-12 grid gap-6 h-full shadow-2xl question-slide"
    :class="levelColorMap[title]"
    style="scroll-snap-align: start"
  >
    <h3 :id="`level-title-${title}`" class="font-black text-4xl md:text-[6rem]">
      {{ title.toUpperCase() }}
    </h3>
    <p
      class="font-light text-xl sm:text-2xl md:text-3xl lg:text-5xl leading-relaxed ml-4 px-[10vw] text-center"
    >
      {{ question }}
    </p>
  </article>
</template>

<script setup lang="ts">
import { levelColorMap } from '@/assets/helpers'
defineProps<{
  title: string
  question: string
}>()
</script>
