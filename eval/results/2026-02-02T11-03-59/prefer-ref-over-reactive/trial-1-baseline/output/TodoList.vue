<template>
  <div class="todo-list">
    <form @submit.prevent="addTodo">
      <input
        v-model="newTodoText"
        placeholder="Add a new todo..."
        type="text"
      />
      <button type="submit">Add</button>
    </form>

    <div class="filters">
      <button
        v-for="f in filters"
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const newTodoText = ref('')
const filter = ref('all')
const filters = ['all', 'active', 'completed']

let nextId = 0
const todos = ref([])

function addTodo() {
  const text = newTodoText.value.trim()
  if (!text) return
  todos.value.push({ id: nextId++, text, completed: false })
  newTodoText.value = ''
}

function toggleTodo(id) {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) todo.completed = !todo.completed
}

function deleteTodo(id) {
  todos.value = todos.value.filter((t) => t.id !== id)
}

const filteredTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter((t) => !t.completed)
  if (filter.value === 'completed') return todos.value.filter((t) => t.completed)
  return todos.value
})
</script>

<style scoped>
.todo-list {
  max-width: 400px;
  margin: 0 auto;
  font-family: sans-serif;
}

form {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

input[type='text'] {
  flex: 1;
  padding: 6px 8px;
}

.filters {
  display: flex;
  gap: 4px;
  margin-bottom: 12px;
}

.filters button {
  text-transform: capitalize;
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

li span.completed {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
