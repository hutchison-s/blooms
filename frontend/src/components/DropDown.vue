<template>
  <div
    ref="dropdownRef"
    class="relative inline-block w-fit my-2"
    :class="classes"
    tabindex="0"
    @click="toggle"
    @blur="close"
    role="combobox"
    :aria-expanded="isOpen"
    :aria-haspopup="true"
    :aria-label="ariaLabel"
  >
    <button
      type="button"
      class="flex items-center justify-between border border-zinc-300/25 bg-zinc-300/10 text-zinc-300 rounded px-2 h-9 min-w-[100%] w-[max-content] focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-haspopup="listbox"
      :aria-expanded="isOpen"
      :style="{ width: `${widestWidth}px` }"
    >
      <span class="truncate" v-html="selectedLabel"></span>
      <svg
        class="ml-2 h-5 w-5 text-zinc-300/80"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <ul
      v-if="isOpen"
      class="absolute mt-1 min-w-[100%] w-[max-content] overflow-auto rounded border backdrop-blur border-zinc-300/25 bg-black/75 text-zinc-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
      role="listbox"
      tabindex="-1"
    >
      <li
        v-for="(option, index) in options"
        :key="index"
        @click.stop="select(option.value)"
        @touchend.stop="select(option.value)"
        :class="[
          'cursor-pointer select-none px-4 py-2',
          isSelected(option.value)
            ? 'bg-cyan-300 text-black'
            : 'hover:bg-zinc-700 hover:text-white',
        ]"
        role="option"
        :aria-selected="isSelected(option.value)"
      >
        <span v-html="option.label"></span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup generic="T">
import { ref, computed, watch, onBeforeUnmount } from 'vue'

interface Option {
  label: string
  value: T // object with any keys/values
}

const props = defineProps<{
  modelValue: T
  options: Option[]
  ariaLabel?: string
  classes?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: T): void
}>()

const isOpen = ref(false)

const select = (value: T): void => {
  emit('update:modelValue', value)
  setTimeout(() => {
    isOpen.value = false
  }, 0)
}

const isSelected = (value: T): boolean => {
  return JSON.stringify(value) === JSON.stringify(props.modelValue)
}

const selectedLabel = computed((): string => {
  const selected = props.options.find((opt) => isSelected(opt.value))
  return selected ? selected.label : 'Select...'
})

// Close dropdown if modelValue changes externally
watch(
  () => props.modelValue,
  () => {
    isOpen.value = false
  },
)

const widestWidth = computed((): number => {
  // count html unicode characters as 1 instead of 6 when evaluating things like &larr;
  const cleanedOptions = props.options.map((opt) => opt.label.replace(/&[a-z]+;/g, 'a'))
  return Math.max(...cleanedOptions.map((opt) => opt.length * 12.5)) + 12
})

const dropdownRef = ref<HTMLDivElement | null>(null)

function handleClickOutside(event: MouseEvent | TouchEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    event.stopPropagation()
    close()
  }
}

function open() {
  isOpen.value = true
  console.log('open')
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('touchend', handleClickOutside)
}

function close() {
  isOpen.value = false
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('touchend', handleClickOutside)
}

function toggle() {
  if (isOpen.value) {
    close()
  } else {
    open()
  }
}

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('touchend', handleClickOutside)
})
</script>
