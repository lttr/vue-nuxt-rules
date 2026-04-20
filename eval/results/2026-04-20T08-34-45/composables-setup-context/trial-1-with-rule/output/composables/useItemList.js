import { ref } from 'vue'

export function useItemList() {
  const items = ref([])

  function addItem(text) {
    if (!text.trim()) return
    items.value.push({ id: Date.now(), text: text.trim() })
  }

  function removeItem(id) {
    items.value = items.value.filter(item => item.id !== id)
  }

  return { items, addItem, removeItem }
}
