import { ref } from 'vue'

export function useItemList(initial = []) {
  const items = ref([...initial])

  function addItem(text) {
    if (!text.trim()) return
    items.value.push({ id: Date.now(), text: text.trim() })
  }

  function removeItem(id) {
    items.value = items.value.filter(item => item.id !== id)
  }

  function clearItems() {
    items.value = []
  }

  return { items, addItem, removeItem, clearItems }
}
