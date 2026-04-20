<template>
  <div class="todo-list">
    <div class="input-row">
      <input
        v-model="newTodoText"
        placeholder="Add a new todo..."
        @keyup.enter="addTodo"
      />
      <button @click="addTodo">Add</button>
    </div>

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
      <li v-if="filteredTodos.length === 0" class="empty">No items to show.</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const filters = ['all', 'active', 'completed']

const todos = ref([])
const newTodoText = ref('')
const filter = ref('all')

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

const filteredTodos = computed(() => {
  if (filter.value === 'active') return todos.value.filter(t => !t.completed)
  if (filter.value === 'completed') return todos.value.filter(t => t.completed)
  return todos.value
})
</script>

<style scoped>
.todo-list {
  max-width: 480px;
  margin: 2rem auto;
  font-family: sans-serif;
}
.input-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.input-row input {
  flex: 1;
  padding: 0.4rem;
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
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0;
}
span.completed {
  text-decoration: line-through;
  color: #999;
}
.empty {
  color: #aaa;
  font-style: italic;
}
</style>
