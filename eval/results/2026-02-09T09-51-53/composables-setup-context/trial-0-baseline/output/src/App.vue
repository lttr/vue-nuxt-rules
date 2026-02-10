<script setup>
import { ref } from 'vue'
import { useMousePosition } from './composables/useMousePosition.js'
import { useItemList } from './composables/useItemList.js'

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
    <section class="mouse-tracker">
      <h2>Mouse Position</h2>
      <p>X: <strong>{{ x }}</strong> &nbsp; Y: <strong>{{ y }}</strong></p>
    </section>

    <section class="item-list">
      <h2>Item List ({{ count }})</h2>

      <form @submit.prevent="handleAdd" class="add-form">
        <input
          v-model="newItemName"
          placeholder="New item name..."
          type="text"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        <li v-for="item in items" :key="item.id">
          <span>{{ item.name }}</span>
          <button @click="removeItem(item.id)">Remove</button>
        </li>
      </ul>

      <p v-if="count === 0" class="empty">No items yet.</p>
    </section>
  </div>
</template>

<style scoped>
.app {
  max-width: 480px;
  margin: 2rem auto;
  font-family: system-ui, sans-serif;
}

section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

h2 {
  margin-top: 0;
}

.add-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-form input {
  flex: 1;
  padding: 0.4rem 0.6rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid #eee;
}

.empty {
  color: #888;
  font-style: italic;
}
</style>
