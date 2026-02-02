<script setup lang="ts">
import type { GameSession, GameResult } from '~/types/penalty-game'
import { usePenaltyGame } from '~/composables/usePenaltyGame'

definePageMeta({
  middleware: 'auth-middleware'
})

const { startGame, recordShot, endGame } = usePenaltyGame()

// game states
const gameState = ref<'menu' | 'playing' | 'result'>('menu')
const currentSession = ref<GameSession | null>(null)
const goalsScored = ref(0)
const totalShots = ref(0)
const maxShots = ref(10)
const gameResult = ref<GameResult | null>(null)
const isLoading = ref(false)
const goalRef = ref<HTMLElement | null>(null)
const keeperState = ref<'idle' | 'left' | 'center' | 'right'>('idle')

// State animasi bola
const ballPosition = ref({ x: 50, y: 80 })
const isKicking = ref(false)
const kickDirection = ref<'left' | 'center' | 'right' | null>(null)
const goalkeeperPosition = ref<'left' | 'center' | 'right'>('center')

// mulai game baru
const handleStartGame = async () => {
  try {
    isLoading.value = true
    const session = await startGame()
    currentSession.value = session
    goalsScored.value = 0
    totalShots.value = 0
    gameResult.value = null
    gameState.value = 'playing'
  } catch (error) {
    console.error('Error starting game:', error)
    alert('Gagal memulai game. Silakan coba lagi.')
  } finally {
    isLoading.value = false
  }
}

// pinalti nendang
const shoot = async (direction: 'left' | 'center' | 'right') => {
  if (isKicking.value || !currentSession.value) return
  
  isKicking.value = true
  kickDirection.value = direction
  
  const positions: Array<'left' | 'center' | 'right'> = ['left', 'center', 'right']
  goalkeeperPosition.value =
  positions[Math.floor(Math.random() * positions.length)] as 'left' | 'center' | 'right'
  setTimeout(() => {
    keeperState.value = goalkeeperPosition.value
  }, 200)

  await animateBall(direction)
  
  const isGoal = direction !== goalkeeperPosition.value
  
  if (isGoal) {
    goalsScored.value++
  }
  
  totalShots.value++
  
  try {
    await recordShot(currentSession.value.session_id, isGoal)
  } catch (error) {
    console.error('Error recording shot:', error)
  }
  
  setTimeout(async () => {
    if (totalShots.value >= maxShots.value) {
      await handleEndGame()
    } else {
      resetBall()
    }
  }, 2000)
}

// animasi gerak si bola 
const animateBall = (direction: 'left' | 'center' | 'right') => {
    return new Promise<void>((resolve) => {
        if (!goalRef.value) return resolve()

        const goal = goalRef.value.getBoundingClientRect()
        const field = goalRef.value.offsetParent!.getBoundingClientRect()

        let xRatio = 0.5
        if (direction === 'left') xRatio = 0.25
        if (direction === 'right') xRatio = 0.75

        const targetX = 
            ((goal.left - field.left) + goal.width * xRatio) / field.width * 100
        
        const targetY =
            ((goal.top - field.top) + goal.height * 0.6) / field.height * 100
        
        ballPosition.value = { x: targetX, y: targetY}
        setTimeout(resolve,800)
    })
}

// Reset bola
const resetBall = () => {
  setTimeout(() => {
    ballPosition.value = { x: 50, y: 80 }
    isKicking.value = false
    kickDirection.value = null
    goalkeeperPosition.value = 'center'
    keeperState.value = 'idle'
  }, 500)
}

// End game
const handleEndGame = async () => {
  if (!currentSession.value) return
  
  try {
    isLoading.value = true
    const result = await endGame(currentSession.value.session_id)
    gameResult.value = result
    gameState.value = 'result'
  } catch (error) {
    console.error('Error ending game:', error)
    alert('Gagal mengakhiri game.')
  } finally {
    isLoading.value = false
  }
}

const backToMenu = () => {
  gameState.value = 'menu'
  currentSession.value = null
  resetBall()
}

// itung akurasi
const accuracy = computed(() => {
  if (totalShots.value === 0) return 0
  return Math.round((goalsScored.value / totalShots.value) * 100)
})

