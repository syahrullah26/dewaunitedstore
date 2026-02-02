<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";

/* =====================
   ROUTER
===================== */
const router = useRouter();
const backToWeb = () => router.push("/minigames");

/* =====================
   GAME SIZE (RESPONSIVE)
===================== */
const GAME_WIDTH = ref(700);
const GAME_HEIGHT = ref(1200);

/* =====================
   CONSTANT
===================== */
const PIPE_WIDTH = 64;
const PIPE_GAP = 180;

const BIRD_SIZE = 42;
const BIRD_X = 90;

const jumpForce = ref(-10);

/* =====================
   DIFFICULTY
===================== */
const pipeSpeed = ref(2);
const pipeDistance = ref(260);
const gravity = ref(0.55);

const updateDifficulty = () => {
  if (score.value >= 25) {
    pipeSpeed.value = 3;
    pipeDistance.value = 220;
    gravity.value = 0.75;
  } else if (score.value >= 10) {
    pipeSpeed.value = 2.5;
    pipeDistance.value = 240;
    gravity.value = 0.65;
  } else {
    pipeSpeed.value = 2;
    pipeDistance.value = 260;
    gravity.value = 0.55;
  }
};

/* =====================
   STATE
===================== */
const birdY = ref(0);
const velocity = ref(0);
const score = ref(0);
const gameStarted = ref(false);
const gameOver = ref(false);

type Pipe = {
  x: number;
  top: number;
  bottom: number;
  passed: boolean;
};

const pipes = ref<Pipe[]>([]);
let loopId: number | null = null;

/* =====================
   SOUND
===================== */
let jumpSound: HTMLAudioElement | null = null;
let scoreSound: HTMLAudioElement | null = null;
let gameOverSound: HTMLAudioElement | null = null;

/* =====================
   GAME CONTROL
===================== */
const startGame = () => {
  birdY.value = GAME_HEIGHT.value / 2;
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
  if (!gameStarted.value || gameOver.value) startGame();

  velocity.value = jumpForce.value;

  jumpSound?.pause();
  if (jumpSound) {
    jumpSound.currentTime = 0;
    jumpSound.play().catch(() => {});
  }
};

