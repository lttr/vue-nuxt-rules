<!-- TodoList.vue -->
<script setup lang="ts">
import { reactive } from 'vue'

interface TodoItem {
  id: string
  text: string
  done: boolean
}

interface TodoState {
  items: TodoItem[]
  loading: boolean
  error: string | null
}

const state = reactive<TodoState>({ items: [], loading: false, error: null })

async function loadItems(fetcher: () => Promise<TodoItem[]>) {
  state.loading = true
  state.error = null
  try {
    state.items = await fetcher()
  } catch (err) {
    state.error = err instanceof Error ? err.message : 'Failed to load todos'
  } finally {
    state.loading = false
  }
}

function toggleItem(id: string) {
  const item = state.items.find((i) => i.id === id)
  if (item) item.done = !item.done
}

function removeItem(id: string) {
  state.items = state.items.filter((i) => i.id !== id)
}

defineExpose({ loadItems, toggleItem, removeItem })
</script>

<template>
  <div class="todo-list">
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
    </ul>
    <p v-if="!state.loading && !state.error && state.items.length === 0">No todos yet.</p>
  </div>
</template>

<style scoped>
.done {
  text-decoration: line-through;
  opacity: 0.6;
}
.error {
  color: #c0392b;
}
</style>
