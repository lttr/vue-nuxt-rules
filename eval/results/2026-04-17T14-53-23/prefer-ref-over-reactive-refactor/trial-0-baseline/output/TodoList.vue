<!-- TodoList.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface TodoItem {
  id: number
  title: string
  completed: boolean
}

const items = ref<TodoItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function fetchTodos() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch('/api/todos')
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    items.value = await res.json()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

function toggle(item: TodoItem) {
  item.completed = !item.completed
}

onMounted(fetchTodos)
</script>

<template>
  <div class="todo-list">
    <p v-if="loading">Loading…</p>
    <p v-else-if="error" role="alert">{{ error }}</p>
    <ul v-else-if="items.length">
      <li v-for="item in items" :key="item.id">
        <label>
          <input
            type="checkbox"
            :checked="item.completed"
            @change="toggle(item)"
          />
          <span :class="{ done: item.completed }">{{ item.title }}</span>
        </label>
      </li>
    </ul>
    <p v-else>No todos yet.</p>
  </div>
</template>

<style scoped>
.done {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
