<template>
  <span class="px-3 py-1 rounded-full bg-black/50" :class="gradeColorMap[grade]">{{
    toOrdinal(grade)
  }}</span>
</template>

<script setup lang="ts">
import { gradeColorMap, toOrdinal } from '@/assets/helpers'
defineProps<{
  grade: number
}>()
</script>
