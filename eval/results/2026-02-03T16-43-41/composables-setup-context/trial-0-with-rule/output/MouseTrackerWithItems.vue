<script setup>
import { ref } from 'vue'
import { useMousePosition } from './useMousePosition'
import { useItemList } from './useItemList'

// Composables called at the top level of <script setup>
const { x, y } = useMousePosition()
const { items, itemCount, addItem, removeItem, clearItems } = useItemList([
  'Initial Item 1',
  'Initial Item 2'
])

const newItemText = ref('')

function handleAddItem() {
  if (newItemText.value.trim()) {
    addItem(newItemText.value.trim())
    newItemText.value = ''
  }
}
</script>

<template>
  <div class="container">
    <section class="mouse-tracker">
      <h2>Mouse Position</h2>
      <p>X: {{ x }}</p>
      <p>Y: {{ y }}</p>
    </section>

    <section class="item-list">
      <h2>Item List ({{ itemCount }} items)</h2>

      <div class="add-item">
        <input
          v-model="newItemText"
          type="text"
          placeholder="Enter new item"
          @keyup.enter="handleAddItem"
        />
        <button @click="handleAddItem">Add Item</button>
        <button @click="clearItems" :disabled="itemCount === 0">Clear All</button>
      </div>

      <ul v-if="itemCount > 0">
        <li v-for="(item, index) in items" :key="index">
          {{ item }}
          <button @click="removeItem(index)">Remove</button>
        </li>
      </ul>
      <p v-else>No items in the list.</p>
    </section>
  </div>
</template>

<style scoped>
.container {
  padding: 20px;
  font-family: sans-serif;
}

section {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

h2 {
  margin-top: 0;
}

.add-item {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

input {
  padding: 8px;
  flex: 1;
}

button {
  padding: 8px 16px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

li:last-child {
  border-bottom: none;
}
</style>
