<template>
    <article class="w-full overflow-auto py-12 lg:py-20 px-6 " :class="levelColors" >
        <h4 class="text-4xl lg:text-[5rem] uppercase font-black">{{ title }}</h4>
        <ul class="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-12 lg:mt-20 lg:gap-12 px-2 lg:px-8 my-8 list-none">
            <li v-for="(question, idx) in questions" :key="idx" class="text-xl lg:text-3xl font-[100]">
                {{ question }}
            </li>
        </ul>
    </article>
</template>

<script setup lang="ts">
import { levelColorMap } from '@/assets/helpers';

    const props = defineProps<{
        title: string,
        questions: string[]
    }>()

    const levelColors = levelColorMap[props.title]

</script>