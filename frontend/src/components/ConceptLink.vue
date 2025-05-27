<template>
    <RouterLink 
        :to="link" :key="_id" 
        class="px-4 py-2 md:px-6 md:py-3 md:text-xl md:rounded-xl border-1 border-cyan-600 bg-black/25 hover:bg-black/40 hover:shadow-xl text-zinc-300 cursor-pointer rounded ">
        <div class="flex justify-between py-1 gap-6 text-sm md:text-lg items-center">
            <div class="opacity-80" :class="gradeColorMap[gradeLevel]">{{ toOrdinal(gradeLevel) }}</div>
            <div class="opacity-50">
                <SubjectIcon :subject="subjectArea" />
            </div>
        </div>
        <p class="text-center font-light">{{ slugToTitle(concept) }}</p>
    </RouterLink>
</template>

<script setup lang="ts">
    import type { ConceptPreview } from '@/types/global';
    import { RouterLink } from 'vue-router';
    import { gradeColorMap, slugToTitle, toOrdinal } from '@/assets/helpers';
import SubjectIcon from '@/components/SubjectIcon.vue';
    const details = defineProps<{concept_details: ConceptPreview}>();
    const {_id, gradeLevel, subjectArea, concept} = details.concept_details;
    const link = `/concepts/${gradeLevel}/${subjectArea}/${concept}`

</script>