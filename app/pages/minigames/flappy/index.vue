<script setup lang="ts">
/* =====================
   IMPORT & ROUTER
===================== */
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const backToWeb = () => router.push("/minigames");

/* =====================
   GAME CONSTANT
===================== */
const GAME_WIDTH = 400;
const GAME_HEIGHT = 500;

const PIPE_WIDTH = 60;
const PIPE_GAP = 160;

const BIRD_SIZE = 40;
const BIRD_X = 80;
const JUMP_FORCE = -10;

/* =====================
   DIFFICULTY STATE
===================== */
const pipeSpeed = ref(2);
const pipeDistance = ref(240);
const gravity = ref(0.6);

/* =====================
   GAME STATE
===================== */
const birdY = ref(GAME_HEIGHT / 2);
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
   AUDIO (MOBILE SAFE)
===================== */
let jumpSound: HTMLAudioElement | null = null;
let scoreSound: HTMLAudioElement | null = null;
let gameOverSound: HTMLAudioElement | null = null;

/* =====================
   DIFFICULTY LOGIC
===================== */
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
   GAME START / RESTART
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

/* =====================
   JUMP INPUT
===================== */
const jump = () => {
  if (!gameStarted.value || gameOver.value) startGame();
  velocity.value = JUMP_FORCE;

  jumpSound?.pause();
  if (jumpSound) {
    jumpSound.currentTime = 0;
    jumpSound.play().catch(() => {});
  }
};

/* =====================
   PIPE SPAWN LOGIC
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
   GAME LOOP (TS SAFE)
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

  if (birdY.value < 0 || birdY.value + BIRD_SIZE > GAME_HEIGHT) {
    endGame();
    return;
  }

  pipes.value = pipes.value.filter((p) => p.x + PIPE_WIDTH > 0);

  const lastPipe = pipes.value.at(-1);
  if (!lastPipe || lastPipe.x < GAME_WIDTH - pipeDistance.value) {
    spawnPipe();
  }
};

/* =====================
   GAME OVER
===================== */
const endGame = () => {
  if (loopId) cancelAnimationFrame(loopId);
  loopId = null;

  gameStarted.value = false;
  gameOver.value = true;

  gameOverSound?.play().catch(() => {});
};

/* =====================
   BIRD ROTATION
===================== */
const birdRotation = computed(() =>
  Math.min(Math.max(velocity.value * 3, -25), 45),
);

/* =====================
   INPUT HANDLER
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

  window.addEventListener("keydown", onKey, { passive: false });
  window.addEventListener("touchstart", jump, { passive: false });
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKey);
  window.removeEventListener("touchstart", jump);
  if (loopId) cancelAnimationFrame(loopId);
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-zinc-900">
    <div
      class="relative w-full max-w-[400px] aspect-[4/5] bg-sky-300 overflow-hidden rounded-xl touch-none select-none"
      @click.prevent="jump"
    >
      <!-- BIRD -->
      <img
        src="/du-universal.png"
        class="absolute will-change-transform pointer-events-none"
        :style="{
          width: BIRD_SIZE + 'px',
          height: BIRD_SIZE + 'px',
          transform: `translate3d(${BIRD_X}px, ${birdY}px, 0) rotate(${birdRotation}deg)`,
        }"
      />

      <!-- PIPES -->
      <div
        v-for="(pipe, i) in pipes"
        :key="i"
        class="absolute w-[60px] will-change-transform"
        :style="{
          transform: `translate3d(${pipe.x}px, 0, 0)`,
          height: GAME_HEIGHT + 'px',
        }"
      >
        <div
          class="bg-gradient-to-b from-[var(--gold-main)] to-[var(--gold-dark)]"
          :style="{ height: pipe.top + 'px' }"
        />
        <div :style="{ height: PIPE_GAP + 'px' }" />
        <div
          class="bg-gradient-to-b from-[var(--gold-main)] to-[var(--gold-dark)]"
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
        class="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white"
      >
        <h2 class="text-3xl font-bold mb-2">
          {{ gameOver ? "GAME OVER" : "FLAPPY DEWA" }}
        </h2>

        <p class="mb-4">Score: {{ score }}</p>

        <div class="flex gap-4">
          <button
            @click="startGame"
            class="px-5 py-2 bg-green-500 rounded-lg font-semibold"
          >
            Play
          </button>

          <button
            v-if="gameOver"
            @click="backToWeb"
            class="px-5 py-2 bg-gray-500 rounded-lg font-semibold"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
