<script setup>
import { ref } from 'vue'
import { useMousePosition } from '../composables/useMousePosition.js'
import { useItemList } from '../composables/useItemList.js'

// Composables are called at the top level of <script setup> — never in
// callbacks, utils, or async contexts.
const { x, y } = useMousePosition()
const { items, add, remove, clear, count } = useItemList(['First item', 'Second item'])

const draft = ref('')

function onAdd() {
  add(draft.value)
  draft.value = ''
}
</script>

<template>
  <section class="dashboard">
    <h2>Mouse position</h2>
    <p>x: {{ x }}, y: {{ y }}</p>

    <h2>Items ({{ count }})</h2>
    <form @submit.prevent="onAdd">
      <input v-model="draft" placeholder="Add an item" />
      <button type="submit">Add</button>
      <button type="button" @click="clear" :disabled="count === 0">Clear</button>
    </form>

    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item }}
        <button type="button" @click="remove(index)">Remove</button>
      </li>
    </ul>
  </section>
</template>
