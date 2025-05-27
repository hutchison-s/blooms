<template>
  <div class="bg-black p-2 md:px-4 w-full h-full flex gap-x-2 gap-y-1 flex-wrap sm:flex-nowrap justify-center sm:justify-start items-center">
    <div class="grow sm:grow-0">
      <select
        name="grade"
        id="grade"
        v-model="grade"
        aria-label="grade level"
        class="w-full text-zinc-300 border-1 border-zinc-300 p-1 rounded"
      >
        <option :value="undefined">All Grades</option>
        <option v-for="g in gradeList" :key="g" :value="g.toString()">{{ g }}</option>
      </select>
    </div>

    <div class="grow sm:grow-0">
      <select
        name="subject"
        id="subject"
        v-model="subject"
        aria-label="Subject filter"
        class="w-full text-zinc-300 border-1 border-zinc-300 p-1 rounded"
      >
        <option :value="undefined">All Subjects</option>
        <option v-for="s in subjectList" :key="s" :value="s">{{ s }}</option>
      </select>
    </div>

    <div>
      <div class="group flex border-1 border-zinc-600 rounded outline-2 outline-transparent focus-within:outline-blue-400">
        <label for="search" aria-hidden="true" class="size-8 grid place-items-center opacity-50 group-focus-within:opacity-100">
          <img :src="searchIcon" width="20px" height="20px" class="invert inset-8 object-contain w-1/2 h-1/2 inline">
        </label>
        <input
          type="search"
          name="search"
          id="search"
          v-model="rawSearch"
          aria-label="Keyword Search"
          placeholder="Keyword Search..."
          class="origin-left peer overflow-x-hidden transition-all duration-300 px-4 py-1 text-zinc-300 inline focus:outline-none"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import searchIcon from '@/assets/searchIcon.svg'

defineProps<{
  subjectList: string[]
  gradeList: number[]
}>()

const emit = defineEmits<{
  change: [{ grade?: string, subject?: string, search?: string }]
}>()

const route = useRoute()

const grade = ref<string | undefined>()
const subject = ref<string | undefined>()
const search = ref<string | undefined>() // debounced output
const rawSearch = ref<string>('')         // what user types

const ready = ref(false)
const timeoutID = ref<ReturnType<typeof setTimeout> | undefined>()

// Debounce rawSearch → search
watch(rawSearch, (val) => {
  clearTimeout(timeoutID.value)
  timeoutID.value = setTimeout(() => {
    search.value = val || undefined // convert empty to undefined
  }, 300)
})

// Emit only when all values are ready
watch([grade, subject, search], () => {
  if (!ready.value) return
  emit('change', {
    grade: grade.value,
    subject: subject.value,
    search: search.value,
  })
})

// Sync from route query on mount or route change
watch(
  () => route.query,
  (query) => {
    grade.value = query.grade?.toString() || undefined
    subject.value = query.subject?.toString() || undefined
    search.value = query.search?.toString() || undefined
    rawSearch.value = query.search?.toString() || '' // fill input
    ready.value = true
  },
  { immediate: true }
)
</script>


