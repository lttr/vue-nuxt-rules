import { ref, computed } from 'vue'

export function useItemList(initialItems = []) {
  const items = ref([...initialItems])
  const count = computed(() => items.value.length)

  function addItem(item) {
    items.value.push(item)
  }

  function removeItem(index) {
    items.value.splice(index, 1)
  }

  return { items, count, addItem, removeItem }
}
