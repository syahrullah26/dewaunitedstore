<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { initCarousels } from "flowbite";
import { useActivations } from "~/composables/useActivations";
import type { Activation } from "~/types/activations";

const activeCategory = ref<string | undefined>(undefined);
const { activations, pending } = useActivations(activeCategory.value);

const selectedActivation = ref<Activation | null>(null);

watch(activeCategory, () => {
  selectedActivation.value = null;
});

const openModal = async (item: Activation) => {
  selectedActivation.value = item;

  await nextTick();
  initCarousels();
};

const closeModal = () => {
  selectedActivation.value = null;
};

const badgeColor = (category: string) => {
  switch (category) {
    case "holding":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "esports":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    case "fc":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "bc":
      return "bg-pink-500/20 text-pink-400 border-pink-500/30";
    default:
      return "bg-white/10 text-white border-white/20";
  }
};

const fullCategory = (category: string) => {
  switch (category) {
    case "fc":
      return "Football Club";
    case "bc":
      return "Basketball Club";
    case "esports":
      return "Esports";
    case "holding":
      return "Holding";
    default:
      return category;
  }
};
</script>

<template>
  <section class="min-h-screen bg-black text-white">
    <!-- HEADER -->
    <div class="max-w-7xl mx-auto px-6 py-20">
      <h1
        class="text-4xl md:text-5xl font-bold mb-4"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        Activations Highlight
      </h1>
      <p
        class="text-gray-400 max-w-2xl"
        data-aos="fade-right"
        data-aos-delay="500"
      >
        Highlight activation Dewa United Indonesia dalam membangun brand,
        komunitas, dan engagement lintas platform.
      </p>

      <!-- FILTER -->
      <div
        class="flex gap-3 mt-8 flex-wrap"
        data-aos="slide-right"
        data-aos-delay="300"
      >
        <button
          @click="activeCategory = undefined"
          class="px-4 py-2 rounded-full border border-white/20 text-sm hover:border-[var(--gold-main)]"
        >
          ALL
        </button>

        <button
          v-for="c in ['holding', 'esports', 'fc', 'bc']"
          :key="c"
          @click="activeCategory = c"
          class="px-4 py-2 rounded-full border border-white/20 text-sm hover:border-[var(--gold-main)]"
        >
          {{ c.toUpperCase() }}
        </button>
      </div>
    </div>

    <!-- LOADING -->
    <div v-if="pending" class="text-center text-gray-400 py-20">
      Loading activations...
    </div>

    <!-- EMPTY -->
    <div
      v-else-if="!activations.length"
      class="text-center text-gray-500 py-20"
    >
      No activations found.
    </div>

    <!-- GRID -->
    <div v-else class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
      <article
        v-for="(item, index) in activations"
        :key="item.id"
        data-aos="fade-up"
        :data-aos-delay="700 + index * 100"
        class="group rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-[var(--gold-main)]/40 transition"
      >
        <NuxtLink :to="`/marketing/activation/${item.slug}`" class="block">
          <div class="relative h-56 overflow-hidden">
            <img
              :src="item.cover_image"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <span
              class="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-md"
              :class="badgeColor(item.category)"
            >
              {{ fullCategory(item.category) }}
            </span>
          </div>

          <div class="p-6">
            <h2
              class="text-xl font-semibold mb-2 group-hover:text-[var(--gold-main)]"
            >
              {{ item.title }}
            </h2>

            <p class="text-sm text-gray-400 mb-4 line-clamp-3">
              {{ item.excerpt }}
            </p>

            <button
              @click.prevent="openModal(item)"
              class="text-sm font-medium text-[var(--gold-main)] hover:underline"
            >
              Read activation →
            </button>
          </div>
        </NuxtLink>
      </article>
    </div>

    <!-- MODAL -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="selectedActivation"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 sm:px-6"
        @click.self="closeModal"
      >
        <article
          class="relative max-w-3xl w-full max-h-[90vh] bg-zinc-900 rounded-2xl overflow-hidden border border-white/10 shadow-xl flex flex-col"
        >
          <div class="relative shrink-0">
            <div class="relative h-56 sm:h-64 overflow-hidden">
              <div class="flex overflow-x-auto gap-4">
                <div
                  v-for="(image, index) in selectedActivation.gallery"
                  :key="index"
                  class="flex-shrink-0 w-80 h-48 sm:w-96 sm:h-60 rounded-xl overflow-hidden"
                >
                  <img :src="image" class="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            <button
              @click="closeModal"
              class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black flex items-center justify-center text-white"
            >
              ✕
            </button>
            <span
              class="absolute bottom-4 left-4 z-20 px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-md"
              :class="badgeColor(selectedActivation.category)"
            >
              {{ fullCategory(selectedActivation.category) }}
            </span>
          </div>

          <div class="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            <header class="space-y-2">
              <h2 class="text-2xl sm:text-3xl font-bold leading-tight">
                {{ selectedActivation.title }}
              </h2>

              <!-- META -->
              <div class="text-sm text-gray-400 flex flex-wrap gap-4">
                <span> 📍 {{ selectedActivation.location }} </span>
                <span>
                  🗓
                  {{ selectedActivation.start_date }} –
                  {{ selectedActivation.end_date }}
                </span>
              </div>
            </header>
            <div class="border-t border-white/10"></div>

            <div
              class="prose prose-invert prose-sm sm:prose-base max-w-none leading-relaxed text-justify"
            >
              {{ selectedActivation.content }}
              {{ selectedActivation.cover_image }}
              {{ selectedActivation.gallery }}
            </div>
          </div>
        </article>
      </div>
    </transition>
  </section>
</template>