// posisi gk
const getGoalkeeperPositionClass = () => {
  if(goalkeeperPosition.value === 'left')
    return 'left-[25%] -translate-x-1/2'
  if(goalkeeperPosition.value === 'right')
    return 'left-[75%] -translate-x-1/2'
  return 'left-1/2 -translate-x-1/2'
}
//animasi gk
const getKeeperAnimationClass = () => {
    if (keeperState.value === 'left') return 'keeper-dive-left'
    if (keeperState.value === 'right') return 'keeper-dive-right'
    if (keeperState.value === 'center') return 'keeper-dive-center'
}
const isSavedByKeeper = (
    shotX: number,
    keeper: 'left' | 'center' | 'right'
    ) => {
    if (keeper === 'left') return shotX < 35
    if (keeper === 'right') return shotX > 65
    return shotX >= 40 && shotX <= 60
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-[var(--gold-main)] via-[var(--gold-light)] to-[var(--gold-dark)] p-5">
    <div class="max-w-4xl mx-auto">
      
      <!-- Menu awal-->
      <div v-if="gameState === 'menu'" class="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-3 text-[var(--gold-main)] bg-clip-text text-transparent">
            ⚽ Penalty Shootout
          </h1>
          <p class="text-lg md:text-xl text-gray-600 mb-8">
            Tunjukkan kemampuan tendangan penalti Anda!
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div class="bg-gray-50 rounded-xl p-6 flex items-center gap-4">
              <span class="text-4xl">🎯</span>
              <div class="text-left">
                <h3 class="text-xl font-bold text-gray-800">{{ maxShots }} Tendangan</h3>
                <p class="text-sm text-gray-500">Per game</p>
              </div>
            </div>
            <div class="bg-gray-50 rounded-xl p-6 flex items-center gap-4">
              <span class="text-4xl">⭐</span>
              <div class="text-left">
                <h3 class="text-xl font-bold text-gray-800">10 Poin</h3>
                <p class="text-sm text-gray-500">Per gol</p>
              </div>
            </div>
            <div class="bg-gray-50 rounded-xl p-6 flex items-center gap-4">
              <span class="text-4xl">🏆</span>
              <div class="text-left">
                <h3 class="text-xl font-bold text-gray-800">Bonus</h3>
                <p class="text-sm text-gray-500">Akurasi</p>
              </div>
            </div>
          </div>

          <button 
            @click="handleStartGame"
            :disabled="isLoading"
            class="bg-[var(--gold-main)] hover:bg-[var(--gold-dark)] text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {{ isLoading ? 'Memulai...' : 'Mulai Game' }}
          </button>

          <div class="flex flex-wrap justify-center gap-5 mt-8">
            <NuxtLink 
              to="/game/penalty/leaderboard" 
              class="text-zinc-50 font-semibold hover:bg-gray-100 px-6 py-3 rounded-lg transition-colors"
            >
              📊 Lihat Leaderboard
            </NuxtLink>
            <NuxtLink 
              to="/game/penalty/stats" 
              class="text-zinc-50 font-semibold hover:bg-gray-100 px-6 py-3 rounded-lg transition-colors"
            >
              📈 Statistik Saya
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Playing State -->
      <div v-else-if="gameState === 'playing'" class="bg-white rounded-3xl p-6 md:p-8 shadow-2xl">
        <!-- Score Board -->
        <div class="grid grid-cols-3 gap-4 mb-8 bg-gray-50 rounded-xl p-5">
          <div class="text-center">
            <span class="block text-sm text-gray-500 mb-1">Gol</span>
            <span class="block text-3xl font-bold text-purple-600">{{ goalsScored }}</span>
          </div>
          <div class="text-center">
            <span class="block text-sm text-gray-500 mb-1">Tendangan</span>
            <span class="block text-3xl font-bold text-purple-600">{{ totalShots }} / {{ maxShots }}</span>
          </div>
          <div class="text-center">
            <span class="block text-sm text-gray-500 mb-1">Akurasi</span>
            <span class="block text-3xl font-bold text-purple-600">{{ accuracy }}%</span>
          </div>
        </div>

        <!-- lapangan -->
        <div class="relative h-96 md:h-[500px] bg-gradient-to-b from-green-400 to-green-500 rounded-xl mb-8 overflow-hidden">
            <img
                src="/dewa-united.png"
                alt="Dewa United"
                class="absolute inset-0 m-auto w-56 md:w-72 opacity-15 pointer-events-none"
            />
          <!-- gawang -->
            <div
                ref="goalRef"
                class="absolute top-5 left-1/2 -translate-x-1/2 w-64 md:w-80 h-32 md:h-40 
                        border-4 border-white border-t-0 bg-black/10 rotate-180"
            >
            <div class="w-full h-full opacity-30" style="background-image: repeating-linear-gradient(0deg, white, white 2px, transparent 2px, transparent 20px), repeating-linear-gradient(90deg, white, white 2px, transparent 2px, transparent 20px);"></div>
            
            <!-- gk -->
            <div 
                class="absolute bottom-0 translate-y-1/2 text-5xl transition-all duration-300 ease-out"
                :class="[getGoalkeeperPositionClass(), getKeeperAnimationClass()]"
            >
            🧤
            </div>
          </div>

          <!-- bola -->
          <div 
            class="absolute text-4xl md:text-5xl transition-all duration-700 ease-out"
            :class="{ 'animate-spin': isKicking }"
            :style="{
              left: `${ballPosition.x}%`,
              top: `${ballPosition.y}%`,
              transform: 'translate(-50%, -50%)'
            }"
          >
            ⚽
          </div>

          <div class="absolute bottom-12 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full"></div>
        </div>

        <!-- button nendang -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            @click="shoot('left')"
            :disabled="isKicking"
            class="bg-gradient-to-br from-pink-400 to-red-500 text-white font-bold text-lg px-8 py-5 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            ← Kiri
          </button>
          <button 
            @click="shoot('center')"
            :disabled="isKicking"
            class="bg-gradient-to-br from-blue-400 to-cyan-500 text-white font-bold text-lg px-8 py-5 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            ↑ Tengah
          </button>
          <button 
            @click="shoot('right')"
            :disabled="isKicking"
            class="bg-gradient-to-br from-green-400 to-teal-500 text-white font-bold text-lg px-8 py-5 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            Kanan →
          </button>
        </div>
      </div>

      <!-- Hasil game -->
      <div v-else-if="gameState === 'result'" class="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
        <div v-if="gameResult" class="text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-8 text-purple-600">
            🎉 Game Selesai!
          </h1>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div class="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-xl p-6 md:p-8">
              <span class="block text-5xl mb-3">⭐</span>
              <h2 class="text-4xl md:text-5xl font-bold mb-2">{{ gameResult.session.points_earned }}</h2>
              <p class="text-white/90">Poin Didapat</p>
            </div>

            <div class="bg-gray-50 rounded-xl p-6 md:p-8">
              <span class="block text-5xl mb-3">⚽</span>
              <h3 class="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
                {{ gameResult.session.goals_scored }} / {{ gameResult.session.total_shots }}
              </h3>
              <p class="text-gray-600">Gol</p>
            </div>

            <div class="bg-gray-50 rounded-xl p-6 md:p-8">
              <span class="block text-5xl mb-3">🎯</span>
              <h3 class="text-3xl md:text-4xl font-bold mb-2 text-gray-800">
                {{ gameResult.session.accuracy }}%
              </h3>
              <p class="text-gray-600">Akurasi</p>
            </div>
          </div>

          <div class="bg-gray-50 rounded-xl p-8 mb-8">
            <h3 class="text-xl font-bold mb-6 text-gray-800">Total Statistik Anda</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <span class="block text-sm text-gray-500 mb-1">Total Poin</span>
                <span class="block text-2xl font-bold text-purple-600">{{ gameResult.stats.total_points }}</span>
              </div>
              <div>
                <span class="block text-sm text-gray-500 mb-1">Game Dimainkan</span>
                <span class="block text-2xl font-bold text-purple-600">{{ gameResult.stats.games_played }}</span>
              </div>
              <div>
                <span class="block text-sm text-gray-500 mb-1">Best Score</span>
                <span class="block text-2xl font-bold text-purple-600">{{ gameResult.stats.best_score }}</span>
              </div>
              <div>
                <span class="block text-sm text-gray-500 mb-1">Streak</span>
                <span class="block text-2xl font-bold text-purple-600">{{ gameResult.stats.current_streak }}</span>
              </div>
            </div>
          </div>

          <div class="flex flex-col md:flex-row justify-center gap-4 mb-6">
            <button 
              @click="handleStartGame"
              class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              🔄 Main Lagi
            </button>
            <button 
              @click="backToMenu"
              class="bg-white text-purple-600 font-bold text-lg px-10 py-4 rounded-full border-2 border-purple-600 hover:bg-purple-50 transition-all duration-300"
            >
              🏠 Kembali ke Menu
            </button>
          </div>

          <NuxtLink 
            to="/game/penalty/leaderboard" 
            class="inline-block text-purple-600 font-semibold hover:bg-gray-100 px-6 py-3 rounded-lg transition-colors"
          >
            📊 Lihat Posisi di Leaderboard
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>
<style scoped>
.keeper-dive-left {
  transform: translateX(-40px) rotate(-20deg);
}
.keeper-dive-right {
  transform: translateX(40px) rotate(20deg);
}
.keeper-dive-center {
  transform: translateY(-20px);
}
</style>