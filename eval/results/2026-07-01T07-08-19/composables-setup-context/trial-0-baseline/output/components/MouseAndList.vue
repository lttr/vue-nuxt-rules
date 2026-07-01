<script setup>
import { ref } from 'vue'
import { useMouse } from '../composables/useMouse'
import { useList } from '../composables/useList'

const { x, y } = useMouse()
const { items, addItem, removeItem } = useList(['Learn Vue', 'Write composables'])

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
    <section class="mouse-position">
      <h2>Mouse Position</h2>
      <p>x: {{ x }}, y: {{ y }}</p>
    </section>

    <section class="item-list">
      <h2>Items</h2>
      <form @submit.prevent="handleAdd">
        <input v-model="newItem" placeholder="Add an item" />
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
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
}
</style>
