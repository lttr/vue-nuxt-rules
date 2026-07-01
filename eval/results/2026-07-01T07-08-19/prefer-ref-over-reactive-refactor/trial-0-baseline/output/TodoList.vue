<!-- TodoList.vue -->
<script setup lang="ts">
import { reactive, ref } from 'vue'

interface TodoItem {
  id: number
  text: string
  done: boolean
}

interface TodoState {
  items: TodoItem[]
  loading: boolean
  error: string | null
}

const state = reactive<TodoState>({ items: [], loading: false, error: null })
const newItemText = ref('')

async function fetchItems() {
  state.loading = true
  state.error = null
  try {
    const res = await fetch('/api/todos')
    if (!res.ok) throw new Error(`Failed to load todos (${res.status})`)
    state.items = await res.json()
  } catch (err) {
    state.error = err instanceof Error ? err.message : 'Failed to load todos'
  } finally {
    state.loading = false
  }
}

function addItem() {
  const text = newItemText.value.trim()
  if (!text) return
  state.items.push({ id: Date.now(), text, done: false })
  newItemText.value = ''
}

function toggleItem(id: number) {
  const item = state.items.find((i) => i.id === id)
  if (item) item.done = !item.done
}

function removeItem(id: number) {
  state.items = state.items.filter((i) => i.id !== id)
}

fetchItems()
</script>

<template>
  <div class="todo-list">
    <form @submit.prevent="addItem">
      <input v-model="newItemText" type="text" placeholder="Add a todo" />
      <button type="submit">Add</button>
    </form>

    <p v-if="state.loading">Loading...</p>
    <p v-else-if="state.error" class="error">{{ state.error }}</p>

    <ul v-else>
      <li v-for="item in state.items" :key="item.id">
        <label>
          <input type="checkbox" :checked="item.done" @change="toggleItem(item.id)" />
          <span :class="{ done: item.done }">{{ item.text }}</span>
        </label>
        <button type="button" @click="removeItem(item.id)">Remove</button>
      </li>
      <li v-if="!state.items.length">No todos yet.</li>
    </ul>
  </div>
</template>

<style scoped>
.done {
  text-decoration: line-through;
  opacity: 0.6;
}
.error {
  color: red;
}
</style>
