<template>
  <section class="w-full h-full grid grid-rows-[14dvh_74dvh]">
    <div v-if="!selected" class="bg-black p-2 md:px-4 w-full h-full flex gap-x-2 gap-y-1 flex-wrap sm:flex-nowrap justify-center sm:justify-start items-center">
      <div class="grow sm:grow-0">
        <label for="grade" class="text-zinc-300 mr-2 hidden"></label>
        <select name="grade" id="grade" v-model.number="grade" aria-label="grade level" class="w-full text-zinc-300 border-1 border-zinc-300 p-1 rounded">
          <option :value="undefined">All Grades</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
      </div>
      <div class="grow sm:grow-0">
        <label for="subject" class="text-zinc-300 mr-2 hidden"></label>
        <select name="subject" id="subject" v-model="subject" aria-label="Subject filter" class="w-full text-zinc-300 border-1 border-zinc-300 p-1 rounded">
          <option :value="undefined">All Subjects</option>
          <option v-for="s of subjectList" :value="s" :key="s">{{ s }}</option>
        </select>
      </div>
      <div>
        <SearchModal @update="handleSearchUpdate"/>
      </div>
    </div>
    <QuestionDepth v-if="selected" :conceptId="selected._id" @reset="handleReset"/>
    <ConceptList v-else-if="concepts.length > 0" :concepts="concepts" @update="handleUpdate"/>
    
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import ConceptList from '@/components/ConceptList.vue';
import type { Concept } from '@/types/global';
import QuestionDepth from '@/components/QuestionDepth.vue';
import { QueryURLBuilder } from '@/assets/helpers';
import SearchModal from '@/components/SearchModal.vue';

const baseURL = 'https://www.bloomexplorer.xyz/api';
// const baseURL = '/api'

const grade = ref<number | undefined>(undefined)
const concepts = ref<Concept[]>([])
const selected = ref<Concept | undefined>()
const subject = ref<string | undefined>(undefined)
const search = ref<string>('');


//updated logic using custom class
const url = computed<string>(()=>{
  const g = grade.value;
  const s = subject.value;
  const q = search.value;
  const newURL = new QueryURLBuilder(baseURL + '/concepts');
  newURL.addParam('grade', g).addParam('subject', s).addParam('search', q);
  console.log(newURL.toString())
  return newURL.toString();
})

const subjectList = ref<string[]>([])

const handleUpdate = (c: Concept) => {
  selected.value = c;
}
const handleReset = ()=>{
  selected.value = undefined;
}
const handleSearchUpdate = (val: string)=>{
  
  search.value = val;
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
watch([grade, subject, search], () => {
  handleReset();
});


</script>
