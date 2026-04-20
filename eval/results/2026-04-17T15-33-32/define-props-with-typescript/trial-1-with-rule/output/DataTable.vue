<script setup lang="ts">
import { ref, computed } from 'vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

type Row = Record<string, unknown>

type SortDirection = 'asc' | 'desc'

const props = defineProps<{
  columns: Column[]
  rows: Row[]
  title?: string
}>()

const sortKey = ref<string | null>(null)
const sortDirection = ref<SortDirection>('asc')

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows
  const key = sortKey.value
  const dir = sortDirection.value === 'asc' ? 1 : -1
  return [...props.rows].sort((a, b) => {
    const av = a[key]
    const bv = b[key]
    if (av == null && bv == null) return 0
    if (av == null) return -1 * dir
    if (bv == null) return 1 * dir
    if (av < bv) return -1 * dir
    if (av > bv) return 1 * dir
    return 0
  })
})

function toggleSort(column: Column) {
  if (!column.sortable) return
  if (sortKey.value === column.key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = column.key
    sortDirection.value = 'asc'
  }
}

function sortIndicator(column: Column) {
  if (sortKey.value !== column.key) return ''
  return sortDirection.value === 'asc' ? ' ▲' : ' ▼'
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
            :class="{ sortable: column.sortable }"
            :aria-sort="
              sortKey === column.key
                ? sortDirection === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none'
            "
            @click="toggleSort(column)"
          >
            {{ column.label }}{{ sortIndicator(column) }}
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
.data-table__title {
  margin-bottom: 0.5rem;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}
th.sortable {
  cursor: pointer;
  user-select: none;
}
th.sortable:hover {
  background-color: #f3f4f6;
}
</style>
