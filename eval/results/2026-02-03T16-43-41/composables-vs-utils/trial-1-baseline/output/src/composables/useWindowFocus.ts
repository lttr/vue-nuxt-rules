import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Composable to track browser window focus state
 * @returns Reactive ref indicating if window is focused
 */
export function useWindowFocus() {
  const isFocused = ref(typeof document !== 'undefined' ? document.hasFocus() : true);

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
