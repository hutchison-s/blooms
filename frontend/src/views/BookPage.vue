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
          <div class="flex gap-2">
            <button @click="handleCopy" class="opacity-80 hover:opacity-100 active:opacity-50">
                <img
                  title="Copy to Clipboard"
                  :src="copyIcon"
                  alt="Copy"
                  width="40px"
                  height="40px"
                  class="invert size-8 md:size-12 "
                />
              </button>
            <button
              @click="goBack"
              class="font-light text-sm md:text-xl border-1 border-zinc-300 rounded px-3 py-1"
            >
              &larr; Go back
            </button>
          </div>
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
import { copyBook } from '@/lib/CopyToClipboard'
import { useToast } from '@/lib/Toast'
import type { Book, BookBloomLevel } from '@/types/global'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import copyIcon from "@/assets/copy-icon.svg"

const route = useRoute()
const router = useRouter()
const slug = route.params.slug
const book = ref<Book | null>(null)
const genreColor = computed<string>(() => {
  if (!book.value) return ''
  return genreColorMap[book.value.genre] || 'text-zinc-300'
})
const {show} = useToast()

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

function handleCopy() {
  if (!book.value) return
  const link = `${window.location}`

  try {
    copyBook(book.value, link)
    show('Copied to clipboard!', {type: 'success', duration: 1000})
  } catch (err) {
    console.error(err)
    show('Failed to copy', {type: 'error', duration: 2000})
    return
  }
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
