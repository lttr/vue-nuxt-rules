import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Reactive composable that tracks whether the browser window is focused.
 *
 * @returns {{ isFocused: import('vue').Ref<boolean> }}
 */
export function useWindowFocus() {
  const isFocused = ref(document.hasFocus());

  function onFocus() {
    isFocused.value = true;
  }

  function onBlur() {
    isFocused.value = false;
  }

  onMounted(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
  });

  onUnmounted(() => {
    window.removeEventListener('focus', onFocus);
    window.removeEventListener('blur', onBlur);
  });

  return { isFocused };
}
