<script setup lang="ts">
import type { Product } from '~/types/product'
defineProps<{ products: Product[] }>()
</script>

<template>
  <div>
    <h2 class="mb-10 text-xl md:text-2xl font-normal tracking-tight">
      You May Also Like
    </h2>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <NuxtLink
        v-for="p in products"
        :key="p.id"
        :to="`/products/${p.slug}`"
        class="group"
      >
        <div class="aspect-3/4 bg-neutral-100 overflow-hidden rounded-sm mb-4">
          <img
            :src="p.images?.[0]"
            :alt="p.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <p class="text-sm font-medium group-hover:underline mb-1">
          {{ p.name }}
        </p>
        <p class="text-sm text-neutral-600">
          Rp.{{ p.price }}
        </p>
      </NuxtLink>
    </div>
  </div>
</template>