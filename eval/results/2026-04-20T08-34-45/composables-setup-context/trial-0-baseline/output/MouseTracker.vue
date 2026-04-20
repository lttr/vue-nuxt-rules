<template>
  <div class="container">
    <section class="mouse-section">
      <h2>Mouse Position</h2>
      <div class="coords">
        <span>X: <strong>{{ x }}</strong></span>
        <span>Y: <strong>{{ y }}</strong></span>
      </div>
      <div class="crosshair" :style="{ left: x + 'px', top: y + 'px' }" />
    </section>

    <section class="list-section">
      <h2>Item List <small>({{ count }} items)</small></h2>
      <div class="input-row">
        <input
          v-model="newItem"
          placeholder="Add an item..."
          @keyup.enter="handleAdd"
        />
        <button @click="handleAdd">Add</button>
        <button class="clear" @click="clearItems" :disabled="count === 0">Clear all</button>
      </div>
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.text }}
          <button class="remove" @click="removeItem(item.id)">×</button>
        </li>
        <li v-if="count === 0" class="empty">No items yet.</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMousePosition } from './composables/useMousePosition.js'
import { useItemList } from './composables/useItemList.js'

const { x, y } = useMousePosition()
const { items, count, addItem, removeItem, clearItems } = useItemList(['Vue 3', 'Composables'])

const newItem = ref('')

function handleAdd() {
  addItem(newItem.value)
  newItem.value = ''
}
</script>

<style scoped>
.container {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  font-family: sans-serif;
}

section {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
}

h2 {
  margin: 0 0 1rem;
  font-size: 1.1rem;
}

small {
  font-weight: normal;
  color: #888;
}

.coords {
  display: flex;
  gap: 1.5rem;
  font-size: 1.2rem;
}

.crosshair {
  position: fixed;
  width: 12px;
  height: 12px;
  border: 2px solid tomato;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.input-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

input {
  flex: 1;
  padding: 0.4rem 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #4f80ff;
  color: white;
}

button:disabled {
  opacity: 0.4;
  cursor: default;
}

button.clear {
  background: #aaa;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.5rem;
  border-bottom: 1px solid #f0f0f0;
}

li.empty {
  color: #aaa;
  font-style: italic;
}

button.remove {
  background: none;
  color: #e44;
  font-size: 1.1rem;
  padding: 0 0.3rem;
}
</style>
