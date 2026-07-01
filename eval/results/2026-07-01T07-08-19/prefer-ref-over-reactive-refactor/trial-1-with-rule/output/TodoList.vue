<!-- TodoList.vue -->
<script setup lang="ts">
import { ref } from 'vue'

interface TodoItem {
  id: number
  text: string
  done: boolean
}

const items = ref<TodoItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
</script>

<template>
  <div class="todo-list">
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <ul v-else>
      <li v-for="item in items" :key="item.id">
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>
