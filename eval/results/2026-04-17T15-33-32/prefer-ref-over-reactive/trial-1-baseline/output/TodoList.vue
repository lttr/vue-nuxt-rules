<script setup>
import { ref, computed } from 'vue'

const todos = ref([])
const newTodoText = ref('')
const filter = ref('all')

let nextId = 1

const filteredTodos = computed(() => {
  if (filter.value === 'active') {
    return todos.value.filter(t => !t.completed)
  }
  if (filter.value === 'completed') {
    return todos.value.filter(t => t.completed)
  }
  return todos.value
})

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
    <h2>Todo List</h2>

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

    <ul class="todos">
      <li v-for="todo in filteredTodos" :key="todo.id">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
        />
        <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        <button class="delete" @click="deleteTodo(todo.id)">Delete</button>
      </li>
      <li v-if="filteredTodos.length === 0" class="empty">
        No todos to show.
      </li>
    </ul>
  </div>
</template>

<style scoped>
.todo-list {
  max-width: 480px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
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

.filters .active {
  font-weight: bold;
}

.todos {
  list-style: none;
  padding: 0;
}

.todos li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.todos li span {
  flex: 1;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.delete {
  color: #c33;
}

.empty {
  color: #888;
  justify-content: center;
}
</style>
