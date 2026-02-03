<script setup lang="ts">
import { ref, computed } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const newTodoText = ref('')
const filter = ref<'all' | 'active' | 'completed'>('all')
const todos = ref<Todo[]>([])

let nextId = 0

const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter((t) => !t.completed)
    case 'completed':
      return todos.value.filter((t) => t.completed)
    default:
      return todos.value
  }
})

function addTodo() {
  const text = newTodoText.value.trim()
  if (!text) return
  todos.value.push({ id: nextId++, text, completed: false })
  newTodoText.value = ''
}

function toggleTodo(id: number) {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

function deleteTodo(id: number) {
  todos.value = todos.value.filter((t) => t.id !== id)
}
</script>

<template>
  <div class="todo-list">
    <form @submit.prevent="addTodo">
      <input
        v-model="newTodoText"
        placeholder="Add a new todo"
      />
      <button type="submit">Add</button>
    </form>

    <div class="filters">
      <button
        v-for="f in (['all', 'active', 'completed'] as const)"
        :key="f"
        :class="{ active: filter === f }"
        @click="filter = f"
      >
        {{ f }}
      </button>
    </div>

    <ul>
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
        />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>

    <p v-if="filteredTodos.length === 0">No todos to show.</p>
  </div>
</template>

<style scoped>
.todo-list {
  max-width: 400px;
  margin: 0 auto;
}

form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

form input {
  flex: 1;
}

.filters {
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
}

.filters button.active {
  font-weight: bold;
  text-decoration: underline;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
}

.completed {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
