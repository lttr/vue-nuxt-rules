<script setup>
import { ref, computed } from 'vue'

const todos = ref([])
const newTodoText = ref('')
const filter = ref('all')

const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter(todo => !todo.completed)
    case 'completed':
      return todos.value.filter(todo => todo.completed)
    default:
      return todos.value
  }
})

function addTodo() {
  const text = newTodoText.value.trim()
  if (!text) return
  todos.value.push({
    id: Date.now(),
    text,
    completed: false
  })
  newTodoText.value = ''
}

function toggleTodo(id) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

function deleteTodo(id) {
  const index = todos.value.findIndex(t => t.id === id)
  if (index !== -1) {
    todos.value.splice(index, 1)
  }
}
</script>

<template>
  <div class="todo-list">
    <div class="add-todo">
      <input
        v-model="newTodoText"
        @keyup.enter="addTodo"
        placeholder="Add a new todo"
        type="text"
      />
      <button @click="addTodo">Add</button>
    </div>

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
      <li v-for="todo in filteredTodos" :key="todo.id" :class="{ completed: todo.completed }">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
        />
        <span>{{ todo.text }}</span>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>

    <p v-if="filteredTodos.length === 0" class="empty-message">
      No todos to display
    </p>
  </div>
</template>

<style scoped>
.todo-list {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
}

.add-todo {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-todo input {
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
  background-color: #007bff;
  color: white;
}

.todos {
  list-style: none;
  padding: 0;
}

.todos li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.todos li.completed span {
  text-decoration: line-through;
  color: #888;
}

.todos li span {
  flex: 1;
}

.empty-message {
  text-align: center;
  color: #888;
}
</style>
