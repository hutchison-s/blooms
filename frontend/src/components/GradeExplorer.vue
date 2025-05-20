<template>
    <select name="grade" id="grade" v-model.number="grade">
        <option value="" disabled>Choose a grade</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
    </select>
    <div v-for="q of questions">
        {{ q.concept }}
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
    type Question = {gradeLevel: number, concept: string};
    const grade = ref<number>(5);
    const questions = ref<Question[]>([])
    watch(grade, async ()=>{
        const g = grade.value;
        const items = await fetch(`http://localhost:3000/grade/${g}`)
            .then(res => res.json())
            .then(items => {
                return items as Question[];
            })
            .catch(err => {
                console.error(err);
                return [] as Question[];
            })
        questions.value = items;
    })
    
</script>