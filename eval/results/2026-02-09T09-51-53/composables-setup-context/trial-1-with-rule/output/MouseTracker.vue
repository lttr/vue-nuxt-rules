<script setup>
import { ref } from 'vue'
import { useMousePosition } from './useMousePosition.js'
import { useItemList } from './useItemList.js'

const { x, y } = useMousePosition()
const { items, itemCount, addItem, removeItem } = useItemList(['First item', 'Second item'])

const newItem = ref('')

function handleAdd() {
  const text = newItem.value.trim()
  if (text) {
    addItem(text)
    newItem.value = ''
  }
}
</script>

<template>
  <div class="container">
    <section class="mouse-section">
      <h2>Mouse Position</h2>
      <p>X: {{ x }} / Y: {{ y }}</p>
    </section>

    <section class="items-section">
      <h2>Item List ({{ itemCount }})</h2>
      <div class="add-form">
        <input
          v-model="newItem"
          placeholder="Enter item text"
          @keyup.enter="handleAdd"
        />
        <button @click="handleAdd">Add</button>
      </div>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          <span>{{ item }}</span>
          <button @click="removeItem(index)">Remove</button>
        </li>
      </ul>
      <p v-if="itemCount === 0">No items yet.</p>
    </section>
  </div>
</template>

<style scoped>
.container {
  font-family: sans-serif;
  max-width: 480px;
  margin: 2rem auto;
}
.mouse-section,
.items-section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.add-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
.add-form input {
  flex: 1;
  padding: 0.4rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0;
}
</style>
