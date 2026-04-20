<script setup>
import { ref } from 'vue'
import { useMouse } from './useMouse.js'
import { useItems } from './useItems.js'

const { x, y } = useMouse()
const { items, addItem, removeItem, clear } = useItems(['apple', 'banana'])

const draft = ref('')

function submit() {
  addItem(draft.value.trim())
  draft.value = ''
}
</script>

<template>
  <section class="demo">
    <h2>Mouse position</h2>
    <p>x: {{ x }}, y: {{ y }}</p>

    <h2>Items ({{ items.length }})</h2>
    <form @submit.prevent="submit">
      <input v-model="draft" placeholder="New item" />
      <button type="submit">Add</button>
      <button type="button" @click="clear">Clear</button>
    </form>

    <ul>
      <li v-for="(item, i) in items" :key="i">
        {{ item }}
        <button @click="removeItem(i)">x</button>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.demo { font-family: sans-serif; padding: 1rem; }
ul { padding-left: 1.25rem; }
button { margin-left: 0.25rem; }
</style>
