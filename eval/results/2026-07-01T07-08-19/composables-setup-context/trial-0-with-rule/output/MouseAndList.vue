<script setup>
import { ref } from 'vue'
import { useMouse } from './useMouse.js'
import { useList } from './useList.js'

const { x, y } = useMouse()
const { items, count, addItem, removeItem } = useList(['Apples', 'Bread', 'Milk'])

const newItem = ref('')

function handleAdd() {
  const value = newItem.value.trim()
  if (!value) return
  addItem(value)
  newItem.value = ''
}
</script>

<template>
  <div class="mouse-and-list">
    <section class="mouse-tracker">
      <h2>Mouse Position</h2>
      <p>x: {{ x }}, y: {{ y }}</p>
    </section>

    <section class="item-list">
      <h2>Items ({{ count }})</h2>
      <form @submit.prevent="handleAdd">
        <input v-model="newItem" type="text" placeholder="New item" />
        <button type="submit">Add</button>
      </form>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item }}
          <button type="button" @click="removeItem(index)">Remove</button>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.mouse-and-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-family: sans-serif;
}

.item-list ul {
  list-style: none;
  padding: 0;
}

.item-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
}
</style>
