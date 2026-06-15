<script setup>
import { ref } from 'vue'
import { useMouse } from '../composables/useMouse'
import { useItemList } from '../composables/useItemList'

// Composables are invoked here at the top of <script setup>,
// per project rule — never inside callbacks or async contexts.
const { x, y } = useMouse()
const { items, count, add, remove, clear } = useItemList(['First item', 'Second item'])

const draft = ref('')

function onAdd() {
  add(draft.value)
  draft.value = ''
}
</script>

<template>
  <section class="mouse-and-list">
    <div class="mouse">
      <h2>Mouse position</h2>
      <p>x: {{ x }} &nbsp; y: {{ y }}</p>
    </div>

    <div class="list">
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
      <p v-if="count === 0">No items yet.</p>
    </div>
  </section>
</template>

<style scoped>
.mouse-and-list {
  display: grid;
  gap: 1.5rem;
  font-family: system-ui, sans-serif;
}
.list form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
.list li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.25rem 0;
}
</style>
