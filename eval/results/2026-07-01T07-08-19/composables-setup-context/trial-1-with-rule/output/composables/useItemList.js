import { ref } from 'vue'

export function useItemList(initialItems = []) {
  const items = ref([...initialItems])

  function addItem(text) {
    if (!text) return
    items.value.push({ id: Date.now(), text })
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  return { items, addItem, removeItem }
}
