<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
    // Each column: { key: string, label: string, sortable?: boolean }
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
const sortOrder = ref('asc')

function handleSort(column) {
  if (!column.sortable) return

  if (sortKey.value === column.key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = column.key
    sortOrder.value = 'asc'
  }
}

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows

  return [...props.rows].sort((a, b) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]

    if (aVal == null) return 1
    if (bVal == null) return -1

    let comparison = 0
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      comparison = aVal - bVal
    } else {
      comparison = String(aVal).localeCompare(String(bVal))
    }

    return sortOrder.value === 'asc' ? comparison : -comparison
  })
})

function getSortIndicator(column) {
  if (!column.sortable) return ''
  if (sortKey.value !== column.key) return ' ↕'
  return sortOrder.value === 'asc' ? ' ↑' : ' ↓'
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

th,
td {
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
  background-color: #fafafa;
}
</style>
