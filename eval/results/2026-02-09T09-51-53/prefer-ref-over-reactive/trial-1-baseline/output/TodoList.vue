<template>
  <div class="todo-list">
    <h1>Todo List</h1>

    <form @submit.prevent="addTodo" class="todo-form">
      <input
        v-model="newTodoText"
        type="text"
        placeholder="Add a new todo..."
        class="todo-input"
      />
      <button type="submit" :disabled="!newTodoText.trim()">Add</button>
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

    <ul class="todos">
      <li v-for="todo in filteredTodos" :key="todo.id" :class="{ completed: todo.completed }">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
        />
        <span class="todo-text">{{ todo.text }}</span>
        <button class="delete-btn" @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>

    <p v-if="filteredTodos.length === 0" class="empty-message">No todos to show.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filters = ['all', 'active', 'completed']

const newTodoText = ref('')
const filter = ref('all')
const todos = ref([])

let nextId = 0

function addTodo() {
  const text = newTodoText.value.trim()
  if (!text) return
  todos.value.push({ id: nextId++, text, completed: false })
  newTodoText.value = ''
}

function toggleTodo(id) {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
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
  margin: 0 auto;
  font-family: sans-serif;
}

.todo-form {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.todo-input {
  flex: 1;
  padding: 8px;
  font-size: 1rem;
}

.filters {
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
}

.filters button {
  padding: 4px 12px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
  text-transform: capitalize;
}

.filters button.active {
  background: #1a73e8;
  color: #fff;
  border-color: #1a73e8;
}

.todos {
  list-style: none;
  padding: 0;
}

.todos li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.todos li.completed .todo-text {
  text-decoration: line-through;
  color: #999;
}

.todo-text {
  flex: 1;
}

.delete-btn {
  background: none;
  border: 1px solid #e53935;
  color: #e53935;
  border-radius: 4px;
  cursor: pointer;
  padding: 2px 8px;
}

.empty-message {
  color: #999;
  text-align: center;
}
</style>
