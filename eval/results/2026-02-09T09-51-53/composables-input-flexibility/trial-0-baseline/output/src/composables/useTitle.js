import { watch, unref, isRef } from 'vue';

export function useTitle(title) {
  const update = (value) => {
    document.title = value ?? '';
  };

  if (isRef(title)) {
    watch(title, update, { immediate: true });
  } else {
    update(title);
  }
}
