<!-- TodoList.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'

interface TodoItem {
  id: number
  text: string
  done: boolean
}

const items = ref<TodoItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const newText = ref('')
let nextId = 1

const pending = computed(() => items.value.filter(i => !i.done))
const completed = computed(() => items.value.filter(i => i.done))

function addItem() {
  const text = newText.value.trim()
  if (!text) return
  items.value.push({ id: nextId++, text, done: false })
  newText.value = ''
}

function toggleItem(id: number) {
  const item = items.value.find(i => i.id === id)
  if (item) item.done = !item.done
}

function removeItem(id: number) {
  items.value = items.value.filter(i => i.id !== id)
}

function clearCompleted() {
  items.value = items.value.filter(i => !i.done)
}
</script>

<template>
  <div class="todo-list">
    <p v-if="error" class="error">{{ error }}</p>

    <form @submit.prevent="addItem" class="add-form">
      <input
        v-model="newText"
        placeholder="Add a task…"
        :disabled="loading"
        aria-label="New task"
      />
      <button type="submit" :disabled="loading || !newText.trim()">Add</button>
    </form>

    <p v-if="loading">Loading…</p>

    <ul v-else-if="items.length">
      <li v-for="item in items" :key="item.id" :class="{ done: item.done }">
        <input
          type="checkbox"
          :checked="item.done"
          @change="toggleItem(item.id)"
          :aria-label="`Mark '${item.text}' as ${item.done ? 'pending' : 'done'}`"
        />
        <span>{{ item.text }}</span>
        <button @click="removeItem(item.id)" aria-label="Remove">×</button>
      </li>
    </ul>

    <p v-else class="empty">No tasks yet.</p>

    <footer v-if="items.length">
      <span>{{ pending.length }} remaining</span>
      <button v-if="completed.length" @click="clearCompleted">
        Clear completed ({{ completed.length }})
      </button>
    </footer>
  </div>
</template>

<style scoped>
.todo-list { max-width: 480px; margin: 0 auto; font-family: sans-serif; }
.add-form { display: flex; gap: 8px; margin-bottom: 16px; }
.add-form input { flex: 1; padding: 6px 10px; border: 1px solid #ccc; border-radius: 4px; }
.add-form button { padding: 6px 14px; cursor: pointer; }
ul { list-style: none; padding: 0; margin: 0; }
li { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid #eee; }
li.done span { text-decoration: line-through; color: #999; }
li span { flex: 1; }
li button { background: none; border: none; cursor: pointer; color: #c00; font-size: 1.2rem; }
footer { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; font-size: 0.9em; color: #666; }
.error { color: #c00; }
.empty { color: #999; }
</style>
