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

    if (aVal == null && bVal == null) return 0
    if (aVal == null) return sortOrder.value === 'asc' ? 1 : -1
    if (bVal == null) return sortOrder.value === 'asc' ? -1 : 1

    if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1
    return 0
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

function getSortIndicator(column: Column): string {
  if (!column.sortable) return ''
  if (sortKey.value !== column.key) return ' \u2195'
  return sortOrder.value === 'asc' ? ' \u2191' : ' \u2193'
}
</script>

<template>
  <div class="data-table">
    <h2 v-if="title" class="data-table-title">{{ title }}</h2>
    <table>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="{ sortable: column.sortable, active: sortKey === column.key }"
            @click="handleSort(column)"
          >
            {{ column.label }}{{ getSortIndicator(column) }}
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

.data-table-title {
  margin-bottom: 1rem;
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

th.active {
  background-color: #e0e0e0;
}

tbody tr:hover {
  background-color: #f9f9f9;
}
</style>
