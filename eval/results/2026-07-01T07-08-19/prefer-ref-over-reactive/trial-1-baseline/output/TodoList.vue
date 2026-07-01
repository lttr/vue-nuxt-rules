<template>
  <div class="todo-list">
    <h1>Todo List</h1>

    <form class="todo-input" @submit.prevent="addTodo">
      <input
        v-model="newTodoText"
        type="text"
        placeholder="What needs to be done?"
      />
      <button type="submit">Add</button>
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

    <ul class="items">
      <li v-for="todo in filteredTodos" :key="todo.id" :class="{ completed: todo.completed }">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
        />
        <span class="text">{{ todo.text }}</span>
        <button class="delete" @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>

    <p v-if="filteredTodos.length === 0" class="empty">No todos to show.</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

let nextId = 1

const todos = ref([])
const newTodoText = ref('')
const filter = ref('all')
const filterOptions = ['all', 'active', 'completed']

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
  margin: 0 auto;
  font-family: sans-serif;
}

.todo-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.todo-input input {
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

.items {
  list-style: none;
  padding: 0;
}

.items li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
}

.items li.completed .text {
  text-decoration: line-through;
  color: #999;
}

.items .text {
  flex: 1;
}

.empty {
  color: #999;
}
</style>
