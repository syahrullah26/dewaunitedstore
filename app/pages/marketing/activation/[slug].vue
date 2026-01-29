<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useActivations } from "~/composables/useActivations";
import type { Activation } from "~/types/activations";

const route = useRoute();
const slug = ref(route.params.slug as string);

const { activations, pending } = useActivations();

const selectedActivation = computed<Activation | null>(() => {
  if (!activations.value || !slug.value) return null;
  return activations.value.find((a) => a.slug === slug.value) || null;
});

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
  <main class="min-h-screen bg-zinc-900 text-white">
    <!-- Hero / Cover Image -->
    <section class="relative h-64 sm:h-64 overflow-hidden rounded-b-2xl">
      <img
        v-if="selectedActivation?.cover_image"
        :src="selectedActivation.cover_image"
        alt="Cover Image"
        class="w-full h-full object-cover"
      />

      <!-- Badge Category -->
      <span
        v-if="selectedActivation"
        class="absolute bottom-4 left-4 px-3 py-1 text-sm font-semibold rounded-full border backdrop-blur-md"
        :class="badgeColor(selectedActivation.category)"
      >
        {{ fullCategory(selectedActivation.category) }}
      </span>
    </section>

    <!-- Main Content -->
    <section class="max-w-4xl mx-auto p-6 sm:p-12 space-y-10">
      <!-- Title & Meta -->
      <header class="space-y-3">
        <h1 class="text-3xl sm:text-5xl font-bold leading-tight">
          {{ selectedActivation?.title }}
        </h1>

        <div class="text-sm text-gray-400 flex flex-wrap gap-4">
          <span>📍 {{ selectedActivation?.location }}</span>
          <span
            >🗓 {{ selectedActivation?.start_date }} –
            {{ selectedActivation?.end_date }}</span
          >
        </div>
      </header>

      <hr class="border-white/10" />

      <!-- Article Content -->
      <article
        class="prose prose-invert sm:prose-lg max-w-none text-justify leading-relaxed"
      >
        <p>{{ selectedActivation?.content }}</p>
      </article>

      <!-- Gallery Carousel -->
      <div v-if="selectedActivation?.gallery?.length" class="space-y-4">
        <h2 class="text-2xl font-bold">Gallery</h2>

        <div
          class="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900"
        >
          <div
            v-for="(image, index) in selectedActivation.gallery"
            :key="index"
            class="snap-start flex-shrink-0 w-72 h-44 sm:w-96 sm:h-60 rounded-xl overflow-hidden shadow-lg"
          >
            <img
              :src="image"
              alt="Gallery Image"
              class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
