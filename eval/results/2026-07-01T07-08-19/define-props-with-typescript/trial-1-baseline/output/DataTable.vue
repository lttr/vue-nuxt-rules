<template>
  <div class="data-table">
    <h2 v-if="title">{{ title }}</h2>
    <table>
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :class="{ sortable: col.sortable }"
            @click="col.sortable && toggleSort(col.key)"
          >
            {{ col.label }}
            <span v-if="col.sortable" class="sort-indicator">
              {{ sortIndicator(col.key) }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in sortedRows" :key="index">
          <td v-for="col in columns" :key="col.key">{{ row[col.key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
    // [{ key: 'name', label: 'Name', sortable: true }, ...]
  },
  rows: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
})

const sortKey = ref(null)
const sortOrder = ref(1) // 1 = ascending, -1 = descending

function toggleSort(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 1 ? -1 : 1
  } else {
    sortKey.value = key
    sortOrder.value = 1
  }
}

function sortIndicator(key) {
  if (sortKey.value !== key) return '↕'
  return sortOrder.value === 1 ? '▲' : '▼'
}

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows

  const key = sortKey.value
  const order = sortOrder.value

  return [...props.rows].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]

    if (aVal == null && bVal == null) return 0
    if (aVal == null) return 1
    if (bVal == null) return -1

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return (aVal - bVal) * order
    }

    return String(aVal).localeCompare(String(bVal)) * order
  })
})
</script>

<style scoped>
.data-table table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

.data-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.sort-indicator {
  font-size: 0.75em;
  opacity: 0.6;
  margin-left: 0.25rem;
}
</style>
