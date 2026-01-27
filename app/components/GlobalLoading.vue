<script setup lang="ts">
import { useLoading } from '@/composables/useLoading'

const { isLoading } = useLoading()
</script>

<template>
  <div
    v-if="isLoading"
    class="fixed inset-0 z-9999 flex items-center justify-center bg-white/70 backdrop-blur-sm"
  >
    <img
      src="/dewa-united.png"
      alt="Loading"
      class="w-10 h-10 animate-spin"
    />
  </div>
</template>