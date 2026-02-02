import { ref, computed } from 'vue'

export function useItemList(initialItems = []) {
  const items = ref([...initialItems])

  const count = computed(() => items.value.length)

  function addItem(name) {
    if (!name.trim()) return
    items.value.push({ id: Date.now(), name: name.trim() })
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  return { items, count, addItem, removeItem }
}
