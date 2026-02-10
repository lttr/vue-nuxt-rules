import { ref, watchEffect, isRef, unref, toValue } from 'vue';

/**
 * Composable that fetches data from a given API URL.
 *
 * @param {string | Ref<string>} url - The API endpoint to fetch from.
 *   Accepts a plain string or a Vue ref. When a ref is passed, the
 *   request is automatically re-issued whenever the URL changes.
 * @returns {{ data: Ref, error: Ref, loading: Ref, refetch: Function }}
 */
export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  async function fetchData() {
    const resolvedUrl = toValue(url);
    if (!resolvedUrl) return;

    data.value = null;
    error.value = null;
    loading.value = true;

    try {
      const response = await fetch(resolvedUrl);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      data.value = await response.json();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  // If the URL is reactive, re-fetch whenever it changes.
  // For a plain string this runs once immediately.
  watchEffect(() => {
    fetchData();
  });

  return { data, error, loading, refetch: fetchData };
}
