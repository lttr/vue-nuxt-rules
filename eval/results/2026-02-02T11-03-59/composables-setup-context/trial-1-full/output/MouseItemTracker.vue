<script setup>
import { ref } from 'vue'
import { useMouse } from './useMouse.js'
import { useItemList } from './useItemList.js'

// Composables called synchronously in setup context
const { x, y } = useMouse()
const { items, count, addItem, removeItem } = useItemList(['Apple', 'Banana'])

const newItem = ref('')

function handleAdd() {
  const trimmed = newItem.value.trim()
  if (trimmed) {
    addItem(trimmed)
    newItem.value = ''
  }
}
</script>

<template>
  <div>
    <section>
      <h2>Mouse Position</h2>
      <p>X: {{ x }} / Y: {{ y }}</p>
    </section>

    <section>
      <h2>Item List ({{ count }})</h2>
      <form @submit.prevent="handleAdd">
        <input v-model="newItem" placeholder="Add an item" />
        <button type="submit">Add</button>
      </form>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item }}
          <button @click="removeItem(index)">Remove</button>
        </li>
      </ul>
      <p v-if="count === 0">No items yet.</p>
    </section>
  </div>
</template>
