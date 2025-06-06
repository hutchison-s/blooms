<template>
  <section class="w-full h-[88dvh] flex flex-col">
    <FilterBar :grade-list="ALL_GRADES" :subject-list="ALL_SUBJECTS" @change="handleFilterChange" />
    <TopicList
      :topics="topics"
      :nextPageLink="nextPageLink"
      :status="topicStatus"
      @next="getNextPage"
    />
  </section>
</template>

<script setup lang="ts">
import FilterBar from '@/components/topics/FilterBar.vue'
import TopicList from '@/components/topics/TopicList.vue'
import type { TopicPreview } from '@/types/global'
import { ALL_GRADES, ALL_SUBJECTS, QueryURLBuilder } from '@/assets/helpers'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const baseURL = import.meta.env.VITE_API_BASE + '/concepts'

const topics = ref<TopicPreview[]>([])
const nextPageLink = ref<string | null>(null)
const topicStatus = ref<'loading' | 'ready' | 'error'>('loading')

const getNextPage = async () => {
  if (!nextPageLink.value) return
  const url = new URL(nextPageLink.value)
  const nextData = await fetch(baseURL + url.search).then((res) => res.json())
  topics.value = [...topics.value, ...nextData.data]
  nextPageLink.value = nextData.pagination.nextPage
}

const handleFilterChange = async (q: {
  grade?: string
  subject?: string
  search?: string
  sortby: { sortby: string; ascending: string }
}) => {
  topicStatus.value = 'loading'
  const url = new QueryURLBuilder(baseURL)
    .addParam('grade', q.grade)
    .addParam('subject', q.subject)
    .addParam('search', q.search)
    .addParam('sortby', q.sortby.sortby)
    .addParam('ascending', q.sortby.ascending)
    .toString()

  try {
    const response = await fetch(url).then((res) => res.json())
    if (response.success) {
      topics.value = response.data
      nextPageLink.value = response.pagination.nextPage
      topicStatus.value = 'ready'
    } else {
      topics.value = []
      nextPageLink.value = null
      topicStatus.value = 'error'
    }
  } catch (error) {
    console.error(error)
    topics.value = []
    nextPageLink.value = null
    topicStatus.value = 'error'
    router.push({ name: 'Error' })
  }
  router.replace({ query: { ...q, sortby: q.sortby.sortby, ascending: q.sortby.ascending } })
}

onMounted(async () => {
  const query = route.query
  const url = new QueryURLBuilder(baseURL)
    .addParam('grade', query.grade ? query.grade.toString() : undefined)
    .addParam('subject', query.subject ? query.subject.toString() : undefined)
    .addParam('search', query.search ? query.search.toString() : undefined)
    .addParam('sortby', query.sortby ? query.sortby.toString() : undefined)
    .addParam('ascending', query.ascending ? query.ascending.toString() : undefined)
  try {
    const response = await fetch(url.toString()).then((res) => res.json())
    if (response.success) {
      topics.value = response.data
      nextPageLink.value = response.pagination.nextPage
      topicStatus.value = 'ready'
    } else {
      topics.value = []
      nextPageLink.value = null
      topicStatus.value = 'error'
    }
  } catch (error) {
    console.error(error)
    topics.value = []
    nextPageLink.value = null
    topicStatus.value = 'error'
    router.push({ name: 'Error' })
  }
})
</script>
