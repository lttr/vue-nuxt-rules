import { ref, computed } from 'vue'

export function useItemList(initialItems = []) {
  const items = ref([...initialItems])

  const count = computed(() => items.value.length)

  function addItem(name) {
    const trimmed = name.trim()
    if (!trimmed) return
    items.value.push({ id: Date.now(), name: trimmed })
  }

  function removeItem(id) {
    items.value = items.value.filter(item => item.id !== id)
  }

  return { items, count, addItem, removeItem }
}
