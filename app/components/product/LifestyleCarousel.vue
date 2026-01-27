<script setup lang="ts">
defineProps<{
  images: string[]
}>()

const currentIndex = ref(0)
const carouselRef = ref<HTMLDivElement | null>(null)

const scrollToIndex = (index: number) => {
  if (!carouselRef.value) return

  carouselRef.value.scrollTo({
    left: carouselRef.value.clientWidth * index,
    behavior: 'smooth'
  })

  currentIndex.value = index
}

const next = () => {
  if (!carouselRef.value) return

  const maxIndex =
    Math.ceil(
      carouselRef.value.scrollWidth / carouselRef.value.clientWidth
    ) - 1

  if (currentIndex.value < maxIndex) {
    scrollToIndex(currentIndex.value + 1)
  }
}

const prev = () => {
  if (currentIndex.value > 0) {
    scrollToIndex(currentIndex.value - 1)
  }
}

const handleScroll = () => {
  if (!carouselRef.value) return

  const width = carouselRef.value.clientWidth
  currentIndex.value = Math.round(
    carouselRef.value.scrollLeft / width
  )
}

const totalSlides = computed(() => {
  if (!carouselRef.value) return 0
  return Math.ceil(
    carouselRef.value.scrollWidth / carouselRef.value.clientWidth
  )
})
</script>

<template>
  <div class="relative group">
    <div
      ref="carouselRef"
      @scroll="handleScroll"
      class="
        flex overflow-x-auto snap-x snap-mandatory scroll-smooth
        [-ms-overflow-style:none]
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      <div
        v-for="(img, i) in images"
        :key="i"
        class="min-w-full snap-start"
      >
        <img
          :src="img"
          :alt="`Lifestyle image ${i + 1}`"
          class="w-full h-auto object-cover"
        />
      </div>
    </div>
    <button
      v-if="currentIndex > 0"
      @click="prev"
      aria-label="Previous image"
      class="
        absolute left-4 top-1/2 -translate-y-1/2
        w-10 h-10 rounded-full
        bg-white/90 hover:bg-white
        shadow-lg
        flex items-center justify-center
        opacity-0 group-hover:opacity-100
        transition-opacity
      "
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
    <button
      v-if="currentIndex < totalSlides - 1"
      @click="next"
      aria-label="Next image"
      class="
        absolute right-4 top-1/2 -translate-y-1/2
        w-10 h-10 rounded-full
        bg-white/90 hover:bg-white
        shadow-lg
        flex items-center justify-center
        opacity-0 group-hover:opacity-100
        transition-opacity
      "
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>

    <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
      <button
        v-for="(_, i) in images"
        :key="i"
        @click="scrollToIndex(i)"
        :aria-label="`Go to image ${i + 1}`"
        :class="[
          'h-2 rounded-full transition-all duration-300',
          currentIndex === i
            ? 'w-6 bg-white'
            : 'w-2 bg-white/50 hover:bg-white/75'
        ]"
      />
    </div>
  </div>
</template>