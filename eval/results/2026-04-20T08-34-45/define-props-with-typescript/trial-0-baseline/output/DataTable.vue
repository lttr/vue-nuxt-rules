<template>
  <div class="data-table-wrapper">
    <h2 v-if="title" class="data-table-title">{{ title }}</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :class="{ sortable: col.sortable, active: sortKey === col.key }"
            @click="col.sortable && toggleSort(col.key)"
          >
            {{ col.label }}
            <span v-if="col.sortable" class="sort-indicator">
              {{ sortKey === col.key ? (sortOrder === 'asc' ? '▲' : '▼') : '⇅' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in sortedRows" :key="idx">
          <td v-for="col in columns" :key="col.key">{{ row[col.key] }}</td>
        </tr>
        <tr v-if="sortedRows.length === 0">
          <td :colspan="columns.length" class="empty">No data</td>
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
    // Each item: { key: string, label: string, sortable?: boolean }
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

function toggleSort(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows

  return [...props.rows].sort((a, b) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]

    if (aVal == null && bVal == null) return 0
    if (aVal == null) return 1
    if (bVal == null) return -1

    const result = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
    return sortOrder.value === 'asc' ? result : -result
  })
})
</script>

<style scoped>
.data-table-wrapper {
  overflow-x: auto;
}

.data-table-title {
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}

.data-table th,
.data-table td {
  padding: 0.6rem 1rem;
  border: 1px solid #d1d5db;
  text-align: left;
}

.data-table thead tr {
  background-color: #f3f4f6;
}

.data-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.data-table th.sortable:hover {
  background-color: #e5e7eb;
}

.data-table th.active {
  background-color: #dbeafe;
}

.sort-indicator {
  margin-left: 0.4rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.data-table tbody tr:nth-child(even) {
  background-color: #f9fafb;
}

.data-table tbody tr:hover {
  background-color: #eff6ff;
}

.empty {
  text-align: center;
  color: #9ca3af;
  padding: 1.5rem;
}
</style>
