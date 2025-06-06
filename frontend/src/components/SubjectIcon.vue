<template>
  <img
    :title="subject"
    :src="src"
    :alt="subject"
    width="16px"
    height="16px"
    class="invert size-5 md:size-7"
  />
</template>

<script setup lang="ts">
const props = defineProps<{ subject: string }>()
import art from '@/assets/art.svg'
import music from '@/assets/music.svg'
import languageArts from '@/assets/languageArts.svg'
import socialStudies from '@/assets/socialStudies.svg'
import math from '@/assets/math.svg'
import health from '@/assets/health.svg'
import tech from '@/assets/technology.svg'
import science from '@/assets/science.svg'

const icons: Record<string, string> = {
  Art: art,
  Music: music,
  'Language Arts': languageArts,
  'Social Studies': socialStudies,
  Math: math,
  Health: health,
  Technology: tech,
  Science: science,
}
const src = icons[props.subject]
</script>
