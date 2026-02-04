<script setup lang="ts">
import { ref, computed } from 'vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface Props {
  columns: Column[]
  rows: Record<string, unknown>[]
  title?: string
}

const props = defineProps<Props>()

const sortKey = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc'>('asc')

const sortedRows = computed(() => {
  if (!sortKey.value) {
    return props.rows
  }

  return [...props.rows].sort((a, b) => {
    const aVal = a[sortKey.value!]
    const bVal = b[sortKey.value!]

    if (aVal === bVal) return 0

    let comparison = 0
    if (aVal == null) comparison = 1
    else if (bVal == null) comparison = -1
    else if (aVal < bVal) comparison = -1
    else if (aVal > bVal) comparison = 1

    return sortOrder.value === 'asc' ? comparison : -comparison
  })
})

function handleSort(column: Column) {
  if (!column.sortable) return

  if (sortKey.value === column.key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = column.key
    sortOrder.value = 'asc'
  }
}
</script>

<template>
  <div class="data-table">
    <h2 v-if="title">{{ title }}</h2>
    <table>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="{ sortable: column.sortable, sorted: sortKey === column.key }"
            @click="handleSort(column)"
          >
            {{ column.label }}
            <span v-if="column.sortable" class="sort-indicator">
              <span v-if="sortKey === column.key">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
              <span v-else class="sort-placeholder">⇅</span>
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

<style scoped>
.data-table {
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f5f5f5;
  font-weight: 600;
}

th.sortable {
  cursor: pointer;
  user-select: none;
}

th.sortable:hover {
  background-color: #e8e8e8;
}

th.sorted {
  background-color: #e0e0e0;
}

.sort-indicator {
  margin-left: 0.5rem;
}

.sort-placeholder {
  opacity: 0.3;
}

tbody tr:hover {
  background-color: #f9f9f9;
}
</style>
