<template>
  <div v-if="book" style="scroll-snap-type: y mandatory" class="h-[88dvh] flex flex-col">
    <section>
      <div
        class="relative min-h-[10dvh] px-4 py-2 bg-cyan-800 text-2xl md:text-3xl lg:text-4xl text-zinc-300 w-full flex gap-y-4 gap-x-20 flex-wrap items-center leading-tight"
      >
        <div class="w-full md:w-fit">
          <h2 class="font-black uppercase min-w-[300px] text-cyan-200">{{ book.title }}</h2>
          <div class="flex gap-4 justify-between w-full items-center">
            <p class="italic font-light text-lg">{{ book.author }}</p>
            <p :class="`${genreColor} font-light text-lg`"><GenrePill :genre="book.genre" /></p>
          </div>
        </div>
        <div class="w-full md:grow flex justify-end sm:w-fit">
          <button
            @click="goBack"
            class="font-light text-sm md:text-xl border-1 border-zinc-300 rounded px-3 py-1"
          >
            &larr; Go back
          </button>
        </div>
      </div>
    </section>
    <section class="overflow-y-auto" v-if="book">
      <BookLevel
        v-for="(level, idx) in bloomLevels"
        :key="idx"
        :title="level"
        :questions="book[level]"
      />
    </section>
  </div>

  <section v-else class="w-full h-full">
    <LogoLoader />
  </section>
</template>

<script setup lang="ts">
import { genreColorMap } from '@/assets/helpers'
import GenrePill from '@/components/GenrePill.vue'
import BookLevel from '@/components/library/BookLevel.vue'
import LogoLoader from '@/components/LogoLoader.vue'
import type { Book, BookBloomLevel } from '@/types/global'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug
const book = ref<Book | null>(null)
const genreColor = computed<string>(() => {
  if (!book.value) return ''
  return genreColorMap[book.value.genre] || 'text-zinc-300'
})

const bloomLevels: BookBloomLevel[] = [
  'knowledge',
  'comprehension',
  'application',
  'analysis',
  'synthesis',
  'evaluation',
]

const baseURL = import.meta.env.VITE_API_BASE + '/books'

const goBack = () => {
  router.back()
}

onMounted(async () => {
  console.log(slug)
  const result = await fetch(`${baseURL}/${slug}`)
    .then((res) => res.json())
    .catch((err) => {
      console.error(err)
      return router.push({ name: 'NotFound' })
    })
  if (result.success) {
    book.value = result.data
  } else {
    console.error(result.error)
    router.push({ name: 'Error' })
  }
})
</script>
