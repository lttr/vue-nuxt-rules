import { ref } from 'vue'

export function useList(initialItems = []) {
  const items = ref([...initialItems])

  function addItem(item) {
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
