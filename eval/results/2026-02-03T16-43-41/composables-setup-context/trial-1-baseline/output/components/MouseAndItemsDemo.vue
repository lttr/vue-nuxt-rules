<script setup>
import { ref } from 'vue'
import { useMousePosition } from '../composables/useMousePosition'
import { useItemList } from '../composables/useItemList'

// Mouse position composable
const { x, y } = useMousePosition()

// Item list composable
const { items, itemCount, addItem, removeItem, clearItems } = useItemList([
  'Initial Item 1',
  'Initial Item 2'
])

// Input for new items
const newItemText = ref('')

function handleAddItem() {
  if (newItemText.value.trim()) {
    addItem(newItemText.value.trim())
    newItemText.value = ''
  }
}
</script>

<template>
  <div class="demo-container">
    <!-- Mouse Position Section -->
    <section class="mouse-section">
      <h2>Mouse Position</h2>
      <p>X: <strong>{{ x }}</strong></p>
      <p>Y: <strong>{{ y }}</strong></p>
    </section>

    <!-- Item List Section -->
    <section class="items-section">
      <h2>Item List ({{ itemCount }} items)</h2>

      <div class="add-item">
        <input
          v-model="newItemText"
          @keyup.enter="handleAddItem"
          placeholder="Enter new item..."
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
      <p v-else class="empty-message">No items in the list</p>
    </section>
  </div>
</template>

<style scoped>
.demo-container {
  font-family: sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h2 {
  margin-top: 0;
  color: #42b883;
}

.add-item {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
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
  padding: 10px;
  margin-bottom: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

li button {
  background-color: #e74c3c;
  padding: 4px 10px;
  font-size: 12px;
}

li button:hover {
  background-color: #c0392b;
}

.empty-message {
  color: #888;
  font-style: italic;
}
</style>
