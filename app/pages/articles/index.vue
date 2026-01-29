<script setup lang="ts">
import { useArticleApi } from '~/composables/useArticle'
import type { Article, PaginatedResponse } from '~/types/article'

const { getPublishedArticles } = useArticleApi()

const retryFetch = () => {
  refresh()
}
const searchQuery = ref('')
const currentPage = ref(1)

let searchTimeout: ReturnType<typeof setTimeout> | null = null

const { data: articles, pending, error, refresh } = await useAsyncData<PaginatedResponse<Article>>(
  'published-articles',
  () => getPublishedArticles({
    search: searchQuery.value || undefined,
    page: currentPage.value,
    per_page: 12
  }),
  {
    watch: [currentPage]
  }
)

// Debounced search
const debounceSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1 
    refresh()
  }, 500)
}

// Pagination
const goToPage = (page: number) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Format date
const formatDate = (dateString: string | null) => {
  if (!dateString) return 'N/A'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// SEO Meta
useHead({
  title: 'Articles - Dewa United',
  meta: [
    { name: 'description', content: 'Latest news and updates from Dewa United FC' },
    { property: 'og:title', content: 'Articles - Dewa United' },
    { property: 'og:description', content: 'Latest news and updates from Dewa United FC' }
  ]
})
</script>
<template>
  <div class="min-h-screen bg-zinc-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Header -->
      <div class="mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-zinc-50 mb-4">Articles</h1>
        <p class="text-lg text-zinc-400">Latest news and updates from Dewa United</p>
      </div>

      <!-- Search Bar -->
      <div class="mb-8">
        <div class="relative max-w-xl">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search articles..."
            @input="debounceSearch"
            class="w-full px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-50 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent"
          />
          <svg
            class="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 6" :key="i" class="animate-pulse">
          <div class="bg-zinc-900 rounded-lg overflow-hidden">
            <div class="aspect-video bg-zinc-800"></div>
            <div class="p-6">
              <div class="h-4 bg-zinc-800 rounded w-3/4 mb-3"></div>
              <div class="h-4 bg-zinc-800 rounded w-1/2 mb-4"></div>
              <div class="h-3 bg-zinc-800 rounded w-full mb-2"></div>
              <div class="h-3 bg-zinc-800 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-zinc-50 mb-2">Failed to load articles</h3>
        <p class="text-zinc-400 mb-6">{{ error.message }}</p>
        <button
          @click="retryFetch"
          class="px-6 py-3 bg-gold hover:bg-goldDark text-white font-medium rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>

      <!-- Articles Grid -->
      <div v-else-if="articles && articles.data.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="article in articles.data"
            :key="article.id"
            class="group bg-zinc-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-gold transition-all duration-300"
          >
            <NuxtLink :to="`/articles/${article.slug}`">
              <!-- Banner Image -->
              <div class="aspect-video bg-zinc-800 overflow-hidden">
                <img
                  v-if="article.banner_image"
                  :src="article.banner_image"
                  :alt="article.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-zinc-600">
                  <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6">
                <!-- Date & Views -->
                <div class="flex items-center gap-4 text-sm text-zinc-500 mb-3">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    {{ article.view_count }}
                  </span>
                </div>

                <!-- Title -->
                <h2 class="text-xl font-bold text-zinc-50 mb-3 group-hover:text-gold transition-colors line-clamp-2">
                  {{ article.title }}
                </h2>

                <!-- Excerpt -->
                <p class="text-zinc-400 line-clamp-3 mb-4">
                  {{ article.excerpt || 'No description available.' }}
                </p>

                <!-- Read More -->
                <div class="flex items-center text-gold font-medium group-hover:gap-2 transition-all">
                  <span>Read More</span>
                  <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </NuxtLink>
          </article>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center items-center gap-4 mt-12">
          <button
            @click="goToPage(articles.current_page - 1)"
            :disabled="!articles.prev_page_url"
            class="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          <span class="text-zinc-400">
            Page {{ articles.current_page }} of {{ articles.last_page }}
          </span>

          <button
            @click="goToPage(articles.current_page + 1)"
            :disabled="!articles.next_page_url"
            class="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-12">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 mb-4">
          <svg class="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-zinc-50 mb-2">No articles found</h3>
        <p class="text-zinc-400">Check back later for new content</p>
      </div>
    </div>
  </div>
</template>