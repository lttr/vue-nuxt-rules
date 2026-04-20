import { ref } from 'vue'

export function useItems(initial = []) {
  const items = ref([...initial])

  function addItem(item) {
    if (item == null || item === '') return
    items.value.push(item)
  }

  function removeItem(index) {
    items.value.splice(index, 1)
  }

  function clear() {
    items.value = []
  }

  return { items, addItem, removeItem, clear }
}
