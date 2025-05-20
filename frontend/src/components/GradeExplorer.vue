<template>
  <section class="w-full h-full grid grid-rows-[10vh_80vh]">
    <div class="bg-black p-2 w-full h-full flex gap-2 flex-wrap justify-evenly md:justify-start items-center">
      <div>
        <label for="grade" class="text-zinc-300 mr-2">Grade Level:</label>
        <select name="grade" id="grade" v-model.number="grade" placeholder="Choose a grade to explore" class="text-zinc-300 border-1 border-zinc-300 p-1 rounded">
          <option value="0"></option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>
      <div>
        <label for="subject" class="text-zinc-300 mr-2">Subject:</label>
        <select name="subject" id="subject" v-model="subject" class="text-zinc-300 border-1 border-zinc-300 p-1 rounded">
          <option value="All Subjects">All Subjects</option>
          <option v-for="s of subjectList" :value="s">{{ s }}</option>
        </select>
      </div>
    </div>
    <QuestionDepth v-if="selected" :concept="selected" @reset="handleReset"/>
    <ConceptList v-else-if="filteredConcepts.length > 0" :concepts="filteredConcepts" @update="handleUpdate"/>
    <div v-else class="w-full h-full grid place-items-center relative">
      <img :src="logo" alt="Bloom Explorer Logo" width="120px" height="120px" class="opacity-25 suggest">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border-10 border-b-transparent orbit border-black/10 rounded-full"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-10 border-l-transparent orbit-outter border-black/10 rounded-full"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ConceptList from '@/components/ConceptList.vue';
import type { Concept } from '@/types/global';
import QuestionDepth from '@/components/QuestionDepth.vue';
import logo from '@/assets/logo.png';

const grade = ref<number>(0)
const concepts = ref<Concept[]>([])
const selected = ref<Concept | undefined>()
const subject = ref<string>('All Subjects')

const filteredConcepts = computed<Concept[]>(()=>{
  if (subject.value === 'All Subjects') return concepts.value;
  return concepts.value.filter(c => c.subjectArea == subject.value);
})
const subjectList = computed<string[]>(()=>{
  const subjectSet = concepts.value.reduce(
    (acc: Set<string>, concept: Concept)=>{
      acc.add(concept.subjectArea);
      return acc;
    }, new Set<string>());

  return Array.from(subjectSet)
})

const handleUpdate = (c: Concept) => {
  selected.value = c;
}
const handleReset = ()=>{
  selected.value = undefined;
}
watch(subject, handleReset)
watch(grade, async () => {
  const g = grade.value
  if (g === 0) {
    concepts.value = [];
    selected.value = undefined;
    return;
  };
  const items = await fetch(`/api/grade/${g}`)
    .then((res) => res.json())
    .then((items) => {
      return items as Concept[]
    })
    .catch((err) => {
      console.error(err)
      return []
    })
  concepts.value = items
  handleReset()
})

</script>
