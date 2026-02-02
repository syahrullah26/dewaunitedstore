<script setup lang="ts">
import type { GameStats, GameHistory, Pagination } from "~/types/penalty-game";
import { usePenaltyGame } from "~/composables/usePenaltyGame";

definePageMeta({
  middleware: "auth-middleware",
});

const { getUserStats, getUserHistory } = usePenaltyGame();

const stats = ref<GameStats | null>(null);
const history = ref<GameHistory[]>([]);
const pagination = ref<Pagination | null>(null);
const currentPage = ref(1);
const isLoadingStats = ref(false);
const isLoadingHistory = ref(false);

// load status usr
const loadStats = async () => {
  try {
    isLoadingStats.value = true;
    const data = await getUserStats();
    stats.value = data;
  } catch (error) {
    console.error("Failed to load stats:", error);
  } finally {
    isLoadingStats.value = false;
  }
};

// load histry game
const loadHistory = async (page: number = 1) => {
  try {
    isLoadingHistory.value = true;
    const response = await getUserHistory(page, 10);
    history.value = response.data;
    pagination.value = response.pagination;
    currentPage.value = page;
  } catch (error) {
    console.error("Failed to load history:", error);
  } finally {
    isLoadingHistory.value = false;
  }
};

// format tanggl
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

onMounted(() => {
  loadStats();
  loadHistory();
});

const avgPointsPerGame = computed(() => {
  if (!stats.value || stats.value.games_played === 0) return 0;
  return Math.round(stats.value.total_points / stats.value.games_played);
});

const avgGoalsPerGame = computed(() => {
  if (!stats.value || stats.value.games_played === 0) return 0;
  return (stats.value.total_goals / stats.value.games_played).toFixed(1);
});
</script>

