<!-- TodoList.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Todo {
  id: number
  title: string
  completed: boolean
}

const items = ref<Todo[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function fetchTodos() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch('/api/todos')
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    items.value = (await res.json()) as Todo[]
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

function toggle(todo: Todo) {
  todo.completed = !todo.completed
}

onMounted(fetchTodos)
</script>

<template>
  <div class="todo-list">
    <p v-if="loading">Loading…</p>
    <p v-else-if="error" role="alert">{{ error }}</p>
    <p v-else-if="items.length === 0">No todos yet.</p>
    <ul v-else>
      <li v-for="todo in items" :key="todo.id">
        <label>
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggle(todo)"
          />
          <span :class="{ done: todo.completed }">{{ todo.title }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.done {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
