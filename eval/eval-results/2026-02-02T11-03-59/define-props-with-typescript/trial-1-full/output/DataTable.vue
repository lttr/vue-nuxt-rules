<script setup lang="ts">
import { ref, computed } from 'vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

const props = defineProps<{
  columns: Column[]
  rows: Record<string, unknown>[]
  title?: string
}>()

const sortKey = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc'>('asc')

function toggleSort(column: Column) {
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
    const valA = a[sortKey.value!]
    const valB = b[sortKey.value!]

    if (valA == null && valB == null) return 0
    if (valA == null) return 1
    if (valB == null) return -1

    const result = valA < valB ? -1 : valA > valB ? 1 : 0
    return sortOrder.value === 'asc' ? result : -result
  })
})

function sortIndicator(column: Column): string {
  if (!column.sortable || sortKey.value !== column.key) return ''
  return sortOrder.value === 'asc' ? ' ▲' : ' ▼'
}
</script>

<template>
  <div class="data-table">
    <h2 v-if="title">{{ title }}</h2>
    <table>
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :class="{ sortable: col.sortable, active: sortKey === col.key }"
            @click="toggleSort(col)"
          >
            {{ col.label }}{{ sortIndicator(col) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in sortedRows" :key="index">
          <td v-for="col in columns" :key="col.key">
            {{ row[col.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

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

.data-table th {
  background-color: #f5f5f5;
  font-weight: 600;
  user-select: none;
}

.data-table th.sortable {
  cursor: pointer;
}

.data-table th.sortable:hover {
  background-color: #e8e8e8;
}

.data-table th.active {
  background-color: #e0e0e0;
}

.data-table tbody tr:hover {
  background-color: #fafafa;
}
</style>
