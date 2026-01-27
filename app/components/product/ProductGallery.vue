<script setup lang="ts">
defineProps<{
  images: string[]
  video?: string | null
}>()
</script>

<template>
  <div>
    <div
      v-if="video"
      class="bg-neutral-100 overflow-hidden rounded-sm"
    >
      <video
        :src="video"
        autoplay
        muted
        loop
        playsinline
        class="block w-full h-full object-contain object-top"
      />
    </div>
    <div
      v-for="(img, i) in images"
      :key="i"
      class="bg-neutral-100 overflow-hidden rounded-sm"
    >
      <img
        :src="img"
        :alt="`Product image ${i + 1}`"
        class="block w-full h-full object-contain object-top mt-4"
      />
    </div>

  </div>
</template>