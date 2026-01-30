<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const backToWeb = () => {
  router.push("/minigames");
};

/* =====================
   CONSTANT
===================== */
const GAME_WIDTH = 400;
const GAME_HEIGHT = 500;

const PIPE_WIDTH = 60;
const PIPE_GAP = 160; // 🔒 FIXED – TIDAK PERNAH BERUBAH

const BIRD_SIZE = 40;
const BIRD_X = 80;

const jumpForce = -10;

/* =====================
   DIFFICULTY
===================== */
const pipeSpeed = ref(2);
const pipeDistance = ref(240);
const gravity = ref(0.6);

const updateDifficulty = () => {
  if (score.value >= 25) {
    pipeSpeed.value = 3.2;
    pipeDistance.value = 200;
    gravity.value = 0.8;
  } else if (score.value >= 10) {
    pipeSpeed.value = 2.6;
    pipeDistance.value = 220;
    gravity.value = 0.7;
  } else {
    pipeSpeed.value = 2;
    pipeDistance.value = 240;
    gravity.value = 0.6;
  }
};

/* =====================
   STATE
===================== */
const birdY = ref(GAME_HEIGHT / 2);
const velocity = ref(0);
const score = ref(0);
const gameStarted = ref(false);
const gameOver = ref(false);

type Pipe = {
  x: number;
  top: number;
  bottom: number; // ✅ WAJIB ADA
  passed: boolean;
};

const pipes = ref<Pipe[]>([]);
let loopId: number | null = null;

/* =====================
   SOUND (SSR SAFE)
===================== */
let jumpSound: HTMLAudioElement | null = null;
let scoreSound: HTMLAudioElement | null = null;
let gameOverSound: HTMLAudioElement | null = null;

/* =====================
   GAME CONTROL
===================== */
const startGame = () => {
  birdY.value = GAME_HEIGHT / 2;
  velocity.value = 0;
  score.value = 0;
  pipes.value = [];
  gameStarted.value = true;
  gameOver.value = false;

  updateDifficulty();
  spawnPipe();

  loopId = requestAnimationFrame(gameLoop);
};

const jump = () => {
  if (!gameStarted.value || gameOver.value) {
    startGame();
  }

  velocity.value = jumpForce;

  jumpSound?.pause();
  jumpSound!.currentTime = 0;
  jumpSound?.play();
};

/* =====================
   PIPE SPAWN (GAP 100% FIX)
===================== */
const spawnPipe = () => {
  const MIN_PIPE_HEIGHT = 60;

  const maxTop = GAME_HEIGHT - PIPE_GAP - MIN_PIPE_HEIGHT;

  const top =
    Math.floor(Math.random() * (maxTop - MIN_PIPE_HEIGHT)) + MIN_PIPE_HEIGHT;

  const bottom = GAME_HEIGHT - top - PIPE_GAP;

  pipes.value.push({
    x: GAME_WIDTH,
    top,
    bottom,
    passed: false,
  });
};

/* =====================
   GAME LOOP
===================== */
const gameLoop = () => {
  loopId = requestAnimationFrame(gameLoop);

  velocity.value += gravity.value;
  birdY.value += velocity.value;

  pipes.value.forEach((pipe) => {
    pipe.x -= pipeSpeed.value;

    if (!pipe.passed && pipe.x + PIPE_WIDTH < BIRD_X) {
      pipe.passed = true;
      score.value++;

      scoreSound?.pause();
      scoreSound!.currentTime = 0;
      scoreSound?.play();

      updateDifficulty();
    }

    const hitX = pipe.x < BIRD_X + BIRD_SIZE && pipe.x + PIPE_WIDTH > BIRD_X;

    const hitTop = birdY.value < pipe.top;
    const hitBottom = birdY.value + BIRD_SIZE > pipe.top + PIPE_GAP;

    if (hitX && (hitTop || hitBottom)) {
      endGame();
    }
  });

  if (birdY.value < 0 || birdY.value + BIRD_SIZE > GAME_HEIGHT) {
    endGame();
  }

  pipes.value = pipes.value.filter((p) => p.x + PIPE_WIDTH > 0);

  const lastPipe = pipes.value[pipes.value.length - 1];
  if (!lastPipe || lastPipe.x < GAME_WIDTH - pipeDistance.value) {
    spawnPipe();
  }
};

