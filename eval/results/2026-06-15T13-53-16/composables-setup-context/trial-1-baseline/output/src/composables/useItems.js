import { ref, computed } from 'vue'

/**
 * Manages a reactive list of items with add/remove/clear helpers.
 * @param {string[]} [initial] - Optional initial items.
 */
export function useItems(initial = []) {
  const items = ref([...initial])

  function addItem(text) {
    const value = String(text ?? '').trim()
    if (!value) return
    items.value.push({ id: nextId(), text: value })
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  function clear() {
    items.value = []
  }

  const count = computed(() => items.value.length)

  let seed = 0
  function nextId() {
    seed += 1
    return seed
  }

  return { items, count, addItem, removeItem, clear }
}
