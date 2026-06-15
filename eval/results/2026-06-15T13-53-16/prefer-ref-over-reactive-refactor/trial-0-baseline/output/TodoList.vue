<!-- TodoList.vue -->
<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'

interface Todo {
  id: number
  title: string
  done: boolean
}

interface TodoState {
  items: Todo[]
  loading: boolean
  error: string | null
}

const state = reactive<TodoState>({
  items: [],
  loading: false,
  error: null,
})

const remaining = computed(() => state.items.filter((t) => !t.done).length)
const hasItems = computed(() => state.items.length > 0)

async function loadTodos(): Promise<void> {
  state.loading = true
  state.error = null
  try {
    const res = await fetch('/api/todos')
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
    state.items = (await res.json()) as Todo[]
  } catch (err) {
    state.error = err instanceof Error ? err.message : 'Failed to load todos'
  } finally {
    state.loading = false
  }
}

function toggle(todo: Todo): void {
  todo.done = !todo.done
}

onMounted(loadTodos)
</script>

<template>
  <section class="todo-list" aria-busy="state.loading">
    <header class="todo-list__header">
      <h2>Todos</h2>
      <span v-if="hasItems" class="todo-list__count">{{ remaining }} remaining</span>
    </header>

    <p v-if="state.loading" role="status">Loading…</p>

    <p v-else-if="state.error" role="alert" class="todo-list__error">
      {{ state.error }}
      <button type="button" @click="loadTodos">Retry</button>
    </p>

    <p v-else-if="!hasItems" class="todo-list__empty">No todos yet.</p>

    <ul v-else class="todo-list__items">
      <li v-for="todo in state.items" :key="todo.id">
        <label>
          <input type="checkbox" :checked="todo.done" @change="toggle(todo)" />
          <span :class="{ 'is-done': todo.done }">{{ todo.title }}</span>
        </label>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.todo-list__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem;
}

.todo-list__count {
  color: #666;
  font-size: 0.875rem;
}

.todo-list__error {
  color: #b00020;
}

.todo-list__items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.is-done {
  text-decoration: line-through;
  color: #999;
}
</style>
