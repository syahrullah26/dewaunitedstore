<script setup lang="ts">
import type { Lookbook } from '~/types/lookbook';

const props = defineProps<{
  lookbook: Lookbook;
  index?: number;
}>();

const formatProductCount = (count: number) => {
  return count === 1 ? '1 Product' : `${count} Products`;
};
</script>

<template>
  <NuxtLink
    :to="`/lookbooks/${lookbook.slug}`"
    class="group relative block overflow-hidden rounded-lg bg-zinc-900 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
    :data-aos="index !== undefined && index % 2 === 0 ? 'fade-right' : 'fade-left'"
  >
    <div class="relative h-96 overflow-hidden">
      <img
        :src="lookbook.hero_image || 'https://via.placeholder.com/600x400?text=No+Image'"
        :alt="lookbook.name"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
      
      <div class="absolute top-4 right-4">
        <span class="rounded-full bg-gradient-to-r from-[#aa8320] to-[#7b5902] px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm">
          {{ formatProductCount(lookbook.products?.length || 0) }}
        </span>
      </div>
    </div>

    <div class="absolute bottom-0 left-0 right-0 p-6">
      <h3 class="mb-2 font-dharma text-3xl font-bold uppercase text-white transition-colors group-hover:text-[#cfa73a]">
        {{ lookbook.name }}
      </h3>
      
      <div class="flex items-center gap-2 text-sm text-[#cfa73a] transition-all group-hover:gap-3">
        <span class="font-medium uppercase tracking-wide">View Collection</span>
        <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  </NuxtLink>
</template>