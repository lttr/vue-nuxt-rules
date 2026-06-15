import { ref, computed } from 'vue'

// Manages a reactive list of items with add/remove/clear helpers.
// Call from <script setup> or setup() only.
export function useItemList(initial = []) {
  const items = ref([...initial])

  const count = computed(() => items.value.length)

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

  return { items, count, add, remove, clear }
}
