<script setup lang="ts">
import type { Product } from '~/types/product'
import ProductGallery from './ProductGallery.vue';

type Tab = 'description' | 'fit' | 'designer'

const props = defineProps<{ 
  product: Product
  activeTab: Tab
}>()

const emit = defineEmits<{
  (e: 'update:activeTab', tab: Tab): void
}>()

const setActiveTab = (tab: Tab) => {
  emit('update:activeTab', tab)
}

const tabsRef = ref<HTMLDivElement | null>(null)
const isSticky = ref(false)
const tabRefs = ref<{ [key: string]: HTMLButtonElement | null }>({})

const setTabRef = (el: any, id: string) => {
  if (el) {
    tabRefs.value[id] = el
  }
}

const hasFitContent = computed(() => {
  return props.product.size_guide_desc || props.product.size_guide?.length
})

const hasDesignerContent = computed(() => {
  return props.product.detail_product || props.product.detail_images?.[0]?.url
})

const availableTabs = computed(() => {
  const tabs = [
    { id: 'description', label: 'Description', icon: 'M4 6h16M4 12h16M4 18h7' }
  ]
  
  if (hasFitContent.value) {
    tabs.push({ id: 'fit', label: 'Fit / Size Guide', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' })
  }
  
  if (hasDesignerContent.value) {
    tabs.push({ id: 'designer', label: "Detail Product", icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' })
  }
  
  return tabs
})

const underlineStyle = computed(() => {
  const activeTabElement = tabRefs.value[props.activeTab]
  if (!activeTabElement || !tabsRef.value) {
    return { transform: 'translateX(0)', width: '0px', opacity: '0' }
  }
  
  const tabsContainer = tabsRef.value.querySelector('.flex') as HTMLElement
  if (!tabsContainer) {
    return { transform: 'translateX(0)', width: '0px', opacity: '0' }
  }
  
  const containerRect = tabsContainer.getBoundingClientRect()
  const tabRect = activeTabElement.getBoundingClientRect()
  
  const left = tabRect.left - containerRect.left
  const width = tabRect.width
  
  return {
    transform: `translateX(${left}px)`,
    width: `${width}px`,
    opacity: '1'
  }
})

defineExpose({
  tabsRef
})

onMounted(() => {
  const handleScroll = () => {
    if (tabsRef.value) {
      const rect = tabsRef.value.getBoundingClientRect()
      isSticky.value = rect.top <= 0
    }
  }
  
  window.addEventListener('scroll', handleScroll)
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<template>
  <section class="bg-neutral-900 text-white w-full relative">
    <div 
      ref="tabsRef"
      :class="[
        'sticky top-0 z-40 bg-neutral-900 transition-shadow duration-200',
        isSticky ? 'shadow-lg shadow-black/20' : ''
      ]"
    >
      <div class="w-full px-6 md:px-12">
        <div class="relative">
          <div class="flex gap-12 border-b border-neutral-700 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <button
              v-for="tab in availableTabs"
              :key="tab.id"
              :ref="el => setTabRef(el, tab.id)"
              @click="setActiveTab(tab.id as any)"
              :class="[
                'flex items-center justify-center gap-3 py-6 text-lg font-medium transition-colors duration-200 whitespace-nowrap',
                activeTab === tab.id
                  ? 'text-[#aa8320ff]'
                  : 'text-white hover:text-[#aa8320ff]'
              ]"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.icon" />
              </svg>
              {{ tab.label }}
            </button>
          </div>
          <div 
            class="absolute bottom-0 left-0 h-0.5 bg-[#aa8320ff] transition-all duration-300 ease-out"
            :style="underlineStyle"
          />
        </div>
      </div>
    </div>
    
    <div
      class="
        w-full px-6 md:px-12
        pt-16 md:pt-24
        pb-24 md:pb-40
        relative
        h-[calc(100vh-96px)]
        overflow-hidden
        bg-zinc-900
      "
    >
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 translate-x-8"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-300 ease-in absolute inset-0"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-8"
      >
        <div v-if="activeTab === 'description'" key="description" class=
          "absolute inset-0 overflow-y-auto
          px-6 md:px-12
          pt-10 md:pt-14"
        >
          <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div v-if="product.description_video_url" class="order-2 lg:order-1 flex justify-center lg:justify-start">
              <div class="w-full max-w-md">
                <h3 class="text-2xl font-normal mb-6">Product Video</h3>
                <div class="w-full">
                  <video
                    :src="product.description_video_url"
                    autoplay
                    loop
                    muted
                    playsinline
                    class="w-full rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
            <div class="order-1 lg:order-2">
              <h2 class="text-3xl md:text-4xl font-normal mb-8 md:mb-10">Product Description</h2>
              <p class="text-neutral-300 leading-relaxed text-base md:text-lg text-justify">
                {{ product.description }}
              </p>
            </div>
          </div>
        </div>
      </Transition>

      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 translate-x-8"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-300 ease-in absolute inset-0"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-8"
      >
        <div v-if="activeTab === 'fit'" key="fit" class=
          "absolute inset-0 overflow-y-auto
          px-6 md:px-12
          pt-10 md:pt-14"
        >
          <div class="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div class="space-y-8 md:space-y-10">
              <h2 class="text-3xl md:text-4xl font-normal">Fit Guide</h2>
              <p class="text-neutral-300 text-base md:text-lg leading-relaxed">
                {{ product.size_guide_desc || product.description }}
              </p>

              <div v-if="product.size_guide?.length" class="pt-6">
                <h3 class="text-xl font-medium mb-6">Size Chart</h3>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead class="text-left border-b border-neutral-700">
                      <tr>
                        <th class="pb-3 font-medium text-neutral-400">Size</th>
                        <th class="pb-3 font-medium text-neutral-400">Chest (cm)</th>
                        <th class="pb-3 font-medium text-neutral-400">Waist (cm)</th>
                      </tr>
                    </thead>
                    <tbody class="text-neutral-300">
                      <tr
                        v-for="row in product.size_guide"
                        :key="row.size"
                        class="border-b border-neutral-800"
                      >
                        <td class="py-3">{{ row.size }}</td>
                        <td class="py-3">{{ row.chest }}</td>
                        <td class="py-3">{{ row.waist }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="flex justify-center lg:justify-end">
              <div class="bg-white rounded-lg p-6 md:p-8 max-w-md w-full">
                <img
                  :src="product.images[0]"
                  :alt="product.name"
                  class="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 translate-x-8"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-300 ease-in absolute inset-0"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 -translate-x-8"
      >
        <div v-if="activeTab === 'designer'" key="designer" class=
          "absolute inset-0 overflow-y-auto
          px-6 md:px-12
          pt-10 md:pt-14"
        >
          <div v-if="product.detail_product" class="max-w-4xl">
            <h2 class="text-3xl md:text-4xl font-normal mb-6">Detail Product</h2>
            <p class="text-neutral-300 text-base md:text-lg leading-relaxed">
              {{ product.detail_product }}
            </p>
          </div>

          <div v-if="product.detail_images?.length" class="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
            <div
              v-for="(detail, index) in product.detail_images"
              :key="index"
              class="space-y-4 flex flex-col items-center"
            >
              <div class="w-full max-w-100 aspect-square overflow-hidden rounded-lg bg-neutral-800">
                <img
                  :src="detail.url"
                  :alt="detail.caption || `Detail image ${index + 1}`"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p
                v-if="detail.caption"
                class="text-center text-base font-medium text-white"
              >
                {{ detail.caption }}
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>