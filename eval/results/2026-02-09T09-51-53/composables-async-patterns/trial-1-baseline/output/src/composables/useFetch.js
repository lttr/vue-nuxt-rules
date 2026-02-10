import { ref, watchEffect, isRef, unref, toValue } from 'vue';

/**
 * Composable that fetches data from a given API URL.
 *
 * @param {string | Ref<string>} url - The URL to fetch. Can be a plain string or a ref.
 * @param {object} [options] - Optional fetch options (passed to the Fetch API).
 * @returns {{ data: Ref, error: Ref, isLoading: Ref, execute: Function }}
 */
export function useFetch(url, options = {}) {
  const data = ref(null);
  const error = ref(null);
  const isLoading = ref(false);

  async function execute() {
    const resolvedUrl = isRef(url) ? toValue(url) : url;
    if (!resolvedUrl) return;

    data.value = null;
    error.value = null;
    isLoading.value = true;

    try {
      const response = await fetch(resolvedUrl, options);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      data.value = await response.json();
    } catch (err) {
      error.value = err.message || 'An unknown error occurred';
    } finally {
      isLoading.value = false;
    }
  }

  // If the url is reactive, re-fetch whenever it changes.
  if (isRef(url)) {
    watchEffect(() => {
      execute();
    });
  } else {
    execute();
  }

  return { data, error, isLoading, execute };
}
