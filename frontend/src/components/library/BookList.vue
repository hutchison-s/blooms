<template>
  <div
    class="h-full w-fit mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-evenly items-center p-8 pb-12 gap-8 md:gap-12"
  >
    <BookLink v-for="book in books" :key="book._id" :preview="book" />
    <button
      v-if="hasNext"
      @click="$emit('next')"
      class="bg-black rounded-xl w-[300px] h-[200px] mb-12 grid place-items-center border-1 border-zinc-300 text-zinc-300 text-2xl"
    >
      Load More
    </button>
  </div>
</template>

<script setup lang="ts">
import type { BookSummary } from '@/types/global'
import BookLink from './BookLink.vue'

defineProps<{
  books: BookSummary[]
  hasNext: boolean
}>()
defineEmits<{
  next: []
}>()
</script>
