<template>
  <div class="data-table">
    <h2 v-if="title">{{ title }}</h2>
    <table>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="{ sortable: column.sortable }"
            @click="column.sortable && toggleSort(column.key)"
          >
            {{ column.label }}
            <span v-if="column.sortable" class="sort-indicator">
              {{ sortIndicator(column.key) }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in sortedRows" :key="index">
          <td v-for="column in columns" :key="column.key">
            {{ row[column.key] }}
          </td>
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
const sortDirection = ref('asc')

function toggleSort(key) {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'asc'
  }
}

function sortIndicator(key) {
  if (sortKey.value !== key) return '⇅'
  return sortDirection.value === 'asc' ? '▲' : '▼'
}

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows

  const key = sortKey.value
  const direction = sortDirection.value === 'asc' ? 1 : -1

  return [...props.rows].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]

    if (aVal == null && bVal == null) return 0
    if (aVal == null) return -1 * direction
    if (bVal == null) return 1 * direction

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return (aVal - bVal) * direction
    }

    return String(aVal).localeCompare(String(bVal)) * direction
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
  padding: 8px 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.data-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.sort-indicator {
  margin-left: 4px;
  font-size: 0.75em;
  opacity: 0.7;
}
</style>
