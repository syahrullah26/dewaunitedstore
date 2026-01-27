<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { useToastStore } from "~/stores/toast";

definePageMeta({
  middleware: "auth-middleware",
  roles: ["user"],
});

const auth = useAuthStore();
const toast = useToastStore();
const config = useRuntimeConfig();

const loading = ref(false);

const form = reactive<{
  name: string;
  phone: string;
  avatarPreview?: string;
  avatarFile?: File;
}>({
  name: "",
  phone: "",
});

watch(
  () => auth.user,
  (user) => {
    if (!user) return;

    form.name = user.name ?? "";
    form.phone = user.phone ?? "";

    form.avatarPreview = user.avatar
      ? `${config.public.apiBase}/storage/${user.avatar}`
      : "/images/avatar.png";
  },
  { immediate: true },
);

const avatarSrc = computed(() => {
  if (!process.client) {
    return "/images/avatar.png";
  }
  if (form.avatarPreview) {
    return form.avatarPreview;
  }

  return "/images/avatar.png";
});

//UPLOAD IMAGE
const onAvatarChange = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    toast.show("File harus berupa gambar", "error");
    return;
  }

  if (file.size > 20 * 1024 * 1024) {
    toast.show("Ukuran avatar maksimal 20MB", "error");
    return;
  }

  form.avatarFile = file;
  form.avatarPreview = URL.createObjectURL(file);
};

//UPDATE PROFILE
const submit = async () => {
  loading.value = true;

  try {
    const data = new FormData();

    if (form.name) data.append("name", form.name);
    if (form.phone) data.append("phone", form.phone);
    if (form.avatarFile) data.append("avatar", form.avatarFile);

    await auth.updateProfile(data);

    toast.show("Profile berhasil diperbarui", "success");
  } catch (e: any) {
    toast.show(e?.data?.message || "Update gagal", "error");
  } finally {
    loading.value = false;
  }
};
useSeoMeta({
  title: auth.user?.name + " Profile Settings" || "Your Profile",
  description: "Manage your profile information and addresses",
});
</script>

<template>
  <section class="min-h-screen bg-zinc-950 text-white antialiased py-28">
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
    <div class="max-w-4xl mx-auto px-6">
      <div
        class="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]"
      >
        <h1
          class="text-3xl font-semibold tracking-widest uppercase mb-10 text-center md:text-left"
        >
          Edit Profile
        </h1>

        <form @submit.prevent="submit" class="space-y-10">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="relative shrink-0">
              <img
                :src="avatarSrc || '/images/avatar.png'"
                class="w-36 h-36 rounded-2xl object-cover border border-white/20"
              />
              <div
                class="absolute inset-0 rounded-2xl ring-2 ring-[var(--gold-main)]/30"
              ></div>
            </div>

            <div class="space-y-3 text-center md:text-left">
              <label
                class="inline-block px-5 py-2 rounded-xl border border-white/20 cursor-pointer text-sm text-neutral-300 hover:border-[var(--gold-main)] transition"
              >
                Change Avatar
                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="onAvatarChange"
                />
              </label>

              <p class="text-xs text-neutral-500">JPG / PNG · Max 2MB</p>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-xs uppercase tracking-widest text-neutral-400">
                Name
              </label>
              <input
                v-model="form.name"
                type="text"
                class="w-full px-5 py-3 rounded-xl bg-white/5 text-white border border-white/10 focus:border-[var(--gold-main)] focus:ring-2 focus:ring-[var(--gold-main)]/40"
              />
            </div>

            <div class="space-y-2">
              <label class="text-xs uppercase tracking-widest text-neutral-400">
                Phone
              </label>
              <input
                v-model="form.phone"
                type="tel"
                inputmode="numeric"
                class="w-full px-5 py-3 rounded-xl bg-white/5 text-white border border-white/10 focus:border-[var(--gold-main)] focus:ring-2 focus:ring-[var(--gold-main)]/40"
              />
            </div>
            <div class="space-y-2 md:col-span-2">
              <label class="text-xs uppercase tracking-widest text-neutral-400">
                Email
              </label>
              <input
                :value="auth.user?.email"
                type="email"
                disabled
                class="w-full px-5 py-3 rounded-xl bg-white/5 text-neutral-400 border border-white/10 cursor-not-allowed"
              />
            </div>
          </div>
          <div class="flex justify-end gap-4 pt-6">
            <NuxtLink
              to="/profile"
              class="px-6 py-3 rounded-xl border border-white/20 text-neutral-300 hover:border-white/40 transition"
            >
              Cancel
            </NuxtLink>

            <button
              type="submit"
              :disabled="loading"
              class="px-8 py-3 rounded-xl bg-[var(--gold-main)] text-black font-semibold hover:scale-[1.02] transition disabled:opacity-60"
            >
              {{ loading ? "Saving..." : "Save Changes" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
