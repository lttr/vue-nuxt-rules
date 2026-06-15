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

const props = withDefaults(
  defineProps<{
    /** Endpoint to load todos from. */
    source?: string
  }>(),
  { source: '/api/todos' },
)

const state = reactive<TodoState>({
  items: [],
  loading: false,
  error: null,
})

const remaining = computed(() => state.items.filter((t) => !t.done).length)

let nextId = 1

async function load(): Promise<void> {
  state.loading = true
  state.error = null
  try {
    const res = await fetch(props.source)
    if (!res.ok) throw new Error(`Request failed (${res.status})`)
    const data = (await res.json()) as Todo[]
    state.items = data
    nextId = data.reduce((max, t) => Math.max(max, t.id), 0) + 1
  } catch (err) {
    state.error = err instanceof Error ? err.message : 'Failed to load todos'
  } finally {
    state.loading = false
  }
}

function addTodo(title: string): void {
  const trimmed = title.trim()
  if (!trimmed) return
  state.items.push({ id: nextId++, title: trimmed, done: false })
}

function toggle(todo: Todo): void {
  todo.done = !todo.done
}

function remove(todo: Todo): void {
  const index = state.items.indexOf(todo)
  if (index !== -1) state.items.splice(index, 1)
}

onMounted(load)
</script>

<template>
  <section class="todo-list">
    <header class="todo-list__header">
      <h2>Todos</h2>
      <span class="todo-list__count">{{ remaining }} remaining</span>
    </header>

    <p v-if="state.loading" class="todo-list__status">Loading…</p>
    <p v-else-if="state.error" class="todo-list__status todo-list__status--error" role="alert">
      {{ state.error }}
      <button type="button" @click="load">Retry</button>
    </p>

    <form
      v-else
      class="todo-list__add"
      @submit.prevent="
        (e) => {
          const input = (e.target as HTMLFormElement).elements.namedItem('title') as HTMLInputElement
          addTodo(input.value)
          input.value = ''
        }
      "
    >
      <input name="title" type="text" placeholder="What needs doing?" aria-label="New todo" />
      <button type="submit">Add</button>
    </form>

    <ul v-if="!state.loading && !state.error" class="todo-list__items">
      <li v-for="todo in state.items" :key="todo.id" class="todo-list__item">
        <label :class="{ 'todo-list__item--done': todo.done }">
          <input type="checkbox" :checked="todo.done" @change="toggle(todo)" />
          {{ todo.title }}
        </label>
        <button type="button" aria-label="Delete" @click="remove(todo)">×</button>
      </li>
      <li v-if="state.items.length === 0" class="todo-list__empty">Nothing here yet.</li>
    </ul>
  </section>
</template>

<style scoped>
.todo-list__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.todo-list__count {
  color: #666;
  font-size: 0.875rem;
}

.todo-list__status--error {
  color: #c00;
}

.todo-list__add {
  display: flex;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.todo-list__items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-list__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0;
}

.todo-list__item--done {
  text-decoration: line-through;
  color: #999;
}

.todo-list__empty {
  color: #999;
}
</style>
