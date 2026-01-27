<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useToastStore } from "~/stores/toast";

definePageMeta({
  middleware: "auth-middleware",
  roles: ["user"],
});
useSeoMeta({
  title: "Your Address",
  description: "Manage your address information",
});

const { $api } = useNuxtApp();
const auth = useAuthStore();
const toast = useToastStore();
const form = reactive({
  name: "",
  phone: "",
});

const {
  provinces,
  regencies,
  districts,
  villages,
  fetchProvinces,
  fetchRegencies,
  fetchDistricts,
  fetchVillages,
} = useRegions();

const provinceId = ref("");
const regencyId = ref("");
const districtId = ref("");
const villageId = ref("");
const alamat = ref("");
const kodepos = ref("");

const submit = async () => {
  try {
    const res: any = await $api("/address", {
      method: "POST",
      body: {
        recipient_name: form.name,
        phone: form.phone,
        province_id: Number(provinceId.value),
        regency_id: Number(regencyId.value),
        district_id: Number(districtId.value),
        village_id: Number(villageId.value),
        address_detail: alamat.value,
        postal_code: kodepos.value,
      },
    });

    toast.show("Alamat berhasil disimpan", "success");
  } catch (error: any) {
    toast.show(error?.data?.message ?? "Gagal menyimpan alamat", "error");
  }
};

onMounted(() => {
  fetchProvinces();

  form.name = auth.user?.name ?? "";
  form.phone = auth.user?.phone ?? "";
});

watch(provinceId, async (val) => {
  regencyId.value = "";
  districtId.value = "";
  villageId.value = "";
  regencies.value = [];
  districts.value = [];
  villages.value = [];

  if (val) await fetchRegencies(val);
});

watch(regencyId, async (val) => {
  districtId.value = "";
  villageId.value = "";
  districts.value = [];
  villages.value = [];

  if (val) await fetchDistricts(val);
});

watch(districtId, async (val) => {
  villageId.value = "";
  villages.value = [];

  if (val) await fetchVillages(val);
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
          Tambah Alamat anda
        </h1>
        <form
          @submit.prevent="submit"
          class="space-y-10"
          data-aos="fade-up"
          data-aos-duration="700"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Nama Lengkap -->
            <div class="flex flex-col gap-2">
              <label class="text-xs uppercase tracking-wider text-gray-400">
                Nama Lengkap
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Nama penerima"
                class="w-full px-5 py-3 rounded-xl bg-white/5 text-white border border-white/10 placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 transition"
              />
            </div>

            <!-- Phone -->
            <div class="flex flex-col gap-2">
              <label class="text-xs uppercase tracking-wider text-gray-400">
                No. Telepon
              </label>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="08xxxxxxxxxx"
                class="w-full px-5 py-3 rounded-xl bg-white/5 text-white border border-white/10 placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 transition"
              />
            </div>
            <!-- Provinsi -->
            <div class="flex flex-col gap-2">
              <label class="text-xs uppercase tracking-wider text-gray-400">
                Provinsi
              </label>
              <select
                v-model="provinceId"
                class="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-white/10 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 transition"
              >
                <option value="">Pilih Provinsi</option>
                <option v-for="p in provinces" :key="p.id" :value="p.id">
                  {{ p.name }}
                </option>
              </select>
            </div>

            <!-- Kota / Kabupaten -->
            <div class="flex flex-col gap-2">
              <label class="text-xs uppercase tracking-wider text-gray-400">
                Kota / Kabupaten
              </label>
              <select
                v-model="regencyId"
                :disabled="!provinceId"
                class="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-white/10 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <option value="">Pilih Kota / Kabupaten</option>
                <option v-for="r in regencies" :key="r.id" :value="r.id">
                  {{ r.name }}
                </option>
              </select>
            </div>

            <!-- Kecamatan -->
            <div class="flex flex-col gap-2">
              <label class="text-xs uppercase tracking-wider text-gray-400">
                Kecamatan
              </label>
              <select
                v-model="districtId"
                :disabled="!regencyId"
                class="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-white/10 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <option value="">Pilih Kecamatan</option>
                <option v-for="d in districts" :key="d.id" :value="d.id">
                  {{ d.name }}
                </option>
              </select>
            </div>

            <!-- Desa / Kelurahan -->
            <div class="flex flex-col gap-2">
              <label class="text-xs uppercase tracking-wider text-gray-400">
                Desa / Kelurahan
              </label>
              <select
                v-model="villageId"
                :disabled="!districtId"
                class="w-full px-4 py-3 rounded-xl bg-zinc-800 text-white border border-white/10 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <option value="">Pilih Desa / Kelurahan</option>
                <option v-for="v in villages" :key="v.id" :value="v.id">
                  {{ v.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-xs uppercase tracking-wider text-gray-400">
              Alamat Detail
            </label>
            <textarea
              v-model="alamat"
              type="text"
              placeholder="Masukan alamat anda disini - cth : Jl. Dalton Timur No.51,"
              class="w-full px-5 py-3 rounded-xl bg-white/5 text-white border border-white/10 placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 transition"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-xs uppercase tracking-wider text-gray-400">
              Kode Pos
            </label>
            <input
              v-model="kodepos"
              type="tel"
              placeholder="masukan kode pos anda"
              class="w-full px-5 py-3 rounded-xl bg-white/5 text-white border border-white/10 placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/40 transition"
            />
          </div>

          <!-- Action -->
          <div class="flex justify-end pt-4">
            <button
              type="submit"
              :disabled="!villageId"
              class="px-8 py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Simpan Alamat
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
