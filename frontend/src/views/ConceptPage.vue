<template>
    <QuestionDepth :concept="concept" />
</template>

<script setup lang="ts">
    import {ref, onMounted} from 'vue';
    import {useRoute} from 'vue-router';
    import type {Concept} from '@/types/global';
    import QuestionDepth from '@/components/QuestionDepth.vue'
    const route = useRoute();
    const {grade, subject, slug} = route.params;
    const concept = ref<Concept>();

    const baseURL = import.meta.env.VITE_API_BASE;

    onMounted(async ()=>{
        const result = await fetch(`${baseURL}/${grade}/${subject}/${slug}`).then(res => res.json());
        if (result.success) {
            concept.value = result.data;
        }
    })
</script>