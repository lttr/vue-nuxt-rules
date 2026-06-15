import { toValue, watchEffect } from 'vue'

/**
 * Reactively sync the document title with the provided input.
 *
 * Accepts a ref, getter, or plain value so it composes flexibly across
 * components. Whenever a reactive source changes, the document title updates.
 *
 * @param {import('vue').MaybeRefOrGetter<string>} title - The desired document title.
 * @returns {void}
 */
export function useTitle(title) {
  watchEffect(() => {
    const value = toValue(title)
    if (value != null) {
      document.title = value
    }
  })
}
