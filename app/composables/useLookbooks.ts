import type { Lookbook } from '~/types/lookbook';

export const useLookbooks = () => {
  // Hardcode untuk test
  const baseURL = 'https://backend-dewaunited-production.up.railway.app/api/v2';

  // Fetch all lookbooks
  const fetchLookbooks = async () => {
    try {
      console.log('📍 Fetching from:', `${baseURL}/lookbooks`);
      
      // Use $fetch instead of useFetch
      const data = await $fetch<Lookbook[]>(`${baseURL}/lookbooks`, {
        method: 'GET',
      });

      console.log('✅ API Response:', data);
      
      return { data, error: null };
    } catch (err: any) {
      console.error('❌ Fetch Error:', err);
      return { data: null, error: err };
    }
  };

  // Fetch single lookbook by slug
  const fetchLookbookBySlug = async (slug: string) => {
    try {
      console.log('📍 Fetching lookbook:', `${baseURL}/lookbooks/${slug}`);
      
      const data = await $fetch<Lookbook>(`${baseURL}/lookbooks/${slug}`, {
        method: 'GET',
      });

      console.log('✅ Lookbook Response:', data);
      
      return { data, error: null };
    } catch (err: any) {
      console.error('❌ Fetch Error:', err);
      return { data: null, error: err };
    }
  };

  return {
    fetchLookbooks,
    fetchLookbookBySlug,
  };
};