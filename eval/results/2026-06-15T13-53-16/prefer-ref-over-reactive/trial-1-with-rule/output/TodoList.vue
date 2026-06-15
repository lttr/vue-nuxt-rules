<script setup>
import { ref, computed } from 'vue'

// PREFER ref() over reactive() for state
const todos = ref([])
const newTodoText = ref('')
const filter = ref('all') // 'all' | 'active' | 'completed'

let nextId = 0

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
  switch (filter.value) {
    case 'active':
      return todos.value.filter((t) => !t.completed)
    case 'completed':
      return todos.value.filter((t) => t.completed)
    default:
      return todos.value
  }
})
</script>

<template>
  <div class="todo-list">
    <h1>Todos</h1>

    <form class="add-todo" @submit.prevent="addTodo">
      <input
        v-model="newTodoText"
        type="text"
        placeholder="What needs to be done?"
      />
      <button type="submit">Add</button>
    </form>

    <div class="filters">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">
        All
      </button>
      <button :class="{ active: filter === 'active' }" @click="filter = 'active'">
        Active
      </button>
      <button
        :class="{ active: filter === 'completed' }"
        @click="filter = 'completed'"
      >
        Completed
      </button>
    </div>

    <ul class="items">
      <li v-for="todo in filteredTodos" :key="todo.id" class="item">
        <label>
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(todo.id)"
          />
          <span :class="{ completed: todo.completed }">{{ todo.text }}</span>
        </label>
        <button class="delete" @click="deleteTodo(todo.id)">×</button>
      </li>
      <li v-if="filteredTodos.length === 0" class="empty">No todos</li>
    </ul>
  </div>
</template>

<style scoped>
.todo-list {
  max-width: 400px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
}

.add-todo {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-todo input {
  flex: 1;
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filters .active {
  font-weight: bold;
}

.items {
  list-style: none;
  padding: 0;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 0;
}

.item .completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.delete {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.empty {
  color: #888;
  text-align: center;
}
</style>
