<script setup>
import { ref } from 'vue'
import { useMouse } from '../composables/useMouse'
import { useItemList } from '../composables/useItemList'

const { x, y } = useMouse()
const { items, addItem, removeItem } = useItemList(['Apples', 'Bananas'])

const newItem = ref('')

function handleAdd() {
  addItem(newItem.value.trim())
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
        <li v-for="item in items" :key="item.id">
          {{ item.text }}
          <button type="button" @click="removeItem(item.id)">Remove</button>
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

.mouse-position,
.item-list {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}
</style>
