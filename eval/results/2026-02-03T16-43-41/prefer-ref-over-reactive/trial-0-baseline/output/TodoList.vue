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
  if (text) {
    todos.value.push({
      id: Date.now(),
      text,
      completed: false
    })
    newTodoText.value = ''
  }
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
        placeholder="Add a new todo..."
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
        <button @click="deleteTodo(todo.id)" class="delete">Delete</button>
      </li>
    </ul>

    <p v-if="filteredTodos.length === 0" class="empty">No todos to display</p>
  </div>
</template>

<style scoped>
.todo-list {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.add-todo {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-todo input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-todo button {
  padding: 8px 16px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.filters button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.filters button.active {
  background: #42b883;
  color: white;
  border-color: #42b883;
}

.todos {
  list-style: none;
  padding: 0;
}

.todos li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.todos li.completed span {
  text-decoration: line-through;
  color: #999;
}

.todos li span {
  flex: 1;
}

.delete {
  padding: 4px 8px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.empty {
  text-align: center;
  color: #999;
}
</style>
