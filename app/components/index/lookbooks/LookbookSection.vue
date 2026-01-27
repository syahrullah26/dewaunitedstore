<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import type { Lookbook } from '~/types/lookbook'

const props = defineProps<{
  limit?: number
}>()

const { fetchLookbooks } = useLookbooks()

const lookbooks = ref<Lookbook[]>([])
const loading = ref(true)
const error = ref(false)

const formatPrice = (price: number) =>
  new Intl.NumberFormat('id-ID').format(price)

const sortedLookbooks = computed(() => {
  const sorted = [...lookbooks.value].sort((a, b) => {
    const dateA = new Date(a.created_at || 0).getTime()
    const dateB = new Date(b.created_at || 0).getTime()
    return dateB - dateA
  })
  
  return props.limit ? sorted.slice(0, props.limit) : sorted
})

onMounted(async () => {
  loading.value = true

  const result = await fetchLookbooks()
  if (result?.data && Array.isArray(result.data)) {
    lookbooks.value = result.data
    error.value = false
  } else {
    error.value = true
  }

  loading.value = false
})
</script>

<template>
  <section class="bg-black py-16 lg:py-24">
    <div class="container mx-auto px-6">

      <h2 
        class="font-dharma text-4xl lg:text-6xl font-bold uppercase text-white text-center mb-12 lg:mb-16"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        Our <span class="text-[var(--gold-main)]">Collection</span>
      </h2>

      <div v-if="loading" class="flex justify-center py-20">
        <div class="h-12 w-12 animate-spin rounded-full border-2 border-t-transparent border-[#cfa73a]"></div>
      </div>

      <div v-else-if="error" class="py-20 text-center text-red-500">
        Failed to load lookbooks.
      </div>

      <div v-else class="space-y-28">

        <div
          v-for="(lookbook, index) in sortedLookbooks"
          :key="lookbook.id"
          class="space-y-8"
          :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
          data-aos-duration="1000"
          :data-aos-delay="index * 100"
        >

          <div class="-mx-6 px-6 overflow-x-auto scrollbar-hide">
            <div class="flex gap-4 w-max lg:pr-24">
              <NuxtLink
                v-for="product in (lookbook.products ?? []).slice(2)"
                :key="product.id"
                :to="`/products/${product.slug}`"
                class="
                  group relative flex-shrink-0
                  w-[65vw] sm:w-[220px] lg:w-[340px]
                  aspect-[4/5]
                  overflow-hidden rounded-lg bg-zinc-900
                "
              >
                <img
                  :src="product.images?.[0] || 'https://via.placeholder.com/400'"
                  :alt="product.name"
                  class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>

                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 opacity-0 group-hover:opacity-100 transition">
                  <p class="text-sm font-medium text-white line-clamp-1">
                    {{ product.name }}
                  </p>
                  <p class="text-xs text-[#cfa73a]">
                    Rp {{ formatPrice(product.price) }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>

          <div 
            :class="[
              'grid grid-cols-1 gap-4',
              index % 2 === 0 
                ? 'lg:grid-cols-[2.4fr_1fr]' 
                : 'lg:grid-cols-[1fr_2.4fr]'
            ]"
          >

            <div 
              v-if="index % 2 !== 0"
              class="grid grid-cols-1 gap-4 lg:grid-rows-2 lg:gap-2 order-2 lg:order-1"
            >
              <NuxtLink
                v-for="product in (lookbook.products ?? []).slice(0, 2)"
                :key="product.id"
                :to="`/products/${product.slug}`"
                class="
                  group relative
                  aspect-[16/9] lg:aspect-auto
                  overflow-hidden rounded-lg bg-zinc-900
                "
              >
                <img
                  :src="product.images?.[0] || 'https://via.placeholder.com/400'"
                  :alt="product.name"
                  class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>

                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 opacity-0 group-hover:opacity-100 transition">
                  <p class="text-sm font-medium text-white line-clamp-1">
                    {{ product.name }}
                  </p>
                  <p class="text-xs text-[#cfa73a]">
                    Rp {{ formatPrice(product.price) }}
                  </p>
                </div>
              </NuxtLink>
            </div>

            <NuxtLink
              :to="`/lookbooks/${lookbook.slug}`"
              :class="[
                'group relative aspect-[16/9] overflow-hidden rounded-lg bg-zinc-900',
                index % 2 === 0 ? 'order-1' : 'order-1 lg:order-2'
              ]"
            >
              <img
                :src="lookbook.hero_image || 'https://via.placeholder.com/1600x900'"
                :alt="lookbook.name"
                class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              <div class="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <h3 class="font-dharma text-3xl lg:text-5xl font-bold uppercase text-white">
                  {{ lookbook.name }}
                </h3>
                <p class="mt-1 text-gray-300">
                  {{ (lookbook.products ?? []).length }} Items
                </p>
              </div>
            </NuxtLink>

            <div 
              v-if="index % 2 === 0"
              class="grid grid-cols-1 gap-4 lg:grid-rows-2 lg:gap-2 order-2"
            >
              <NuxtLink
                v-for="product in (lookbook.products ?? []).slice(0, 2)"
                :key="product.id"
                :to="`/products/${product.slug}`"
                class="
                  group relative
                  aspect-[16/9] lg:aspect-auto
                  overflow-hidden rounded-lg bg-zinc-900
                "
              >
                <img
                  :src="product.images?.[0] || 'https://via.placeholder.com/400'"
                  :alt="product.name"
                  class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>

                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 opacity-0 group-hover:opacity-100 transition">
                  <p class="text-sm font-medium text-white line-clamp-1">
                    {{ product.name }}
                  </p>
                  <p class="text-xs text-[#cfa73a]">
                    Rp {{ formatPrice(product.price) }}
                  </p>
                </div>
              </NuxtLink>
            </div>

          </div>

        </div>
      </div>
    </div>
  </section>
</template>