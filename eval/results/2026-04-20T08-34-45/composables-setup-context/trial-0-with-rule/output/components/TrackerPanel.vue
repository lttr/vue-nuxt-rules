<template>
  <div class="tracker-panel">
    <section class="mouse-section">
      <h2>Mouse Position</h2>
      <p>X: <strong>{{ x }}</strong> &nbsp; Y: <strong>{{ y }}</strong></p>
    </section>

    <section class="list-section">
      <h2>Item List</h2>
      <form @submit.prevent="onAdd">
        <input v-model="draft" placeholder="New item..." />
        <button type="submit">Add</button>
        <button type="button" @click="clearItems">Clear</button>
      </form>
      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.text }}
          <button @click="removeItem(item.id)">✕</button>
        </li>
        <li v-if="!items.length" class="empty">No items yet.</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMousePosition } from '../composables/useMousePosition.js'
import { useItemList } from '../composables/useItemList.js'

const { x, y } = useMousePosition()
const { items, addItem, removeItem, clearItems } = useItemList(['Example item'])

const draft = ref('')

function onAdd() {
  addItem(draft.value)
  draft.value = ''
}
</script>

<style scoped>
.tracker-panel {
  font-family: sans-serif;
  max-width: 400px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
section {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
}
h2 { margin: 0 0 0.75rem; font-size: 1rem; }
form { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; }
input { flex: 1; padding: 0.25rem 0.5rem; }
button { padding: 0.25rem 0.6rem; cursor: pointer; }
ul { list-style: none; margin: 0; padding: 0; }
li { display: flex; justify-content: space-between; align-items: center; padding: 0.25rem 0; }
li + li { border-top: 1px solid #eee; }
.empty { color: #999; font-style: italic; }
</style>
