import { ref, computed } from 'vue'

export function useItems(initial = []) {
  const items = ref([...initial])

  function add(item) {
    items.value.push(item)
  }

  function remove(index) {
    items.value.splice(index, 1)
  }

  function clear() {
    items.value = []
  }

  const count = computed(() => items.value.length)

  return { items, count, add, remove, clear }
}
