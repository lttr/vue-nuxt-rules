<template>
  <div class="todo-list">
    <h1>Todo List</h1>

    <form class="todo-form" @submit.prevent="addTodo">
      <input
        v-model="newTodoText"
        type="text"
        placeholder="What needs to be done?"
        class="todo-input"
      />
      <button type="submit" :disabled="!newTodoText.trim()">Add</button>
    </form>

    <div class="filters">
      <button
        v-for="option in filterOptions"
        :key="option"
        :class="{ active: filter === option }"
        @click="filter = option"
      >
        {{ option }}
      </button>
    </div>

    <ul class="todos">
      <li v-for="todo in filteredTodos" :key="todo.id" :class="{ completed: todo.completed }">
        <label>
          <input type="checkbox" :checked="todo.completed" @change="toggleTodo(todo.id)" />
          <span>{{ todo.text }}</span>
        </label>
        <button class="delete" @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>

    <p v-if="filteredTodos.length === 0" class="empty">No todos to show.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const todos = ref([])
const newTodoText = ref('')
const filter = ref('all')
const filterOptions = ['all', 'active', 'completed']

let nextId = 1

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
  max-width: 480px;
  margin: 2rem auto;
  font-family: system-ui, sans-serif;
}

.todo-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.todo-input {
  flex: 1;
  padding: 0.5rem;
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filters button.active {
  font-weight: bold;
  text-decoration: underline;
}

.todos {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todos li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.todos li.completed span {
  text-decoration: line-through;
  color: #888;
}

.delete {
  color: #c00;
}

.empty {
  color: #888;
  text-align: center;
}
</style>
