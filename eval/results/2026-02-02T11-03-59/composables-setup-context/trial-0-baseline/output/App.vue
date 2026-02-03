<script setup>
import { ref } from 'vue'
import { useMousePosition } from './useMousePosition.js'
import { useItemList } from './useItemList.js'

const { x, y } = useMousePosition()
const { items, count, addItem, removeItem } = useItemList([
  { id: 1, name: 'First item' },
  { id: 2, name: 'Second item' },
])

const newItemName = ref('')

function handleAdd() {
  addItem(newItemName.value)
  newItemName.value = ''
}
</script>

<template>
  <div class="app">
    <section>
      <h2>Mouse Position</h2>
      <p>X: {{ x }} / Y: {{ y }}</p>
    </section>

    <section>
      <h2>Item List ({{ count }})</h2>
      <form @submit.prevent="handleAdd">
        <input v-model="newItemName" placeholder="New item name" />
        <button type="submit">Add</button>
      </form>
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.name }}
          <button @click="removeItem(item.id)">Remove</button>
        </li>
      </ul>
      <p v-if="count === 0">No items yet.</p>
    </section>
  </div>
</template>
