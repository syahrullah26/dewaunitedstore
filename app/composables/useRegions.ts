export const useRegions = () => {
  const config = useRuntimeConfig();
  const api = config.public.apiBase;

  const provinces = ref<any[]>([]);
  const regencies = ref<any[]>([]);
  const districts = ref<any[]>([]);
  const villages = ref<any[]>([]);

  const fetchProvinces = async () => {
    provinces.value = await $fetch(`${api}/provinces`);
  };

  const fetchRegencies = async (provinceId: string) => {
    regencies.value = await $fetch(`${api}/regencies`, {
      params: { province_id: provinceId },
    });
  };

  const fetchDistricts = async (regencyId: string) => {
    districts.value = await $fetch(`${api}/districts`, {
      params: { regency_id: regencyId },
    });
  };

  const fetchVillages = async (districtId: string) => {
    villages.value = await $fetch(`${api}/villages`, {
      params: { district_id: districtId },
    });
  };

  return {
    provinces,
    regencies,
    districts,
    villages,
    fetchProvinces,
    fetchRegencies,
    fetchDistricts,
    fetchVillages,
  };
};
