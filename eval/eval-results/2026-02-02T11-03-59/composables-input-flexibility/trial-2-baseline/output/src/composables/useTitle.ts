import { watch, ref, type Ref, isRef } from 'vue'

type MaybeRefOrGetter<T> = T | Ref<T> | (() => T)

export function useTitle(newTitle: MaybeRefOrGetter<string>) {
  const title = ref(resolveValue(newTitle))

  function resolveValue(source: MaybeRefOrGetter<string>): string {
    if (typeof source === 'function') return source()
    if (isRef(source)) return source.value
    return source
  }

  function update() {
    const value = resolveValue(newTitle)
    title.value = value
    document.title = value
  }

  // Set immediately
  update()

  // Watch reactive sources
  if (isRef(newTitle) || typeof newTitle === 'function') {
    watch(
      typeof newTitle === 'function' ? newTitle : newTitle,
      () => update(),
    )
  }

  return title
}
