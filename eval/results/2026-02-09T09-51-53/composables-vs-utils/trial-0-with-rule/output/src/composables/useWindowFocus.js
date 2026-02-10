import { ref, onMounted, onUnmounted } from 'vue';

/**
 * Reactive tracking of browser window focus state.
 * Uses a composable (not a plain util) because it relies on
 * lifecycle hooks and reactive state.
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
