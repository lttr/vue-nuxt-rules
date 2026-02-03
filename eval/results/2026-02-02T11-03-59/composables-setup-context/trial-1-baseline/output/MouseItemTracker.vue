<script setup>
import { ref } from 'vue'
import { useMousePosition } from './useMousePosition'
import { useItemList } from './useItemList'

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
  <div class="tracker">
    <section class="mouse-section">
      <h2>Mouse Position</h2>
      <p>X: {{ x }} / Y: {{ y }}</p>
    </section>

    <section class="items-section">
      <h2>Item List ({{ count }})</h2>

      <form @submit.prevent="handleAdd" class="add-form">
        <input v-model="newItemName" placeholder="New item name" />
        <button type="submit">Add</button>
      </form>

      <ul>
        <li v-for="item in items" :key="item.id">
          <span>{{ item.name }}</span>
          <button @click="removeItem(item.id)">Remove</button>
        </li>
      </ul>

      <p v-if="count === 0">No items yet.</p>
    </section>
  </div>
</template>
