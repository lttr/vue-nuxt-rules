<script setup>
import { ref } from 'vue'
import { useMousePosition } from '../composables/useMousePosition.js'
import { useItemList } from '../composables/useItemList.js'

const { x, y } = useMousePosition()
const { items, add, remove } = useItemList(['Buy milk', 'Write docs'])

const draft = ref('')

function submit() {
  const value = draft.value.trim()
  if (!value) return
  add(value)
  draft.value = ''
}
</script>

<template>
  <section class="tracker">
    <h2>Mouse Position</h2>
    <p>x: {{ x }}, y: {{ y }}</p>

    <h2>Items</h2>
    <form @submit.prevent="submit">
      <input v-model="draft" placeholder="Add an item" />
      <button type="submit">Add</button>
    </form>

    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
        <button type="button" @click="remove(index)">Remove</button>
      </li>
    </ul>
  </section>
</template>
