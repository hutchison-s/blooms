<template>
  <span ref="el" v-html="content"></span>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from 'vue'
import { loadMathJax } from '@/lib/MathJaxLoader'

const props = defineProps<{ content: string }>()
const el = ref<HTMLElement>()

async function renderMath() {
  const MathJax = await loadMathJax()
  if (el.value) {
    await MathJax.typesetPromise([el.value])
  }
}

onMounted(renderMath)
watch(() => props.content, renderMath)

</script>