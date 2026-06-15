<script setup>
import { ref } from 'vue'
import { useMouse } from '../composables/useMouse'
import { useItemList } from '../composables/useItemList'

// Composable 1: live mouse position.
const { x, y } = useMouse()

// Composable 2: a managed list of items.
const { items, add, remove, clear } = useItemList(['First item', 'Second item'])

const draft = ref('')

function submit() {
  add(draft.value)
  draft.value = ''
}
</script>

<template>
  <section class="demo">
    <h2>Mouse position</h2>
    <p class="coords">x: {{ x }} — y: {{ y }}</p>

    <h2>Items ({{ items.length }})</h2>
    <form class="add-row" @submit.prevent="submit">
      <input v-model="draft" placeholder="Add an item…" />
      <button type="submit">Add</button>
      <button type="button" @click="clear" :disabled="!items.length">Clear</button>
    </form>

    <ul>
      <li v-for="(item, index) in items" :key="index">
        <span>{{ item }}</span>
        <button type="button" @click="remove(index)">✕</button>
      </li>
      <li v-if="!items.length" class="empty">No items yet.</li>
    </ul>
  </section>
</template>

<style scoped>
.demo {
  font-family: system-ui, sans-serif;
  max-width: 360px;
}
.coords {
  font-variant-numeric: tabular-nums;
}
.add-row {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
}
.empty {
  color: #888;
}
</style>
