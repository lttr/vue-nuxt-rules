<script setup>
import { ref, computed } from 'vue'

let nextId = 0

const todos = ref([])
const newTodoText = ref('')
const filter = ref('all') // 'all' | 'active' | 'completed'

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
  const text = newTodoText.value.trim()
  if (!text) return
  todos.value.push({ id: nextId++, text, completed: false })
  newTodoText.value = ''
}

function toggleTodo(todo) {
  todo.completed = !todo.completed
}

function deleteTodo(id) {
  todos.value = todos.value.filter((t) => t.id !== id)
}
</script>

<template>
  <section class="todo-list">
    <h1>Todos</h1>

    <form class="add-form" @submit.prevent="addTodo">
      <input
        v-model="newTodoText"
        type="text"
        placeholder="What needs to be done?"
        aria-label="New todo"
      />
      <button type="submit">Add</button>
    </form>

    <div class="filters" role="group" aria-label="Filter todos">
      <button
        v-for="option in ['all', 'active', 'completed']"
        :key="option"
        type="button"
        :class="{ active: filter === option }"
        @click="filter = option"
      >
        {{ option }}
      </button>
    </div>

    <ul class="items">
      <li v-for="todo in filteredTodos" :key="todo.id" :class="{ completed: todo.completed }">
        <label>
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(todo)"
          />
          <span class="text">{{ todo.text }}</span>
        </label>
        <button class="delete" type="button" @click="deleteTodo(todo.id)" aria-label="Delete todo">
          &times;
        </button>
      </li>
    </ul>

    <p v-if="todos.length === 0" class="empty">No todos yet. Add one above!</p>
    <p v-else class="count">{{ remaining }} item{{ remaining === 1 ? '' : 's' }} left</p>
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
  margin-bottom: 1rem;
}

.filters button {
  text-transform: capitalize;
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

.items li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.items li label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.items li.completed .text {
  text-decoration: line-through;
  color: #999;
}

.delete {
  background: none;
  border: none;
  color: #c00;
  font-size: 1.25rem;
  cursor: pointer;
  line-height: 1;
}

.empty,
.count {
  margin-top: 1rem;
  color: #666;
}
</style>
