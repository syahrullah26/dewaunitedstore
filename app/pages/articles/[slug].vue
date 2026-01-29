<script setup lang="ts">
import { useArticleApi } from "~/composables/useArticle";
import type { Article } from "~/types/article";

const route = useRoute();
const { getPublishedArticle } = useArticleApi();

const slug = route.params.slug as string;

// Fetch article
const {
  data: article,
  pending,
  error,
} = await useAsyncData<Article>(`article-${slug}`, () =>
  getPublishedArticle(slug),
);

// Format date
const formatDate = (dateString: string | null) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Share functions
const shareOnTwitter = () => {
  const url = window.location.href;
  const text = article.value?.title || "";
  window.open(
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    "_blank",
  );
};

const shareOnFacebook = () => {
  const url = window.location.href;
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    "_blank",
  );
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy link:", err);
  }
};

// SEO Meta
useHead({
  title: article.value?.meta_title || article.value?.title || "Article",
  meta: [
    {
      name: "description",
      content: article.value?.meta_description || article.value?.excerpt || "",
    },
    {
      name: "keywords",
      content: article.value?.meta_keywords?.join(", ") || "",
    },
    { property: "og:title", content: article.value?.title || "" },
    { property: "og:description", content: article.value?.excerpt || "" },
    { property: "og:image", content: article.value?.banner_image || "" },
    { property: "og:type", content: "article" },
  ],
});
</script>
<template>
  <div class="min-h-screen bg-zinc-950">
    <!-- Loading State -->
    <div v-if="pending" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="animate-pulse">
        <div class="h-8 bg-zinc-900 rounded w-3/4 mb-4"></div>
        <div class="h-4 bg-zinc-900 rounded w-1/4 mb-8"></div>
        <div class="aspect-video bg-zinc-900 rounded-lg mb-8"></div>
        <div class="space-y-3">
          <div class="h-4 bg-zinc-900 rounded w-full"></div>
          <div class="h-4 bg-zinc-900 rounded w-full"></div>
          <div class="h-4 bg-zinc-900 rounded w-3/4"></div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center py-12">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4"
        >
          <svg
            class="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-zinc-50 mb-2">
          Article not found
        </h3>
        <p class="text-zinc-400 mb-6">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <NuxtLink
          to="/articles"
          class="inline-block px-6 py-3 bg-gold hover:bg-goldDark text-white font-medium rounded-lg transition-colors"
        >
          Back to Articles
        </NuxtLink>
      </div>
    </div>

    <!-- Article Content -->
    <article
      v-else-if="article"
      class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <!-- Back Button -->
      <NuxtLink
        to="/articles"
        class="inline-flex items-center gap-2 text-zinc-400 hover:text-gold mb-8 transition-colors"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Articles
      </NuxtLink>

      <!-- Article Header -->
      <header class="mb-8">
        <h1 class="text-4xl md:text-5xl font-bold text-zinc-50 mb-4">
          {{ article.title }}
        </h1>

        <!-- Meta Info -->
        <div class="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
          <span class="flex items-center gap-1">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {{ formatDate(article.published_at) }}
          </span>
          <span class="flex items-center gap-1">
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {{ article.view_count }} views
          </span>
        </div>
      </header>

      <!-- Banner Image -->
      <div
        v-if="article.banner_image"
        class="aspect-video bg-zinc-900 rounded-lg overflow-hidden mb-8"
      >
        <img
          :src="article.banner_image"
          :alt="article.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Article Content -->
      <div class="prose prose-invert prose-lg max-w-none mb-12">
        <div
          v-html="article.content"
          class="text-zinc-300 leading-relaxed"
        ></div>
      </div>

      <!-- Share Buttons (Optional) -->
      <div class="border-t border-zinc-800 pt-8">
        <p class="text-zinc-400 text-sm mb-4">Share this article:</p>
        <div class="flex gap-3">
          <button
            @click="shareOnTwitter"
            class="p-3 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors"
            title="Share on Twitter"
          >
            <svg
              class="w-5 h-5 text-zinc-50"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
              />
            </svg>
          </button>
          <button
            @click="shareOnFacebook"
            class="p-3 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors"
            title="Share on Facebook"
          >
            <svg
              class="w-5 h-5 text-zinc-50"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
              />
            </svg>
          </button>
          <button
            @click="copyLink"
            class="p-3 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors"
            title="Copy link"
          >
            <svg
              class="w-5 h-5 text-zinc-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  </div>
</template>

<style>
.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  @apply text-zinc-50 font-bold mt-8 mb-4;
}

.prose p {
  @apply mb-4;
}

.prose a {
  @apply text-gold hover:text-goldDark underline;
}

.prose ul,
.prose ol {
  @apply ml-6 mb-4;
}

.prose li {
  @apply mb-2;
}

.prose img {
  @apply rounded-lg my-6;
}

.prose blockquote {
  @apply border-l-4 border-gold pl-4 italic text-zinc-400 my-6;
}

.prose code {
  @apply bg-zinc-900 px-2 py-1 rounded text-sm text-gold;
}

.prose pre {
  @apply bg-zinc-900 p-4 rounded-lg overflow-x-auto my-6;
}
</style>