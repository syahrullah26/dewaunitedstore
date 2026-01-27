<script setup lang="ts">
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuthStore } from "~/stores/auth";
import { useToastStore } from "~/stores/toast";

definePageMeta({
  middleware: "auth-middleware",
  roles: ["user"],
});

const auth = useAuthStore();
const toast = useToastStore();

const user = computed(() => auth.user);
const addresses = computed(() => auth.addresses ?? []);

const avatarUrl = computed(() => {
  if (!auth.user?.avatar) return "/images/avatar.png";
  return `https://backend-dewaunited-production.up.railway.app/storage/${auth.user.avatar}`;
});

const logout = async () => {
  await auth.logout();
  toast.show("Logout berhasil", "error");
  setTimeout(() => navigateTo("/"), 300);
};

onMounted(async () => {
  AOS.init({
    duration: 900,
    easing: "ease-out-cubic",
    once: true,
  });

  await auth.getAddress();
});

useSeoMeta({
  title: auth.user?.name + " Profile" || "Your Profile",
  description: "Manage your profile information and addresses",
});
</script>

<template>
  <section
    class="min-h-screen bg-zinc-950 text-white py-28 antialiased relative"
  >
    <div class="absolute inset-0">
      <img
        src="/du-universal.png"
        class="w-full h-full object-cover opacity-20"
      />
      <div class="absolute inset-0 bg-black/80" />
    </div>

    <div v-if="user" class="relative max-w-4xl mx-auto px-6 space-y-20">
      <!-- ================= PROFILE CARD ================= -->
      <div
        data-aos="fade-up"
        class="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14 shadow-[0_60px_140px_-40px_rgba(0,0,0,0.9)]"
      >
        <div
          class="absolute -top-24 -right-24 w-80 h-80 bg-[var(--gold-main)]/10 rounded-full blur-3xl"
        />

        <div
          class="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-12 items-center"
        >
          <div class="relative mx-auto md:mx-0 group">
            <div
              class="absolute -inset-3 rounded-3xl bg-[var(--gold-main)]/10 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"
            ></div>
            <div
              class="relative w-40 h-40 rounded-2xl overflow-hidden border border-white/20 backdrop-blur-md shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-[1.03]"
            >
              <img
                :src="avatarUrl"
                class="w-full h-full object-cover"
                alt="User Avatar"
              />
              <div
                class="absolute inset-0 rounded-2xl ring-2 ring-[var(--gold-main)]/40 pointer-events-none"
              ></div>
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60"
              ></div>
            </div>
            <span
              class="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-widest uppercase text-[var(--gold-main)] opacity-0 group-hover:opacity-100 transition"
            >
              Profile Photo
            </span>
          </div>
          <div class="text-center md:text-left">
            <h1
              class="text-3xl md:text-4xl font-semibold uppercase tracking-wider"
            >
              {{ user.name }}
            </h1>
            <p
              class="mt-2 text-xs uppercase tracking-[0.35em] text-[var(--gold-main)]"
            >
              {{ user.role }}
            </p>

            <div
              class="w-14 h-px bg-[var(--gold-main)]/50 my-6 mx-auto md:mx-0"
            />

            <div class="space-y-2 text-sm text-neutral-300">
              <p><span class="opacity-50">Email:</span> {{ user.email }}</p>
              <p><span class="opacity-50">Phone:</span> {{ user.phone }}</p>
            </div>
            <div
              class="mt-10 flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <NuxtLink
                to="/profile/settings"
                class="px-7 py-3 rounded-xl bg-[var(--gold-main)] text-black font-semibold hover:scale-105 transition"
              >
                Edit Profile
              </NuxtLink>

              <NuxtLink
                to="/profile/address"
                class="px-7 py-3 rounded-xl bg-white/10 border border-white/20 hover:border-[var(--gold-main)] transition"
              >
                Kelola Alamat
              </NuxtLink>

              <button
                @click="logout"
                class="px-7 py-3 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- ================= ADDRESS ================= -->
      <div
        data-aos="fade-up"
        class="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
      >
        <div class="flex items-center justify-between mb-10">
          <div>
            <h2 class="text-xl font-semibold tracking-widest uppercase">
              Alamat Saya
            </h2>
            <p class="text-xs text-neutral-400 mt-1">
              Digunakan untuk pengiriman & transaksi
            </p>
          </div>

          <NuxtLink
            to="/profile/address"
            class="px-5 py-2 rounded-lg bg-[var(--gold-main)] text-black text-xs font-semibold hover:scale-105 transition"
          >
            + Tambah Alamat
          </NuxtLink>
        </div>
        <div
          v-if="!addresses.length"
          class="text-center py-14 border border-dashed border-white/10 rounded-2xl"
        >
          <p class="text-neutral-400 text-sm mb-6">
            Belum ada alamat tersimpan
          </p>
          <NuxtLink
            to="/profile/address"
            class="px-6 py-3 rounded-xl bg-[var(--gold-main)] text-black font-semibold hover:scale-105 transition"
          >
            Tambah Alamat
          </NuxtLink>
        </div>

        <!-- LIST -->
        <div v-else class="grid gap-6">
          <div
            v-for="address in addresses"
            :key="address.id"
            class="group p-6 rounded-2xl bg-black/40 border border-white/10 hover:border-[var(--gold-main)] transition"
          >
            <div class="flex justify-between items-start gap-6">
              <div>
                <p class="font-semibold text-white">
                  {{ address.recipient_name }}
                </p>
                <p class="text-xs text-neutral-400">
                  {{ address.phone }}
                </p>
              </div>

              <span
                class="text-[10px] px-3 py-1 rounded-full border border-[var(--gold-main)]/40 text-[var(--gold-main)] tracking-widest uppercase"
              >
                Alamat
              </span>
            </div>

            <p class="mt-4 text-sm text-neutral-300 leading-relaxed">
              {{ address.address_detail }}, {{ address.village.name }},
              {{ address.district.name }}, {{ address.regency.name }},
              {{ address.province.name }}
            </p>

            <div class="mt-5 flex justify-between items-center text-xs">
              <span class="text-neutral-400">
                Kode Pos: {{ address.postal_code }}
              </span>

              <div
                class="flex gap-5 opacity-0 group-hover:opacity-100 transition"
              >
                <NuxtLink
                  :to="`/profile/address/${address.id}/edit`"
                  class="text-[var(--gold-main)] hover:underline"
                >
                  Edit
                </NuxtLink>
                <button class="text-red-400 hover:underline">Hapus</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