/* =====================
   PIPE SPAWN
===================== */
const spawnPipe = () => {
  const MIN_PIPE_HEIGHT = 80;

  const maxTop = GAME_HEIGHT.value - PIPE_GAP - MIN_PIPE_HEIGHT;

  const top =
    Math.floor(Math.random() * (maxTop - MIN_PIPE_HEIGHT)) + MIN_PIPE_HEIGHT;

  const bottom = GAME_HEIGHT.value - top - PIPE_GAP;

  pipes.value.push({
    x: GAME_WIDTH.value,
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

  for (const pipe of pipes.value) {
    pipe.x -= pipeSpeed.value;

    if (!pipe.passed && pipe.x + PIPE_WIDTH < BIRD_X) {
      pipe.passed = true;
      score.value++;
      updateDifficulty();

      scoreSound?.play().catch(() => {});
    }

    const hitX = pipe.x < BIRD_X + BIRD_SIZE && pipe.x + PIPE_WIDTH > BIRD_X;

    if (
      hitX &&
      (birdY.value < pipe.top || birdY.value + BIRD_SIZE > pipe.top + PIPE_GAP)
    ) {
      endGame();
      return;
    }
  }

  if (birdY.value < 0 || birdY.value + BIRD_SIZE > GAME_HEIGHT.value) {
    endGame();
    return;
  }

  pipes.value = pipes.value.filter((p) => p.x + PIPE_WIDTH > 0);

  const lastPipe = pipes.value[pipes.value.length - 1];
  if (!lastPipe || lastPipe.x < GAME_WIDTH.value - pipeDistance.value) {
    spawnPipe();
  }
};

const endGame = () => {
  if (loopId) cancelAnimationFrame(loopId);
  loopId = null;

  gameStarted.value = false;
  gameOver.value = true;

  gameOverSound?.play().catch(() => {});
};

/* =====================
   BIRD STYLE
===================== */
const birdStyle = computed(() => ({
  width: `${BIRD_SIZE}px`,
  height: `${BIRD_SIZE}px`,
  transform: `translate3d(${BIRD_X}px, ${birdY.value}px, 0)
    rotate(${Math.min(Math.max(velocity.value * 3, -25), 45)}deg)`,
}));

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
   RESPONSIVE SETUP
===================== */
const setupResponsive = () => {
  if (window.innerWidth < 480) {
    GAME_WIDTH.value = Math.min(window.innerWidth - 24, 360);
    GAME_HEIGHT.value = Math.min(window.innerHeight * 0.75, 560);
    jumpForce.value = -9;
  } else {
    GAME_WIDTH.value = 420;
    GAME_HEIGHT.value = 600;
    jumpForce.value = -10;
  }

  birdY.value = GAME_HEIGHT.value / 2;
};

/* =====================
   LIFECYCLE
===================== */
onMounted(() => {
  setupResponsive();
  window.addEventListener("resize", setupResponsive);

  jumpSound = new Audio("/minigames/flappy/flappy_jump.wav");
  scoreSound = new Audio("/minigames/flappy/flappy_start.wav");
  gameOverSound = new Audio("/minigames/flappy/flappy_over.wav");

  window.addEventListener("keydown", onKey);
  window.addEventListener("touchstart", jump, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("resize", setupResponsive);
  window.removeEventListener("keydown", onKey);
  window.removeEventListener("touchstart", jump);
  if (loopId) cancelAnimationFrame(loopId);
});
</script>

<template>
  <div
    class="min-h-screen bg-zinc-900 px-2 flex flex-col items-center justify-center"
  >
    <!-- TITLE -->
    <h1 class="text-4xl font-bold text-white mb-6">Flappy Dewa</h1>

    <!-- GAME -->
    <div
      class="relative bg-sky-300 overflow-hidden rounded-xl touch-manipulation"
      :style="{ width: GAME_WIDTH + 'px', height: GAME_HEIGHT + 'px' }"
      @click="jump"
    >
      <!-- BIRD -->
      <img
        src="/du-universal.png"
        class="absolute pointer-events-none will-change-transform"
        :style="birdStyle"
      />

      <!-- PIPES -->
      <div
        v-for="(pipe, i) in pipes"
        :key="i"
        class="absolute w-[64px] will-change-transform"
        :style="{ transform: `translate3d(${pipe.x}px,0,0)` }"
      >
        <div
          class="bg-gradient-to-b from-[var(--gold-main)] to-[var(--gold-dark)] shadow-[inset_-6px_0_0_rgba(255,255,255,0.2)] shadow-lg border border-black/30 border-b-0"
          :style="{ height: pipe.top + 'px' }"
        />
        <div :style="{ height: PIPE_GAP + 'px' }" />
        <div
          class="bg-gradient-to-b from-[var(--gold-main)] to-[var(--gold-dark)] shadow-[inset_-6px_0_0_rgba(255,255,255,0.2)] shadow-lg border border-black/30 border-t-0"
          :style="{ height: pipe.bottom + 'px' }"
        />
      </div>

      <!-- SCORE -->
      <div class="absolute top-4 left-4 text-white text-2xl font-bold">
        {{ score }}
      </div>

      <!-- OVERLAY -->
      <div
        v-if="!gameStarted"
        class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center"
      >
        <h2 class="text-3xl font-bold mb-2">
          {{ gameOver ? "GAME OVER" : "FLAPPY DEWA" }}
        </h2>

        <p class="mb-4">Score: {{ score }}</p>

        <div class="flex gap-4">
          <button
            @click="startGame"
            class="px-5 py-2 rounded-lg bg-green-500 font-semibold"
          >
            Play
          </button>

          <button
            v-if="gameOver"
            @click="backToWeb"
            class="px-5 py-2 rounded-lg bg-gray-500 font-semibold"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
