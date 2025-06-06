<template>
    <QuestionDepth :concept="concept" />
</template>

<script setup lang="ts">
    import {ref, onMounted} from 'vue';
    import {useRoute, useRouter} from 'vue-router';
    import type {Concept} from '@/types/global';
    import QuestionDepth from '@/components/QuestionDepth.vue'
    const route = useRoute();
    const router = useRouter();
    const {grade, subject, slug} = route.params;
    const concept = ref<Concept>();

    const baseURL = import.meta.env.VITE_API_BASE + '/concepts';

    onMounted(async ()=>{
        const result = await fetch(`${baseURL}/${grade}/${subject}/${slug}`).then(res => res.json()).catch(err => {
            console.error(err);
            return router.push({name: 'NotFound'});
        });
        if (result.success) {
            concept.value = result.data;
        } else {
            console.error(result.error);
            router.push({name: 'Error'});
        }
    })
</script>