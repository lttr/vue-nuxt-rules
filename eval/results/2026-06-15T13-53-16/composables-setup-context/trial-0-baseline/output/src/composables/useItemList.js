import { ref } from 'vue'

// Manages a reactive list of items with add/remove/clear helpers.
export function useItemList(initial = []) {
  const items = ref([...initial])

  function add(item) {
    const value = typeof item === 'string' ? item.trim() : item
    if (value === '' || value == null) return
    items.value.push(value)
  }

  function remove(index) {
    items.value.splice(index, 1)
  }

  function clear() {
    items.value = []
  }

  return { items, add, remove, clear }
}
