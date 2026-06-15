import { watchEffect, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

/**
 * Reactively sync the document title with the provided value.
 *
 * Accepts a plain string, a ref, or a getter. Whenever the input changes,
 * `document.title` is updated to match.
 *
 * @example
 * // Static title
 * useTitle('Dashboard')
 *
 * @example
 * // Reactive title that follows a ref
 * const count = ref(0)
 * useTitle(() => `Inbox (${count.value})`)
 *
 * @param title - The title source: a string, ref, or getter.
 */
export function useTitle(title: MaybeRefOrGetter<string>): void {
  watchEffect(() => {
    const value = toValue(title)
    if (typeof document !== 'undefined') {
      document.title = value
    }
  })
}

export default useTitle
