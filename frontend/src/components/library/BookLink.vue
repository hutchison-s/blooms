<template>
  <RouterLink
    :to="`/books/${preview.slug}`"
    class="transition-all duration-200 w-[clamp(300px,_100%,_400px)] min-h-[480px] mx-auto flex flex-col group justify-between p-4 border-1 border-cyan-600 bg-black/25 hover:bg-black/40 hover:shadow-xl text-zinc-300 cursor-pointer rounded-xl"
  >
    <div>
      <div class="min-h-[100px]">
        <h3 class="text-zinc-300 font-black uppercase text-[1.66rem]">
          {{ preview.title.split(':')[0]
          }}<span v-if="preview.title.includes(':')" class="font-light capitalize">{{
            ':' + preview.title.split(':')[1]
          }}</span>
        </h3>
        <p>
          <em class="font-light">{{ preview.author }}</em>
        </p>
      </div>
      <p
        class="font-light px-2 py-4 opacity-80 group-hover:opacity-100 text-[0.9rem] transition-all duration-200"
      >
        {{ preview.synopsis }}
      </p>
    </div>

    <p :class="`text-right ${genreColor}`"><GenrePill :genre="preview.genre" /></p>
  </RouterLink>
</template>

<script setup lang="ts">
import { genreColorMap } from '@/assets/helpers'
import type { BookSummary } from '@/types/global'
import { RouterLink } from 'vue-router'
import GenrePill from '../GenrePill.vue'

const props = defineProps<{
  preview: BookSummary
}>()

const genreColor = genreColorMap[props.preview.genre]
</script>
