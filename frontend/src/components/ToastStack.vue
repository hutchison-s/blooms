<!-- src/components/ui/ToastStack.vue -->
<template>
  <Teleport to="body">
    <div
      class="pointer-events-none fixed inset-0 z-[9999] flex flex-col items-end p-4 gap-2 md:p-6"
      aria-live="polite"
      aria-atomic="false"
    >
      <TransitionGroup name="toast" tag="div" class="flex flex-col gap-2 w-full sm:w-auto">
        <div
          v-for="t in toasts"
          :key="t.id"
          role="status"
          class="pointer-events-auto w-full sm:min-w-[280px] sm:max-w-md rounded-2xl px-4 py-3 shadow-xl ring-1 ring-black/10 backdrop-blur
                 text-sm md:text-base flex items-start gap-3"
          :class="toastBg(t.type)"
        >
          <span class="mt-0.5 shrink-0">
            <svg v-if="t.type === 'success'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5">
              <path fill="currentColor" d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            <svg v-else-if="t.type === 'error'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5">
              <path fill="currentColor" d="M12 2 1 21h22L12 2zm0 15h-1v-1h2v1h-1zm1-3h-2V8h2v6z"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-5">
              <path fill="currentColor" d="M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10
              10-4.48 10-10S17.52 2 12 2z"/>
            </svg>
          </span>
          <p class="leading-snug">
            {{ t.message }}
          </p>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast, type ToastType } from '@/lib/Toast'
const { toasts } = useToast()

function toastBg(type: ToastType) {
  switch (type) {
    case 'success': return 'bg-emerald-600/90 text-white'
    case 'error': return 'bg-rose-600/90 text-white'
    default: return 'bg-zinc-900/90 text-zinc-50'
  }
}
</script>

<style scoped>
/* Enter/leave animation for group items */
.toast-enter-from {
  opacity: 0;
  transform: translateY(-12px) scale(0.98);
  filter: blur(8px);
}
.toast-enter-active {
  transition: all 220ms ease;
}
.toast-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: none;
}

.toast-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.toast-leave-active {
  transition: all 180ms ease;
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
  filter: blur(10px);
}
</style>
