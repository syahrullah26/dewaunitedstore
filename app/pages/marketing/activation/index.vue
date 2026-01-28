<script setup lang="ts">
import { ref } from "vue";
import { useActivations } from "~/composables/useActivations";
import type { Activation } from "~/types/activations";

const activeCategory = ref<string | null>(null);

const { activations, pending } = useActivations(
  activeCategory.value ?? undefined,
);

const selectedActivation = ref<Activation | null>(null);

const openModal = (item: Activation) => {
  selectedActivation.value = item;
};

const closeModal = () => {
  selectedActivation.value = null;
};

// optional helper badge color
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
  }
};
</script>

<template>
  <section class="min-h-screen bg-black text-white">
    <div class="max-w-7xl mx-auto px-6 py-20">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Activations Highlight</h1>
      <p class="text-gray-400 max-w-2xl">
        Highlight activation Dewa United Indonesia dalam membangun brand,
        komunitas, dan engagement lintas platform.
      </p>
    </div>
    <div class="flex gap-3 mb-10">
      <button
        v-for="c in ['holding', 'esports', 'fc', 'bc']"
        :key="c"
        @click="activeCategory = c"
        class="px-4 py-2 rounded-full border border-white/20 text-sm hover:border-[var(--gold-main)]"
      >
        {{ c.toUpperCase() }}
      </button>
    </div>

    <div class="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">
      <article
        v-for="item in activations"
        :key="item.id"
        class="group rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-[var(--gold-main)]/40 transition"
      >
        <div class="relative h-56 overflow-hidden">
          <img
            :src="item.cover_image"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <span
            class="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-md"
            :class="badgeColor(item.category)"
          >
            {{ item.category }}
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
            @click="openModal(item)"
            class="text-sm font-medium text-[var(--gold-main)] hover:underline"
          >
            Read activation →
          </button>
        </div>
      </article>
    </div>

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
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6"
        @click.self="closeModal"
      >
        <div
          class="max-w-3xl w-full bg-zinc-900 rounded-2xl overflow-hidden border border-white/10"
        >
          <div class="relative h-64">
            <img
              :src="selectedActivation.cover_image"
              alt=""
              class="w-full h-full object-cover"
            />
            <button
              @click="closeModal"
              class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-black/60 hover:bg-black transition"
            >
              ✕
            </button>
            <span
              class="absolute bottom-4 left-4 px-3 py-1 text-xs font-semibold rounded-full border backdrop-blur-md"
              :class="badgeColor(selectedActivation.category)"
            >
              {{ fullCategory(selectedActivation.category) }}
            </span>
          </div>

          <div class="p-8">
            <h2 class="text-2xl font-bold mb-4">
              {{ selectedActivation.title }}
            </h2>
            <p class="text-gray-400 leading-relaxed">
              {{ selectedActivation.content }}
            </p>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>
