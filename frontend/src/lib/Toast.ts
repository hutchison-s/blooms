import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastOptions {
  type?: ToastType
  duration?: number // ms
}

export interface Toast {
  id: number
  message: string
  type: ToastType
  duration: number
}

const toasts = ref<Toast[]>([])
let _id = 0

function remove(id: number) {
  const i = toasts.value.findIndex(t => t.id === id)
  if (i !== -1) toasts.value.splice(i, 1)
}

function show(message: string, opts: ToastOptions = {}) {
  const toast: Toast = {
    id: ++_id,
    message,
    type: opts.type ?? 'info',
    duration: Math.max(800, opts.duration ?? 2000),
  }
  toasts.value.push(toast)
  // auto-hide
  window.setTimeout(() => remove(toast.id), toast.duration)
  return toast.id
}

export function useToast() {
  return { toasts, show, remove }
}
