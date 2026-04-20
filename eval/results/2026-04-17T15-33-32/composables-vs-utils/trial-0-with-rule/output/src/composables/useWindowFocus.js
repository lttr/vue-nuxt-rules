import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useWindowFocus() {
  const isFocused = ref(typeof document !== 'undefined' ? document.hasFocus() : true);

  const onFocus = () => { isFocused.value = true; };
  const onBlur = () => { isFocused.value = false; };

  onMounted(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('focus', onFocus);
    window.removeEventListener('blur', onBlur);
  });

  return { isFocused };
}
