

<template>
    <ul class="overflow-y-auto h-full" style="scroll-snap-type: y mandatory;"
    >
        <li class="min-h-screen w-full bg-black text-zinc-300 px-6 text-xl pt-8 pb-20" style="scroll-snap-align: start;">
        <h2 :class="hClass">What is Bloom Explorer?</h2>
        <p :class="pClass">
            Bloom Explorer was built with teachers and their students in mind. We know how challenging it can be to come up with thoughtful, level-appropriate questions that truly get kids thinking, so we&apos;ve done the hard part for you. Using trusted sources like state standards and curriculum guides, we&apos;ve created a library of example questions organized by Bloom&apos;s Taxonomy, subjects, and grade levels from 3 to 8. Whether you're planning a lesson, tailoring instruction to different needs, or just looking for a bit of inspiration, Bloom Explorer helps support deeper thinking without the guesswork. It's designed to make critical thinking easier to teach and more engaging to learn.
        </p>
        <h2 :class="hClass">What is Bloom's Taxonomy?</h2>
<p :class="pClass">Bloom's Taxonomy is a framework used to classify different levels of cognitive skills and learning objectives. Developed by educational psychologist Benjamin Bloom in 1956, the taxonomy provides a hierarchical model for educators to organize learning outcomes, helping students progress from basic knowledge acquisition to higher-order thinking skills.</p>
<p :class="pClass">The taxonomy is often visualized as a pyramid with six levels, each representing a deeper, more complex stage of thinking. This site presents the levels in vertical levels in ascending complexity of thinking that you can explore as you dive deeper in each concept.</p>
<p :class="pClass">Scroll down to learn more about the levels of Bloom&apos;s Taxonomy:</p>
    </li>
        <BloomLevelAbout v-for="level of levelInfo" :key="level.id" :level="level"/>
    </ul>
</template>

<script setup lang="ts">
import BloomLevelAbout from '@/components/BloomLevelAbout.vue';
import { levelInfo } from '@/assets/helpers';

const hClass = "uppercase font-black text-cyan-700 text-2xl md:text-4xl leading-loose"
const pClass = "font-light leading-loose mb-4 last:mb-0"

</script>