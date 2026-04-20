<template>
  <div class="dashboard">
    <section class="mouse-tracker">
      <h2>Mouse Position</h2>
      <p>X: <strong>{{ x }}</strong> &nbsp; Y: <strong>{{ y }}</strong></p>
      <div
        class="cursor-dot"
        :style="{ left: `${x}px`, top: `${y}px` }"
      />
    </section>

    <section class="item-list">
      <h2>Item List</h2>
      <form @submit.prevent="onAdd">
        <input v-model="newItem" placeholder="Add an item..." />
        <button type="submit">Add</button>
      </form>
      <ul v-if="items.length">
        <li v-for="item in items" :key="item.id">
          {{ item.text }}
          <button @click="removeItem(item.id)">✕</button>
        </li>
      </ul>
      <p v-else class="empty">No items yet.</p>
      <button v-if="items.length" class="clear" @click="clearItems">Clear all</button>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMousePosition } from '../composables/useMousePosition.js'
import { useItemList } from '../composables/useItemList.js'

const { x, y } = useMousePosition()
const { items, addItem, removeItem, clearItems } = useItemList(['Vue 3', 'Composables'])

const newItem = ref('')

function onAdd() {
  addItem(newItem.value)
  newItem.value = ''
}
</script>

<style scoped>
.dashboard {
  font-family: sans-serif;
  padding: 24px;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

section {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  min-width: 260px;
}

h2 {
  margin: 0 0 12px;
  font-size: 1.1rem;
}

.cursor-dot {
  position: fixed;
  width: 10px;
  height: 10px;
  background: #42b883;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
}

form {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

input {
  flex: 1;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #42b883;
  color: white;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0 0 12px;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
}

li button {
  background: #e55;
  padding: 2px 8px;
  font-size: 0.8rem;
}

.empty {
  color: #999;
  font-style: italic;
}

.clear {
  background: #888;
}
</style>
