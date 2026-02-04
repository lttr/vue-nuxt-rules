<script setup>
import { ref } from 'vue'
import { useMousePosition } from './useMousePosition'
import { useItemList } from './useItemList'

const { x, y } = useMousePosition()
const { items, itemCount, addItem, removeItem, clearItems } = useItemList(['Apple', 'Banana', 'Cherry'])

const newItem = ref('')

function handleAddItem() {
  if (newItem.value.trim()) {
    addItem(newItem.value.trim())
    newItem.value = ''
  }
}
</script>

<template>
  <div class="container">
    <section class="mouse-tracker">
      <h2>Mouse Position</h2>
      <p>X: <strong>{{ x }}</strong></p>
      <p>Y: <strong>{{ y }}</strong></p>
    </section>

    <section class="item-list">
      <h2>Item List ({{ itemCount }} items)</h2>

      <div class="add-item">
        <input
          v-model="newItem"
          @keyup.enter="handleAddItem"
          placeholder="Enter item name"
        />
        <button @click="handleAddItem">Add</button>
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
  font-family: Arial, sans-serif;
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
}

section {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h2 {
  margin-top: 0;
  color: #333;
}

.mouse-tracker p {
  font-size: 18px;
}

.add-item {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.add-item input {
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
  margin-bottom: 5px;
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
</style>
