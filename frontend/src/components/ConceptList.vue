<template>
      <div v-if="status == 'ready' && !isEmpty" class="relative flex flex-wrap items-start justify-center px-2 py-8 md:px-6 md:py-12 gap-x-4 gap-y-2 md:gap-y-4 bg-cyan-800 h-fit max-h-full overflow-y-auto mask-y-from-95%">
        <ConceptLink v-for="c of concepts" :concept_details="c" :key="c._id"/>
            <button v-if="nextPageLink" @click="$emit('next')" class="bg-black w-full sm:w-fit px-18 md:px-12 py-2 sm:py-5 md:py-8 rounded md:rounded-xl border-1 border-zinc-300 text-zinc-300">More</button>

        </div>
    <ErrorMessage v-else-if="status === 'ready' && isEmpty">Nothing here yet...</ErrorMessage>
    <ErrorMessage v-else-if="status === 'error'">Error loading concepts</ErrorMessage>
    <Loader v-else-if="status === 'loading'" />
</template>
<script setup lang="ts">
import type { ConceptPreview } from '@/types/global';
import ConceptLink from '@/components/ConceptLink.vue';
import Loader from '@/components/LogoLoader.vue';
import {computed} from 'vue'
import ErrorMessage from '@/components/ErrorMessage.vue';

    const props = defineProps<{
        concepts: ConceptPreview[],
        nextPageLink: string | null,
        status: 'ready' | 'loading' | 'error'
    }>()
    defineEmits<{next: []}>();

    const isEmpty = computed(() => props.status === 'ready' && props.concepts.length === 0);
</script>