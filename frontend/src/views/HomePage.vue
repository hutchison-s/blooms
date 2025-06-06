<template>
  <section
    class="w-full min-h-[88dvh] flex flex-col gap-8 py-12 max-w-[800px] mx-auto px-6 text-zinc-300"
  >
    <h1 class="leading-relaxed text-4xl md:text-5xl text-center text-zinc-300">
      Because <span class="uppercase font-black text-blue-300">good&nbsp;questions</span> are the
      start of <span class="uppercase font-black text-blue-300">great&nbsp;thinking</span>
    </h1>
    <p class="font-light text-xl">
      Bloom Explorer is a simple tool designed for teachers and students to explore academic
      concepts through the lens of Bloom&apos;s Taxonomy. Whether you're planning a lesson,
      differentiating instruction, or helping students think critically, this site helps break down
      concepts by cognitive level — from basic recall to creative synthesis.
    </p>
    <RouterLink
      class="block mx-auto w-fit transition-all duration-200 border-1 border-zinc-300 rounded text-xl px-6 py-2 bg-black hover:bg-blue-300 hover:text-black hover:scale-102 hover:shadow-xl"
      to="/explore"
      >Start Thinking Deeply</RouterLink
    >

    <p class="font-light text-xl">
      We pull from state standards, curriculum guides, and trusted educational sources to map out
      real academic skills in plain language. Filter by grade, subject, or even search your own
      terms to find ideas that meet your students where they are — and push them further.
    </p>
    <RouterLink
      class="block mx-auto w-fit transition-all duration-200 border-1 border-zinc-300 rounded text-xl px-6 py-2 hover:bg-black/10 hover:scale-102 hover:shadow-xl"
      to="/about"
      >Learn More</RouterLink
    >
    <p class="font-light text-xl">
      Built to be quick, visual, and classroom-friendly. No login. No fluff. Just clear thinking,
      organized by Bloom.
    </p>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
