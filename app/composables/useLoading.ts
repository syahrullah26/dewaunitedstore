import { ref } from 'vue'

const isLoading = ref<boolean>(false)
let timer: ReturnType<typeof setTimeout> | null = null

export function useLoading() {
  const startLoading = () => {
    isLoading.value = true
  }

  const stopLoading = (delay = 100) => {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      isLoading.value = false
    }, delay)
  }

  return {
    isLoading,
    startLoading,
    stopLoading
  }
}