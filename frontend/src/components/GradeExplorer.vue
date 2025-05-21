<template>
  <section class="w-full h-full grid grid-rows-[10dvh_80dvh]">
    <div class="bg-black p-2 w-full h-full flex gap-2 flex-wrap justify-evenly md:justify-start items-center">
      <div>
        <label for="grade" class="text-zinc-300 mr-2">Grade Level:</label>
        <select name="grade" id="grade" v-model.number="grade" placeholder="Choose a grade to explore" class="text-zinc-300 border-1 border-zinc-300 p-1 rounded">
          <option value="0">All</option>
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
          <option v-for="s of subjectList" :value="s" :key="s">{{ s }}</option>
        </select>
      </div>
    </div>
    <QuestionDepth v-if="selected" :conceptId="selected._id" @reset="handleReset"/>
    <ConceptList v-else-if="concepts.length > 0" :concepts="concepts" @update="handleUpdate"/>
    <div v-else class="w-full h-full grid place-items-center relative">
      <img :src="logo" alt="Bloom Explorer Logo" width="120px" height="120px" class="opacity-25 suggest">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border-10 border-b-transparent orbit border-black/10 rounded-full"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border-10 border-l-transparent orbit-outter border-black/10 rounded-full"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import ConceptList from '@/components/ConceptList.vue';
import type { Concept } from '@/types/global';
import QuestionDepth from '@/components/QuestionDepth.vue';
import logo from '@/assets/logo.png';

// const baseURL = 'http://localhost:3000' + '/api'
const baseURL = '/api'

const grade = ref<number>(0)
const concepts = ref<Concept[]>([])
const selected = ref<Concept | undefined>()
const subject = ref<string>('All Subjects')

const url = computed<string>(()=>{
  let newURL = baseURL + '/concepts';
  let startedQuery = false;
  if (grade.value !== 0 || subject.value !== 'All Subjects') {
    newURL += "?"
    startedQuery = true;
  }
  const currentSubject = subject.value;
  const currentGrade = grade.value;
  if (currentGrade !== 0) {
    newURL += `grade=${currentGrade}`;
  }

  if (currentSubject !== 'All Subjects') {
    newURL += `${startedQuery ? (currentGrade == 0 ? "" : "&") : '?'}subject=${currentSubject}`
  }

  return newURL;

})

const subjectList = ref<string[]>([])

const handleUpdate = (c: Concept) => {
  selected.value = c;
}
const handleReset = ()=>{
  selected.value = undefined;
}

watch(url, async ()=>{
  await updateConcepts()
})

const updateConcepts = async () => {
  try {
    const res = await fetch(url.value);
    const items = await res.json();
    concepts.value = items;
    selected.value = undefined;
  } catch (err) {
    console.error(err);
    concepts.value = [];
  }
};

onMounted(async ()=>{
  await updateConcepts();
  await fetch(baseURL+'/subjects').then(res => res.json()).then(subjects => subjectList.value = subjects);
})

// 👇 Only update subjects when grade changes
watch([grade, subject], () => {
  handleReset();
});


</script>
