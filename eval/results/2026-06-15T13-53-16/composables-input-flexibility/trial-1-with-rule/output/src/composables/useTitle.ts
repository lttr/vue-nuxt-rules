import { toValue, watchEffect, type MaybeRefOrGetter } from 'vue'

/**
 * Reactively syncs the document title with the provided input.
 *
 * Accepts a ref, getter, or plain string so it composes cleanly across
 * components. When the input changes, `document.title` is updated.
 *
 * @param title - The desired document title (ref, getter, or plain value).
 */
export function useTitle(title: MaybeRefOrGetter<string>): void {
  watchEffect(() => {
    document.title = toValue(title)
  })
}
