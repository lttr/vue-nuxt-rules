<script setup>
import { ref } from 'vue'
import { useMousePosition } from './useMousePosition'
import { useItemList } from './useItemList'

// Composables called at the top level of <script setup>
const { x, y } = useMousePosition()
const { items, itemCount, addItem, removeItem, clearItems } = useItemList(['Apple', 'Banana', 'Cherry'])

const newItemName = ref('')

function handleAddItem() {
  if (newItemName.value.trim()) {
    addItem(newItemName.value.trim())
    newItemName.value = ''
  }
}
</script>

<template>
  <div class="demo-container">
    <section class="mouse-section">
      <h2>Mouse Position</h2>
      <p>X: {{ x }}, Y: {{ y }}</p>
    </section>

    <section class="items-section">
      <h2>Item List ({{ itemCount }} items)</h2>

      <div class="add-item">
        <input
          v-model="newItemName"
          @keyup.enter="handleAddItem"
          placeholder="Enter item name"
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
.demo-container {
  padding: 20px;
  font-family: sans-serif;
}

section {
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h2 {
  margin-top: 0;
}

.add-item {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 12px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #4a90d9;
  color: white;
}

button:hover {
  background-color: #357abd;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
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

li button {
  background-color: #e74c3c;
  padding: 4px 8px;
  font-size: 12px;
}

li button:hover {
  background-color: #c0392b;
}
</style>
