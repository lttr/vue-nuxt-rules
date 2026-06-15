<script setup>
import { ref } from 'vue'
import { useMouse } from '../composables/useMouse.js'
import { useItems } from '../composables/useItems.js'

const { x, y } = useMouse()
const { items, count, addItem, removeItem, clear } = useItems(['First item', 'Second item'])

const draft = ref('')

function submit() {
  addItem(draft.value)
  draft.value = ''
}
</script>

<template>
  <section class="dashboard">
    <div class="panel">
      <h2>Mouse position</h2>
      <p>x: {{ x }} — y: {{ y }}</p>
    </div>

    <div class="panel">
      <h2>Items ({{ count }})</h2>

      <form @submit.prevent="submit">
        <input v-model="draft" placeholder="Add an item" />
        <button type="submit">Add</button>
        <button type="button" @click="clear" :disabled="count === 0">Clear</button>
      </form>

      <ul>
        <li v-for="item in items" :key="item.id">
          {{ item.text }}
          <button type="button" @click="removeItem(item.id)">✕</button>
        </li>
      </ul>
      <p v-if="count === 0" class="empty">No items yet.</p>
    </div>
  </section>
</template>

<style scoped>
.dashboard {
  display: flex;
  gap: 1.5rem;
  font-family: system-ui, sans-serif;
}
.panel {
  flex: 1;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}
h2 {
  margin-top: 0;
  font-size: 1rem;
}
form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
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
  padding: 0.35rem 0;
  border-bottom: 1px solid #f0f0f0;
}
.empty {
  color: #888;
}
</style>