<template>
  <div
    class="relative min-h-screen bg-gradient-to-r from-black/95 via-black/70 to-transparent p-5 overflow-hidden"
  >
    <img
      src="/du-universal.png"
      class="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
      alt="Dewa United Background"
    />
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8 relative">
        <NuxtLink
          to="/game/penalty"
          class="absolute left-0 top-0 text-white font-semibold px-5 py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
        >
          ← Kembali
        </NuxtLink>
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-3">
          📈 Statistik Saya
        </h1>
        <p class="text-lg md:text-xl text-white/90">
          Pantau performa dan riwayat game Anda
        </p>
      </div>

      <!-- Stats Cards Loading -->
      <div
        v-if="isLoadingStats"
        class="bg-white rounded-3xl p-16 shadow-2xl text-center mb-8"
      >
        <div
          class="inline-block w-12 h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin mb-5"
        ></div>
        <p class="text-gray-600 text-lg">Memuat statistik...</p>
      </div>

      <!-- Stats Cards -->
      <div
        v-else-if="stats"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
      >
        <!-- stats utama per user -->
        <div
          class="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-2xl p-6 shadow-xl md:col-span-2 flex items-center gap-5"
        >
          <div class="text-5xl md:text-6xl">⭐</div>
          <div class="flex-1">
            <h2 class="text-4xl md:text-5xl font-bold mb-1">
              {{ stats.total_points }}
            </h2>
            <p class="text-white/90">Total Poin</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-xl flex items-center gap-4">
          <div class="text-4xl">🏆</div>
          <div class="flex-1">
            <h3 class="text-3xl font-bold text-gray-800 mb-1">
              {{ stats.rank || "-" }}
            </h3>
            <p class="text-gray-600 text-sm">Peringkat</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-xl flex items-center gap-4">
          <div class="text-4xl">🎮</div>
          <div class="flex-1">
            <h3 class="text-3xl font-bold text-gray-800 mb-1">
              {{ stats.games_played }}
            </h3>
            <p class="text-gray-600 text-sm">Game Dimainkan</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-xl flex items-center gap-4">
          <div class="text-4xl">⚽</div>
          <div class="flex-1">
            <h3 class="text-3xl font-bold text-gray-800 mb-1">
              {{ stats.total_goals }}
            </h3>
            <p class="text-gray-600 text-sm">Total Gol</p>
          </div>
        </div>

        <!-- stats sekundernya aja -->
        <div class="bg-white rounded-2xl p-6 shadow-xl flex items-center gap-4">
          <div class="text-4xl">💯</div>
          <div class="flex-1">
            <h3 class="text-3xl font-bold text-gray-800 mb-1">
              {{ stats.best_score }}
            </h3>
            <p class="text-gray-600 text-sm">Skor Terbaik</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-xl flex items-center gap-4">
          <div class="text-4xl">🎯</div>
          <div class="flex-1">
            <h3 class="text-3xl font-bold text-gray-800 mb-1">
              {{ stats.accuracy }}%
            </h3>
            <p class="text-gray-600 text-sm">Akurasi</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-xl flex items-center gap-4">
          <div class="text-4xl">🔥</div>
          <div class="flex-1">
            <h3 class="text-3xl font-bold text-gray-800 mb-1">
              {{ stats.current_streak }}
            </h3>
            <p class="text-gray-600 text-sm">Streak Saat Ini</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-xl flex items-center gap-4">
          <div class="text-4xl">🌟</div>
          <div class="flex-1">
            <h3 class="text-3xl font-bold text-gray-800 mb-1">
              {{ stats.best_streak }}
            </h3>
            <p class="text-gray-600 text-sm">Streak Terbaik</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-xl md:col-span-2">
          <div class="grid grid-cols-2 gap-6">
            <div class="text-center">
              <span class="block text-sm text-gray-600 mb-2"
                >Rata-rata Poin/Game</span
              >
              <span class="block text-3xl font-bold text-purple-600">{{
                avgPointsPerGame
              }}</span>
            </div>
            <div class="text-center">
              <span class="block text-sm text-gray-600 mb-2"
                >Rata-rata Gol/Game</span
              >
              <span class="block text-3xl font-bold text-purple-600">{{
                avgGoalsPerGame
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
        <h2 class="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          📋 Riwayat Game
        </h2>

        <div
          v-if="isLoadingHistory && history.length === 0"
          class="text-center py-16"
        >
          <div
            class="inline-block w-12 h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin mb-5"
          ></div>
          <p class="text-gray-600 text-lg">Memuat riwayat...</p>
        </div>

        <div v-else-if="history.length > 0" class="space-y-4">
          <div
            v-for="game in history"
            :key="game.id"
            class="bg-gray-50 rounded-xl p-5 hover:bg-gray-100 transition-all hover:translate-x-1"
          >
            <div
              class="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-4"
            >
              <span class="text-sm text-gray-600">{{
                formatDate(game.ended_at)
              }}</span>
              <span class="text-xl font-bold text-purple-600"
                >+{{ game.points_earned }} poin</span
              >
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <span class="block text-xs text-gray-500 mb-1">Gol</span>
                <span class="block text-lg font-semibold text-gray-800">
                  {{ game.goals_scored }}/{{ game.total_shots }}
                </span>
              </div>
              <div>
                <span class="block text-xs text-gray-500 mb-1">Akurasi</span>
                <span class="block text-lg font-semibold text-gray-800">
                  {{ game.accuracy_percentage }}%
                </span>
              </div>
            </div>
          </div>

          <div
            v-if="pagination && pagination.last_page > 1"
            class="flex flex-col md:flex-row justify-center items-center gap-5 mt-6 pt-6 border-t border-gray-200"
          >
            <button
              @click="loadHistory(currentPage - 1)"
              :disabled="currentPage === 1 || isLoadingHistory"
              class="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Sebelumnya
            </button>

            <span class="font-semibold text-gray-800">
              {{ pagination.current_page }} / {{ pagination.last_page }}
            </span>

            <button
              @click="loadHistory(currentPage + 1)"
              :disabled="
                currentPage === pagination.last_page || isLoadingHistory
              "
              class="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Selanjutnya →
            </button>
          </div>
        </div>

        <div v-else class="text-center py-16">
          <p class="text-xl text-gray-600 mb-6">Belum ada riwayat game</p>
          <NuxtLink
            to="/game/penalty"
            class="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Mulai Main Sekarang
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
