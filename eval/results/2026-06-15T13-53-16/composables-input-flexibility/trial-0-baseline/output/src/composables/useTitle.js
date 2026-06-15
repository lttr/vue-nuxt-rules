import { toValue, watchEffect } from 'vue'

/**
 * Reactively sync the document title with a caller-provided value.
 *
 * The input is a "MaybeRefOrGetter": a plain string, a ref, or a getter
 * function. Whenever the resolved value changes, `document.title` is updated.
 *
 * @example
 *   useTitle('Home')                       // static
 *   useTitle(someRef)                       // ref
 *   useTitle(() => `Inbox (${count.value})`) // getter
 *
 * @param {string | import('vue').MaybeRefOrGetter<string>} title
 *   The desired document title, or a reactive source of it.
 */
export function useTitle(title = '') {
  watchEffect(() => {
    const value = toValue(title)
    if (typeof document !== 'undefined' && value != null) {
      document.title = String(value)
    }
  })
}
