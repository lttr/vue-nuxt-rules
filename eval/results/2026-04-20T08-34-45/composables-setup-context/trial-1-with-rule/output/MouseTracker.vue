<template>
  <div class="container">
    <section class="mouse-section">
      <h2>Mouse Position</h2>
      <p>X: {{ x }} &nbsp; Y: {{ y }}</p>
    </section>

    <section class="list-section">
      <h2>Item List</h2>
      <form @submit.prevent="submit">
        <input v-model="draft" placeholder="New item..." />
        <button type="submit">Add</button>
      </form>
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.text }}
          <button @click="removeItem(item.id)">Remove</button>
        </li>
      </ul>
      <p v-if="!items.length" class="empty">No items yet.</p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMousePosition } from './composables/useMousePosition.js'
import { useItemList } from './composables/useItemList.js'

const { x, y } = useMousePosition()
const { items, addItem, removeItem } = useItemList()

const draft = ref('')

function submit() {
  addItem(draft.value)
  draft.value = ''
}
</script>

<style scoped>
.container {
  font-family: sans-serif;
  max-width: 480px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

section {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}

h2 {
  margin: 0 0 0.75rem;
}

form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

input {
  flex: 1;
  padding: 0.25rem 0.5rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
  border-bottom: 1px solid #eee;
}

.empty {
  color: #999;
  font-style: italic;
}
</style>
