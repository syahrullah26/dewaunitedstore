<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { useToastStore } from "~/stores/toast";
import { ref, reactive, computed } from "vue";

const auth = useAuthStore();
const toast = useToastStore();

const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const form = reactive({
  name: "",
  email: "",
  phone: "",
  password: "",
  passwordConfirm: "",
});

const passwordMismatch = computed(
  () =>
    form.passwordConfirm.length > 0 && form.password !== form.passwordConfirm,
);

const submit = async () => {
  if (passwordMismatch.value) {
    toast.show("Password tidak sama", "error");
    return;
  }

  loading.value = true;

  try {
    await auth.register(form);
    toast.show("Register berhasil", "success");
    await navigateTo("/");
  } catch (err: any) {
    toast.show(err?.response?.data?.message || "Register gagal", "error");
  } finally {
    loading.value = false;
  }
};
useSeoMeta({
  title: "Register",
  description: "Sign up to your account to get the best experience",
});
</script>

<template>
  <section>
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
        class="group relative z-10 w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-[1.01] hover:border-[var(--gold-main)] hover:backdrop-blur-2xl"
        data-aos="fade-up"
        @submit.prevent="submit"
      >
        <div class="text-center mb-8">
          <img
            src="/du-universal.png"
            alt="logo"
            class="w-16 h-16 mx-auto mb-4 object-contain drop-shadow"
          />
          <h1 class="text-3xl font-bold text-white tracking-wide">
            Welcome to Dewa United Store
          </h1>
          <p class="text-gray-400 text-sm mt-1">
            Sign up to continue your shopping experience
          </p>
        </div>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <div class="space-y-2">
            <label
              class="block text-xs uppercase tracking-widest text-neutral-400"
            >
              Name
            </label>

            <input
              v-model="form.name"
              type="text"
              placeholder="Enter your name"
              required
              class="w-full px-5 py-3 rounded-xl bg-white/5 text-white border border-white/10 placeholder:text-neutral-500 transition-all duration-300 focus:outline-none focus:border-[var(--gold-main)] focus:ring-2 focus:ring-[var(--gold-main)]/40 hover:border-white/20"
            />
          </div>
          <div class="space-y-2">
            <label
              class="block text-xs uppercase tracking-widest text-neutral-400"
              >Email</label
            >
            <input
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              required
              class="w-full px-5 py-3 rounded-xl bg-white/5 text-white border border-white/10 placeholder:text-neutral-500 transition-all duration-300 focus:outline-none focus:border-[var(--gold-main)] focus:ring-2 focus:ring-[var(--gold-main)]/40 hover:border-white/20"
            />
          </div>
        </div>
        <div class="space-y-2 mt-3">
          <div class="space-y-2 relative">
            <label
              class="block text-xs uppercase tracking-widest text-neutral-400"
              >Phone</label
            >
            <input
              v-model="form.phone"
              type="tel"
              inputmode="numeric"
              placeholder="Enter your phone number"
              class="w-full px-5 py-3 rounded-xl bg-white/5 text-white border border-white/10 placeholder:text-neutral-500 transition-all duration-300 focus:outline-none focus:border-[var(--gold-main)] focus:ring-2 focus:ring-[var(--gold-main)]/40 hover:border-white/20"
            />
          </div>
        </div>
        <div class="space-y-2 mt-3 relative">
          <label
            class="block text-xs uppercase tracking-widest text-neutral-400"
          >
            Password
          </label>

          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="form.password"
            placeholder="Enter your password"
            class="w-full px-5 py-3 pr-12 rounded-xl bg-white/5 text-white border border-white/10 placeholder:text-neutral-500 focus:outline-none focus:border-[var(--gold-main)] focus:ring-2 focus:ring-[var(--gold-main)]/40 transition"
          />

          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-4 top-[38px] text-neutral-400 hover:text-white transition"
          >
            <svg
              v-if="!showPassword"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5
               c4.478 0 8.268 2.943 9.542 7
               -1.274 4.057-5.064 7-9.542 7
               -4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>

            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M13.875 18.825A10.05 10.05 0 0112 19" />
              <path d="M3 3l18 18" />
            </svg>
          </button>
        </div>

        <div class="space-y-2 mt-3 relative">
          <label
            class="block text-xs uppercase tracking-widest text-neutral-400"
          >
            Confirm Password
          </label>

          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="form.passwordConfirm"
            placeholder="Confirm password"
            class="w-full px-5 py-3 pr-12 rounded-xl bg-white/5 text-white border border-white/10 focus:border-[var(--gold-main)] focus:ring-2 focus:ring-[var(--gold-main)]/40 transition"
          />

          <button
            type="button"
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute right-4 top-[38px] text-neutral-400 hover:text-white transition"
          >
            <svg
              v-if="!showConfirmPassword"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5
               c4.478 0 8.268 2.943 9.542 7
               -1.274 4.057-5.064 7-9.542 7
               -4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>

            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M13.875 18.825A10.05 10.05 0 0112 19" />
              <path d="M3 3l18 18" />
            </svg>
          </button>
        </div>

        <button
          class="relative w-full mt-8 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-semibold tracking-wide overflow-hidden hover:scale-[1.02] active:scale-[0.97] transition-all duration-200 disabled:opacity-60"
          :disabled="loading || !form.name || !form.email"
        >
          <span class="relative z-10">
            {{ loading ? "Signing up..." : "Sign Up" }}
          </span>
          <span
            class="absolute inset-0 bg-white/30 opacity-0 hover:opacity-100 transition"
          />
        </button>
        <div class="mt-8 text-center space-y-3">
          <p class="text-sm text-gray-400">
            Already have an account?
            <NuxtLink
              to="/auth/login"
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
  </section>
</template>
