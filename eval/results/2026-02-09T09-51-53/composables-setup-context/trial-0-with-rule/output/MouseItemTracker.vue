<script setup>
import { ref } from 'vue'
import { useMousePosition } from './useMousePosition.js'
import { useItemList } from './useItemList.js'

// Composables called at the top level of <script setup>
const { x, y } = useMousePosition()
const { items, itemCount, addItem, removeItem } = useItemList(['Apple', 'Banana'])

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
  <div class="container">
    <section>
      <h2>Mouse Position</h2>
      <p>X: {{ x }} / Y: {{ y }}</p>
    </section>

    <section>
      <h2>Item List ({{ itemCount }})</h2>
      <div class="add-form">
        <input
          v-model="newItem"
          placeholder="New item..."
          @keyup.enter="handleAdd"
        />
        <button @click="handleAdd">Add</button>
      </div>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item }}
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
  max-width: 400px;
  margin: 2rem auto;
}
section {
  margin-bottom: 1.5rem;
}
.add-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
input {
  flex: 1;
  padding: 0.25rem 0.5rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
}
</style>
