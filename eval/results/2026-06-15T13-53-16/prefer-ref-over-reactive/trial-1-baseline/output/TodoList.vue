<script setup>
import { ref, computed } from 'vue'

const todos = ref([])
const newTodo = ref('')
const filter = ref('all') // 'all' | 'active' | 'completed'

let nextId = 0

function addTodo() {
  const text = newTodo.value.trim()
  if (!text) return
  todos.value.push({ id: nextId++, text, completed: false })
  newTodo.value = ''
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

const remaining = computed(() => todos.value.filter((t) => !t.completed).length)
</script>

<template>
  <div class="todo-list">
    <h1>Todos</h1>

    <form class="add-form" @submit.prevent="addTodo">
      <input
        v-model="newTodo"
        class="new-todo"
        placeholder="What needs to be done?"
        aria-label="New todo"
      />
      <button type="submit">Add</button>
    </form>

    <div class="filters">
      <button :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
      <button :class="{ active: filter === 'active' }" @click="filter = 'active'">Active</button>
      <button :class="{ active: filter === 'completed' }" @click="filter = 'completed'">
        Completed
      </button>
    </div>

    <ul class="todos">
      <li v-for="todo in filteredTodos" :key="todo.id" class="todo">
        <label :class="{ completed: todo.completed }">
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(todo.id)"
          />
          <span class="text">{{ todo.text }}</span>
        </label>
        <button class="delete" @click="deleteTodo(todo.id)" aria-label="Delete todo">
          &times;
        </button>
      </li>
    </ul>

    <p v-if="todos.length === 0" class="empty">No todos yet.</p>
    <p v-else class="count">{{ remaining }} item{{ remaining === 1 ? '' : 's' }} left</p>
  </div>
</template>

<style scoped>
.todo-list {
  max-width: 420px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
}

.add-form {
  display: flex;
  gap: 0.5rem;
}

.new-todo {
  flex: 1;
  padding: 0.5rem;
}

.filters {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0;
}

.filters .active {
  font-weight: bold;
  text-decoration: underline;
}

.todos {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.todo label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.todo label.completed .text {
  text-decoration: line-through;
  color: #999;
}

.delete {
  background: none;
  border: none;
  color: #c00;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
}

.empty,
.count {
  margin-top: 1rem;
  color: #666;
}
</style>
