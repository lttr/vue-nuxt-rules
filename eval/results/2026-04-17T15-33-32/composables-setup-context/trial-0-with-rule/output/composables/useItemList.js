import { ref } from 'vue'

export function useItemList(initial = []) {
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

  return { items, add, remove, clear }
}
