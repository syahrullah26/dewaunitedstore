<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { useToastStore } from "~/stores/toast";

const auth = useAuthStore();
const toast = useToastStore();

const loading = ref(false);

const form = reactive({
  email: "",
  password: "",
});

const submit = async () => {
  loading.value = true;
  try {
    await auth.login(form);
    toast.show("Login berhasil", "success");
    await navigateTo("/");
  } catch (e) {
    toast.show("Email atau password salah", "error");
  } finally {
    loading.value = false;
  }
};

useSeoMeta({
  title: "Login",
  description: "Sign in to your account to get the best experience",
});
</script>
<template>
  <div
    class="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden"
  >
    <div class="absolute inset-0">
      <img
        src="/du-universal.png"
        class="w-full h-full object-cover opacity-20"
        alt="Dewa United Background"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/70 to-transparent"
      />
    </div>
    <div class="absolute inset-0">
      <div
        class="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-gradient-to-r from-yellow-500/30 to-orange-500/10 rounded-full blur-[140px] animate-pulse"
      />
      <div
        class="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-r from-amber-500/20 to-yellow-500/10 rounded-full blur-[140px]"
      />
    </div>
    <form
      @submit.prevent="submit"
      class="group relative z-10 w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-[var(--gold-main)] hover:backdrop-blur-2xl"
      data-aos="fade-up"
    >
      <div class="text-center mb-8">
        <img
          src="/du-universal.png"
          alt="logo"
          class="w-16 h-16 mx-auto mb-4 object-contain drop-shadow"
        />
        <h1 class="text-3xl font-bold text-white tracking-wide">
          Welcome Back
        </h1>
        <p class="text-gray-400 text-sm mt-1">
          Sign in to continue your shopping experience
        </p>
      </div>

      <div class="space-y-5">
        <div>
          <label class="text-xs uppercase tracking-widest text-gray-400">
            Email Address
          </label>
          <input
            v-model="form.email"
            type="email"
            placeholder="you@email.com"
            class="font-default mt-2 w-full px-4 py-3 rounded-xl bg-black/40 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
          />
        </div>

        <div>
          <label class="text-xs uppercase tracking-widest text-gray-400">
            Password
          </label>
          <input
            v-model="form.password"
            type="password"
            placeholder="••••••••"
            class="font-default mt-2 w-full px-4 py-3 rounded-xl bg-black/40 text-white border border-white/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition"
          />
        </div>
      </div>
      <button
        class="relative w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold tracking-wide overflow-hidden hover:scale-[1.02] active:scale-[0.97] transition-all duration-200 disabled:opacity-60"
        :disabled="loading"
      >
        <span class="relative z-10">
          {{ loading ? "Signing in..." : "Sign In" }}
        </span>
        <span
          class="absolute inset-0 bg-white/30 opacity-0 hover:opacity-100 transition"
        />
      </button>

      <div class="mt-8 text-center space-y-3">
        <p class="text-sm text-gray-400">
          New here?
          <NuxtLink
            to="/auth/register"
            class="text-yellow-400 hover:underline font-medium"
          >
            Create an account
          </NuxtLink>
        </p>

        <NuxtLink
          to="/"
          class="text-xs text-gray-500 hover:text-gray-300 transition"
        >
          Continue as guest →
        </NuxtLink>
      </div>
    </form>
  </div>
</template>
