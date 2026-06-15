import { ref, computed } from 'vue'

/**
 * Manages a reactive list of items with add/remove/clear helpers.
 * Must be called from `<script setup>` or `setup()`.
 */
export function useItemList(initial = []) {
  const items = ref([...initial])

  function add(item) {
    const trimmed = String(item).trim()
    if (trimmed) items.value.push(trimmed)
  }

  function remove(index) {
    items.value.splice(index, 1)
  }

  function clear() {
    items.value = []
  }

  const count = computed(() => items.value.length)

  return { items, add, remove, clear, count }
}
