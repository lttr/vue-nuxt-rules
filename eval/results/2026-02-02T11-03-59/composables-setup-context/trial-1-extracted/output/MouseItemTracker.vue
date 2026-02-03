<script setup>
import { ref } from 'vue'
import { useMousePosition } from './useMousePosition'
import { useItemList } from './useItemList'

// Composables called at the top level of <script setup>
const { x, y } = useMousePosition()
const { items, count, addItem, removeItem } = useItemList(['Apple', 'Banana'])

const newItem = ref('')

function handleAdd() {
  const trimmed = newItem.value.trim()
  if (trimmed) {
    addItem(trimmed)
    newItem.value = ''
  }
}
</script>

<template>
  <div class="tracker">
    <section>
      <h2>Mouse Position</h2>
      <p>X: {{ x }} / Y: {{ y }}</p>
    </section>

    <section>
      <h2>Item List ({{ count }})</h2>
      <div>
        <input v-model="newItem" placeholder="New item" @keyup.enter="handleAdd" />
        <button @click="handleAdd">Add</button>
      </div>
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item }}
          <button @click="removeItem(index)">Remove</button>
        </li>
      </ul>
      <p v-if="count === 0">No items yet.</p>
    </section>
  </div>
</template>
</script>
