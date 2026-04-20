<!-- TodoList.vue -->
<script setup lang="ts">
import { ref } from 'vue'

interface Todo {
  id: number
  text: string
  done: boolean
}

const items = ref<Todo[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const newText = ref('')
let nextId = 1

function addTodo() {
  const text = newText.value.trim()
  if (!text) return
  items.value.push({ id: nextId++, text, done: false })
  newText.value = ''
}

function toggleTodo(id: number) {
  const todo = items.value.find(t => t.id === id)
  if (todo) todo.done = !todo.done
}

function removeTodo(id: number) {
  items.value = items.value.filter(t => t.id !== id)
}
</script>

<template>
  <div class="todo-list">
    <p v-if="error" class="error">{{ error }}</p>

    <form @submit.prevent="addTodo">
      <input v-model="newText" placeholder="Add a todo..." :disabled="loading" />
      <button type="submit" :disabled="loading || !newText.trim()">Add</button>
    </form>

    <p v-if="loading">Loading...</p>
    <ul v-else>
      <li v-for="todo in items" :key="todo.id" :class="{ done: todo.done }">
        <input type="checkbox" :checked="todo.done" @change="toggleTodo(todo.id)" />
        <span>{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">Remove</button>
      </li>
      <li v-if="!items.length" class="empty">No todos yet.</li>
    </ul>
  </div>
</template>

<style scoped>
.todo-list { max-width: 400px; }
form { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
input[type="text"], input:not([type]) { flex: 1; padding: 0.25rem 0.5rem; }
ul { list-style: none; padding: 0; margin: 0; }
li { display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0; }
li.done span { text-decoration: line-through; opacity: 0.5; }
li.empty { opacity: 0.5; font-style: italic; }
.error { color: red; }
</style>
