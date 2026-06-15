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
const sortAsc = ref(true)

function toggleSort(column: Column) {
  if (!column.sortable) return

  if (sortKey.value === column.key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = column.key
    sortAsc.value = true
  }
}

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows

  const key = sortKey.value
  const direction = sortAsc.value ? 1 : -1

  return [...props.rows].sort((a, b) => {
    const aValue = a[key]
    const bValue = b[key]

    if (aValue == null) return 1
    if (bValue == null) return -1
    if (aValue < bValue) return -1 * direction
    if (aValue > bValue) return 1 * direction
    return 0
  })
})

function ariaSort(column: Column): 'ascending' | 'descending' | 'none' | undefined {
  if (!column.sortable) return undefined
  if (sortKey.value !== column.key) return 'none'
  return sortAsc.value ? 'ascending' : 'descending'
}
</script>

<template>
  <div class="data-table">
    <h2 v-if="title" class="data-table__title">{{ title }}</h2>

    <table class="data-table__table">
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="{ 'is-sortable': column.sortable }"
            :aria-sort="ariaSort(column)"
            @click="toggleSort(column)"
          >
            <span>{{ column.label }}</span>
            <span v-if="column.sortable" class="data-table__sort-indicator">
              <template v-if="sortKey === column.key">{{ sortAsc ? '▲' : '▼' }}</template>
              <template v-else>⇅</template>
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
          <td :colspan="columns.length" class="data-table__empty">No data</td>
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

.data-table__table {
  width: 100%;
  border-collapse: collapse;
}

.data-table__table th,
.data-table__table td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
}

.data-table__table th.is-sortable {
  cursor: pointer;
  user-select: none;
}

.data-table__table th.is-sortable:hover {
  background: #f5f5f5;
}

.data-table__sort-indicator {
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
