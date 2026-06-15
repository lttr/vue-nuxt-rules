<script setup lang="ts">
import { ref, computed } from 'vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

type Row = Record<string, unknown>

const props = defineProps<{
  columns: Column[]
  rows: Row[]
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

  const key = sortKey.value
  const order = sortOrder.value

  return [...props.rows].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]

    if (aVal == null) return 1
    if (bVal == null) return -1
    if (aVal === bVal) return 0

    const result = aVal < bVal ? -1 : 1
    return order === 'asc' ? result : -result
  })
})

function ariaSort(column: Column): 'ascending' | 'descending' | 'none' {
  if (sortKey.value !== column.key) return 'none'
  return sortOrder.value === 'asc' ? 'ascending' : 'descending'
}
</script>

<template>
  <div class="data-table">
    <h2 v-if="title" class="data-table__title">{{ title }}</h2>

    <table>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="{ sortable: column.sortable, active: sortKey === column.key }"
            :aria-sort="ariaSort(column)"
            @click="toggleSort(column)"
          >
            <span>{{ column.label }}</span>
            <span v-if="column.sortable" class="sort-indicator">
              <template v-if="sortKey === column.key">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </template>
              <template v-else>↕</template>
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
        <tr v-if="sortedRows.length === 0">
          <td :colspan="columns.length" class="data-table__empty">
            No data available
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.data-table__title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.5rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e2e2e2;
}

th.sortable {
  cursor: pointer;
  user-select: none;
}

th.sortable:hover {
  background: #f5f5f5;
}

th.active {
  font-weight: 700;
}

.sort-indicator {
  margin-left: 0.35rem;
  font-size: 0.75em;
  opacity: 0.7;
}

.data-table__empty {
  text-align: center;
  color: #888;
  font-style: italic;
}
</style>
