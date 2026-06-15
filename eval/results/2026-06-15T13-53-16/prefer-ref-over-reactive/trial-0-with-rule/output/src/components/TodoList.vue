<script setup>
import { ref, computed } from 'vue'

// State — using ref() per project convention
const todos = ref([])
const newTodo = ref('')
const filter = ref('all') // 'all' | 'active' | 'completed'

let nextId = 1

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

function setFilter(value) {
  filter.value = value
}
</script>

<template>
  <section class="todo-list">
    <h1>Todos</h1>

    <form class="add-form" @submit.prevent="addTodo">
      <input
        v-model="newTodo"
        type="text"
        placeholder="What needs to be done?"
        aria-label="New todo"
      />
      <button type="submit">Add</button>
    </form>

    <ul class="filters">
      <li>
        <button :class="{ active: filter === 'all' }" @click="setFilter('all')">
          All
        </button>
      </li>
      <li>
        <button :class="{ active: filter === 'active' }" @click="setFilter('active')">
          Active
        </button>
      </li>
      <li>
        <button
          :class="{ active: filter === 'completed' }"
          @click="setFilter('completed')"
        >
          Completed
        </button>
      </li>
    </ul>

    <ul class="items">
      <li v-for="todo in filteredTodos" :key="todo.id" class="item">
        <label :class="{ done: todo.completed }">
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(todo.id)"
          />
          <span>{{ todo.text }}</span>
        </label>
        <button class="delete" @click="deleteTodo(todo.id)" aria-label="Delete todo">
          ✕
        </button>
      </li>
      <li v-if="filteredTodos.length === 0" class="empty">No todos here.</li>
    </ul>

    <p class="count">{{ remaining }} item(s) left</p>
  </section>
</template>

<style scoped>
.todo-list {
  max-width: 480px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
}

.add-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-form input {
  flex: 1;
  padding: 0.5rem;
}

.filters {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
}

.filters button.active {
  font-weight: bold;
  text-decoration: underline;
}

.items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 0;
  border-bottom: 1px solid #eee;
}

.item label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.item label.done span {
  text-decoration: line-through;
  color: #999;
}

.delete {
  background: none;
  border: none;
  cursor: pointer;
  color: #c00;
}

.empty {
  color: #999;
  padding: 0.4rem 0;
}

.count {
  margin-top: 1rem;
  color: #666;
  font-size: 0.9rem;
}
</style>