const endGame = () => {
  if (loopId) cancelAnimationFrame(loopId);
  loopId = null;

  gameStarted.value = false;
  gameOver.value = true;

  gameOverSound?.pause();
  gameOverSound!.currentTime = 0;
  gameOverSound?.play();
};

/* =====================
   ANIMATION
===================== */
const birdRotation = computed(() =>
  Math.min(Math.max(velocity.value * 3, -25), 45),
);

/* =====================
   INPUT
===================== */
const onKey = (e: KeyboardEvent) => {
  if (e.code === "Space") {
    e.preventDefault();
    jump();
  }
};

/* =====================
   LIFECYCLE
===================== */
onMounted(() => {
  jumpSound = new Audio("/minigames/flappy/flappy_jump.wav");
  scoreSound = new Audio("/minigames/flappy/flappy_start.wav");
  gameOverSound = new Audio("/minigames/flappy/flappy_over.wav");

  jumpSound.volume = 0.4;
  scoreSound.volume = 0.5;
  gameOverSound.volume = 0.6;

  jumpSound.load();
  scoreSound.load();
  gameOverSound.load();

  window.addEventListener("keydown", onKey);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKey);
  if (loopId) cancelAnimationFrame(loopId);
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-zinc-900">
    <div
      class="relative w-[400px] h-[500px] bg-sky-300 overflow-hidden rounded-xl"
      @click="jump"
    >
      <!-- Bird -->
      <img
        src="/du-universal.png"
        alt="bird"
        class="absolute transition-transform select-none pointer-events-none"
        :style="{
          width: BIRD_SIZE + 'px',
          height: BIRD_SIZE + 'px',
          left: BIRD_X + 'px',
          top: birdY + 'px',
          transform: `rotate(${birdRotation}deg)`,
        }"
      />

      <!-- Pipes -->
      <div
        v-for="(pipe, i) in pipes"
        :key="i"
        class="absolute w-[60px] flex flex-col"
        :style="{ left: pipe.x + 'px', height: GAME_HEIGHT + 'px' }"
      >
        <div
          class="bg-gradient-to-b from-[var(--gold-main)] to-[var(--gold-dark)] shadow-[inset_-6px_0_0_rgba(255,255,255,0.2)] shadow-lg border border-black/50 border-t-0"
          :style="{ height: pipe.top + 'px' }"
        />

        <div :style="{ height: PIPE_GAP + 'px' }" />
        <div
          class="bg-gradient-to-b from-[var(--gold-main)] to-[var(--gold-dark)] shadow-[inset_-6px_0_0_rgba(255,255,255,0.2)] shadow-lg border border-black/50 border-t-0"
          :style="{ height: pipe.bottom + 'px' }"
        />
      </div>

      <!-- Score -->
      <div class="absolute top-4 left-4 text-white text-2xl font-bold">
        {{ score }}
      </div>

      <!-- Overlay -->
      <!-- Overlay -->
      <div
        v-if="!gameStarted"
        class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-4"
      >
        <h2 class="text-3xl font-bold mb-2">
          {{ gameOver ? "GAME OVER" : "FLAPPY DEWA" }}
        </h2>

        <p class="mb-4 text-sm opacity-80">
          Score: <span class="font-bold">{{ score }}</span>
        </p>

        <div class="flex gap-4">
          <!-- Restart -->
          <button
            @click="startGame"
            class="px-5 py-2 rounded-lg font-semibold bg-green-500 hover:bg-green-600 transition active:scale-95"
          >
            Play
          </button>

          <!-- Back -->
          <button
            v-if="gameOver"
            @click="backToWeb"
            class="px-5 py-2 rounded-lg font-semibold bg-gray-500 hover:bg-gray-600 transition active:scale-95"
          >
            Back to Web
          </button>
        </div>

        <p v-if="!gameOver" class="mt-4 text-xs opacity-70">
          Click / Space to Start
        </p>
      </div>
    </div>
  </div>
</template>
