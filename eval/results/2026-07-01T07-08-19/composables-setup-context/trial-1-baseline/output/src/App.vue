<script setup>
import { ref } from 'vue'
import { useMouse } from './composables/useMouse'
import { useList } from './composables/useList'

const { x, y } = useMouse()
const { items, count, addItem, removeItem } = useList(['Learn Vue', 'Build composables'])

const newItemText = ref('')

function handleAdd() {
  addItem(newItemText.value)
  newItemText.value = ''
}
</script>

<template>
  <main class="app">
    <section class="panel">
      <h2>Mouse Position</h2>
      <p>x: {{ x }}, y: {{ y }}</p>
    </section>

    <section class="panel">
      <h2>Item List ({{ count }})</h2>
      <form @submit.prevent="handleAdd">
        <input v-model="newItemText" type="text" placeholder="New item" />
        <button type="submit">Add</button>
      </form>
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.text }}
          <button type="button" @click="removeItem(item.id)">Remove</button>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.app {
  font-family: sans-serif;
  max-width: 480px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.panel {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
}
</style>
