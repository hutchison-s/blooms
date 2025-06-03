<template>
  <div class="bg-black px-2 pb-2 md:px-4 w-full flex gap-x-2 gap-y-1 flex-wrap sm:flex-nowrap justify-between sm:justify-start items-center">
    <div class="grow sm:grow-0">
      <select
        name="grade"
        id="grade"
        v-model="grade"
        aria-label="grade level"
        class="w-fit my-2 border-1 border-zinc-300/25 px-2 h-9 rounded bg-zinc-300/10 text-zinc-300/50"
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
        class="w-fit my-2 border-1 border-zinc-300/25 px-2 h-9 rounded bg-zinc-300/10 text-zinc-300/50"
      >
        <option :value="undefined">All Subjects</option>
        <option v-for="s in subjectList" :key="s" :value="s">{{ s }}</option>
      </select>
    </div>

    <div class="max-w-50 flex items-center my-2">
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
                            class="w-full duration-300 h-9 px-1 py-1 text-zinc-300 inline focus:outline-none"
                        />
                    </div>
    </div>
    <div class="flex items-center gap-2">
      <label for="sortby" class="text-zinc-300">Sort: </label>
      <select
        name="sortby"
        id="sortby"
        v-model="sortby"
        aria-label="sort results by"
        class="w-fit my-2 border-1 border-zinc-300/25 px-2 h-9 rounded bg-zinc-300/10 text-zinc-300/50"
      >
        <option :value="{sortby: 'concept', ascending: 'true'}">Topic &darr;</option>
        <option :value="{sortby: 'concept', ascending: 'false'}">Topic &uarr;</option>
        <option :value="{sortby: 'gradeLevel', ascending: 'true'}">Grade &darr;</option>
        <option :value="{sortby: 'gradeLevel', ascending: 'false'}">Grade &uarr;</option>
        <option :value="{sortby: 'subjectArea', ascending: 'true'}">Subject &darr;</option>
        <option :value="{sortby: 'subjectArea', ascending: 'false'}">Subject &uarr;</option>
      </select>
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
  change: [{ grade?: string, subject?: string, search?: string, sortby: {sortby: string, ascending: string}}]
}>()

const route = useRoute()

const grade = ref<string | undefined>()
const subject = ref<string | undefined>()
const search = ref<string | undefined>() 
const rawSearch = ref<string>('')        
const sortby = ref<{sortby: string, ascending: string}>({sortby: 'concept', ascending: 'true'}) 

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
watch([grade, subject, sortby, search], () => {
  if (!ready.value) return
  emit('change', {
    grade: grade.value,
    subject: subject.value,
    search: search.value,
    sortby: sortby.value
  })
})

// Sync from route query on mount or route change
watch(
  () => route.query,
  (query) => {
    grade.value = query.grade ? query.grade.toString() : undefined
    subject.value = query.subject ? query.subject.toString() : undefined
    search.value = query.search ? query.search.toString() : undefined
    rawSearch.value = query.search ? query.search.toString() : '' // fill input
    sortby.value.sortby = query.sortby ? query.sortby.toString() : 'concept'
    sortby.value.ascending = query.ascending ? query.ascending.toString() : 'true'
    ready.value = true
  },
  { immediate: true }
)
</script>


