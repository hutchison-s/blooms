

<template>
  <section class="w-full h-full grid grid-rows-[14dvh_74dvh]">
    <FilterBar :grade-list="ALL_GRADES" :subject-list="ALL_SUBJECTS" @change="handleFilterChange"/>
    <ConceptList :concepts="concepts" :nextPageLink="nextPageLink" :status="conceptStatus" @next="getNextPage"/>
    </section>
</template>

<script setup lang="ts">
    import FilterBar from '@/components/FilterBar.vue';
    import ConceptList from '@/components/ConceptList.vue';
    import type { ConceptPreview } from '@/types/global';
    import { ALL_GRADES, ALL_SUBJECTS, QueryURLBuilder } from '@/assets/helpers';
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const route = useRoute();
    const router = useRouter();

    const baseURL = import.meta.env.VITE_API_BASE || 'https://www.bloomexplorer.xyz/api';

    const concepts = ref<ConceptPreview[]>([]);
    const nextPageLink = ref<string | null>(null);
    const conceptStatus = ref<'loading' | 'ready' | 'error'>('loading');

    const getNextPage = async () => {
        if (!nextPageLink.value) return;
        const url = new URL(nextPageLink.value);
        const nextData = await fetch(baseURL+url.search).then(res => res.json());
        concepts.value = [...concepts.value, ...nextData.data];
        nextPageLink.value = nextData.pagination.nextPage;
    }

    const handleFilterChange = async (q: {grade?: string, subject?: string, search?: string}) => {
        conceptStatus.value = 'loading'
        const url = new QueryURLBuilder(baseURL)
            .addParam('grade', q.grade)
            .addParam('subject', q.subject)
            .addParam('search', q.search)
            .toString()
        const response = await fetch(url).then(res => res.json())
        if (response.success) {
            concepts.value = response.data;
            nextPageLink.value = response.pagination.nextPage;
            conceptStatus.value = 'ready';
        } else {
            concepts.value = [];
            nextPageLink.value = null;
            conceptStatus.value = 'error'
        }
        router.replace({query: q})
        
    }

    onMounted(async () => {
        const query = route.query;
        const url = new QueryURLBuilder(baseURL)
        for (let k in query) {
            const val = query[k]?.valueOf();
            if (typeof val !== 'object') {
                url.addParam(k, val);
            }
        }
        const response = await fetch(url.toString()).then(res => res.json());
        if (response.success) {
            concepts.value = response.data;
            nextPageLink.value = response.pagination.nextPage;
            conceptStatus.value = 'ready';
        } else {
            concepts.value = [];
            nextPageLink.value = null;
            conceptStatus.value = 'error';
        }
    })

    
</script>