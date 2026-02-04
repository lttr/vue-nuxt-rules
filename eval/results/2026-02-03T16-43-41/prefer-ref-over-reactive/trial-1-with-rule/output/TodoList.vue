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
  </div>
</template>

<style scoped>
.todo-list {
  max-width: 400px;
  margin: 0 auto;
}

.add-todo {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.add-todo input {
  flex: 1;
  padding: 8px;
}

.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.filters button.active {
  font-weight: bold;
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

.todos li.completed span {
  text-decoration: line-through;
  opacity: 0.6;
}

.todos li span {
  flex: 1;
}
</style>
