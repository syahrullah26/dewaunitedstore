<script setup lang="ts">
import type { Product } from "~/types/product";
import { useCartStore } from "~/stores/cart";

const route = useRoute();
type Tab = "description" | "fit" | "designer";

const activeTab = ref<Tab>("description");
const productTabsRef = ref<any>(null);
const selectedColor = ref(-1); 

const { addToCart } = useCartActions();

const smoothScrollTo = (element: HTMLElement, duration: number = 800) => {
  const targetPosition = element.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const distance = targetPosition - startPosition;
  let startTime: number | null = null;

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const ease =
      progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, startPosition + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  };

  requestAnimationFrame(animation);
};

const openFitGuide = async () => {
  activeTab.value = "fit";
  await nextTick();
  await new Promise((resolve) => setTimeout(resolve, 100));
  if (productTabsRef.value?.tabsRef) {
    smoothScrollTo(productTabsRef.value.tabsRef, 800);
  }
};

const { product, pending, error } = await useProduct(
  route.params.slug as string,
);

if (error.value || !product.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Product not found",
  });
}

const p = computed<Product>(() => product.value!);

const currentImages = computed(() => {
  if (selectedColor.value === -1) {
    return p.value?.images || [];
  }
  const color = p.value?.colors?.[selectedColor.value];
  return color?.images?.length ? color.images : p.value?.images || [];
});

const currentColorName = computed(() => {
  if (selectedColor.value === -1) {
    return "Default";
  }
  return p.value?.colors?.[selectedColor.value]?.name || "";
});

const heroDetailImage = computed<string | null>(() => {
  return p.value.detail_images?.[0]?.url ?? null;
});

useSeoMeta({
  title: () => p.value.name,
  description: () => p.value.category,
  ogImage: () => heroDetailImage.value ?? undefined,
});
</script>

<template>
  <div
    v-if="pending"
    class="h-screen grid place-items-center text-sm text-neutral-500"
  >
    <div class="flex flex-col items-center gap-4">
      <div
        class="w-8 h-8 border-2 border-neutral-300 border-t-black rounded-full animate-spin"
      />
      <p>Loading product…</p>
    </div>
  </div>

  <div
    v-else
    class="bg-black text-black [&_.overflow-x-auto::-webkit-scrollbar]:h-1.5 [&_.overflow-x-auto::-webkit-scrollbar-track]:bg-neutral-100 [&_.overflow-x-auto::-webkit-scrollbar-thumb]:bg-neutral-300 [&_.overflow-x-auto::-webkit-scrollbar-thumb]:rounded [&_.overflow-x-auto::-webkit-scrollbar-thumb:hover]:bg-neutral-400"
  >
    <section class="w-full">
      <div class="grid lg:grid-cols-[1.2fr,0.8fr] min-h-screen">
        <div class="bg-white">
          <ProductGallery :images="currentImages" :video="p.video_url" />
        </div>

        <div class="bg-stone-100 px-8 py-12">
          <ProductInfo
            :product="p"
            :selected-color="selectedColor"
            :current-color-name="currentColorName"
            @update:selected-color="selectedColor = $event"
            @open-fit-guide="openFitGuide"
          />
        </div>
      </div>
    </section>

    <ProductTabs
      ref="productTabsRef"
      :product="p"
      v-model:activeTab="activeTab"
    />

    <section v-if="p.lifestyle_images?.length" class="bg-black">
      <ProductLifestyleCarousel :images="p.lifestyle_images" />
    </section>

    <section
      v-if="p.related_products?.length"
      class="max-w-350~ mx-auto px-6 md:px-12 pb-24 md:pb-32 bg-black"
    >
      <RelatedProducts :products="p.related_products" />
    </section>
  </div>
</template>