import { watch, ref, type Ref, isRef } from 'vue'

type MaybeRefOrGetter<T> = T | Ref<T> | (() => T)

export function useTitle(title: MaybeRefOrGetter<string>) {
  const resolvedTitle = ref(resolve(title))

  function resolve(t: MaybeRefOrGetter<string>): string {
    if (isRef(t)) return t.value
    if (typeof t === 'function') return t()
    return t
  }

  function update() {
    resolvedTitle.value = resolve(title)
    document.title = resolvedTitle.value
  }

  // Set immediately
  update()

  // Watch reactive sources
  if (isRef(title) || typeof title === 'function') {
    watch(
      typeof title === 'function' ? title : title,
      () => update(),
      { flush: 'sync' }
    )
  }

  return resolvedTitle
}
