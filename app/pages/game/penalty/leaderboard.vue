<script setup lang="ts">
import type { LeaderboardEntry, Pagination } from '~/types/penalty-game'
import { usePenaltyGame } from '~/composables/usePenaltyGame'

definePageMeta({
  middleware: 'auth-middleware' // Sesuaikan dengan nama middleware di project Anda
})

const { getLeaderboard } = usePenaltyGame()

const leaderboard = ref<LeaderboardEntry[]>([])
const pagination = ref<Pagination | null>(null)
const currentPage = ref(1)
const isLoading = ref(false)

// Load leaderboard
const loadLeaderboard = async (page: number = 1) => {
  try {
    isLoading.value = true
    const response = await getLeaderboard(page, 20)
    leaderboard.value = response.data
    pagination.value = response.pagination
    currentPage.value = page
  } catch (error) {
    console.error('Failed to load leaderboard:', error)
  } finally {
    isLoading.value = false
  }
}

// Load on mount
onMounted(() => {
  loadLeaderboard()
})

// Get medal emoji based on rank
const getMedal = (rank: number): string => {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return ''
}

// Get rank classes
const getRankClasses = (rank: number): string => {
  if (rank === 1) return 'bg-gradient-to-br from-yellow-300 to-yellow-400 border-yellow-400'
  if (rank === 2) return 'bg-gradient-to-br from-gray-300 to-gray-400 border-gray-400'
  if (rank === 3) return 'bg-gradient-to-br from-amber-600 to-amber-700 border-amber-600'
  return 'bg-gray-50 border-gray-200'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-5">
    <div class="max-w-5xl mx-auto">
      
      <!-- Header -->
      <div class="text-center mb-8 relative">
        <NuxtLink 
          to="/game/penalty" 
          class="absolute left-0 top-0 text-white font-semibold px-5 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
        >
          ← Kembali
        </NuxtLink>
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-3">
          🏆 Leaderboard
        </h1>
        <p class="text-lg md:text-xl text-white/90">
          Top pemain dengan poin tertinggi
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading && leaderboard.length === 0" class="bg-white rounded-3xl p-16 shadow-2xl text-center">
        <div class="inline-block w-12 h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin mb-5"></div>
        <p class="text-gray-600 text-lg">Memuat leaderboard...</p>
      </div>

      <!-- Leaderboard Table -->
      <div v-else class="bg-white rounded-3xl p-5 md:p-8 shadow-2xl">
        <div 
          v-for="entry in leaderboard" 
          :key="entry.rank"
          class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-5 rounded-xl mb-3 border-2 transition-all hover:translate-x-1 hover:shadow-lg"
          :class="getRankClasses(entry.rank)"
        >
          <!-- Rank Column -->
          <div class="md:col-span-2 flex items-center gap-3">
            <span class="text-2xl md:text-3xl font-bold text-gray-800">{{ entry.rank }}</span>
            <span class="text-3xl md:text-4xl">{{ getMedal(entry.rank) }}</span>
          </div>
          
          <!-- User Column -->
          <div class="md:col-span-4">
            <span class="text-lg md:text-xl font-semibold text-gray-800">{{ entry.user.name }}</span>
          </div>
          
          <!-- Stats Column -->
          <div class="md:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            <div class="text-center">
              <span class="block text-xs text-gray-600 mb-1">Poin</span>
              <span class="block text-xl md:text-2xl font-bold text-purple-600">{{ entry.total_points }}</span>
            </div>
            <div class="text-center">
              <span class="block text-xs text-gray-600 mb-1">Gol</span>
              <span class="block text-lg md:text-xl font-bold text-gray-800">{{ entry.total_goals }}</span>
            </div>
            <div class="text-center">
              <span class="block text-xs text-gray-600 mb-1">Game</span>
              <span class="block text-lg md:text-xl font-bold text-gray-800">{{ entry.games_played }}</span>
            </div>
            <div class="text-center">
              <span class="block text-xs text-gray-600 mb-1">Akurasi</span>
              <span class="block text-lg md:text-xl font-bold text-gray-800">{{ entry.accuracy }}%</span>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="leaderboard.length === 0" class="text-center py-16">
          <p class="text-xl text-gray-600 mb-6">Belum ada data leaderboard</p>
          <NuxtLink 
            to="/game/penalty" 
            class="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Mulai Main
          </NuxtLink>
        </div>
      </div>

      <!-- Pagination -->
      <div 
        v-if="pagination && pagination.last_page > 1" 
        class="flex flex-col md:flex-row justify-center items-center gap-5 mt-8 bg-white rounded-xl p-5 shadow-lg"
      >
        <button 
          @click="loadLeaderboard(currentPage - 1)"
          :disabled="currentPage === 1 || isLoading"
          class="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Sebelumnya
        </button>
        
        <span class="font-semibold text-gray-800">
          Halaman {{ pagination.current_page }} dari {{ pagination.last_page }}
        </span>
        
        <button 
          @click="loadLeaderboard(currentPage + 1)"
          :disabled="currentPage === pagination.last_page || isLoading"
          class="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Selanjutnya →
        </button>
      </div>

    </div>
  </div>
</template>