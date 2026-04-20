<script setup>
import { ref, computed } from 'vue'

const todos = ref([])
const newTodoText = ref('')
const filter = ref('all')

const filteredTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter(t => !t.completed)
  if (filter.value === 'completed') return todos.value.filter(t => t.completed)
  return todos.value
})

let nextId = 1

function addTodo() {
  const text = newTodoText.value.trim()
  if (!text) return
  todos.value.push({ id: nextId++, text, completed: false })
  newTodoText.value = ''
}

function toggleTodo(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) todo.completed = !todo.completed
}

function deleteTodo(id) {
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>

<template>
  <div class="todo-list">
    <h1>Todo List</h1>

    <form @submit.prevent="addTodo">
      <input
        v-model="newTodoText"
        type="text"
        placeholder="What needs to be done?"
      />
      <button type="submit">Add</button>
    </form>

    <div class="filters">
      <button
        :class="{ active: filter === 'all' }"
        @click="filter = 'all'"
      >
        All
      </button>
      <button
        :class="{ active: filter === 'active' }"
        @click="filter = 'active'"
      >
        Active
      </button>
      <button
        :class="{ active: filter === 'completed' }"
        @click="filter = 'completed'"
      >
        Completed
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
  max-width: 480px;
  margin: 0 auto;
  font-family: sans-serif;
}

.filters button.active {
  font-weight: bold;
}

.completed {
  text-decoration: line-through;
  color: #888;
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
</style>
