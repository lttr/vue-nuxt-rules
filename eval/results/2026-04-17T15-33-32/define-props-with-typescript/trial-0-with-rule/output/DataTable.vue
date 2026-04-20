<script setup lang="ts">
import { computed, ref } from 'vue'

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
const sortDir = ref<'asc' | 'desc'>('asc')

function toggleSort(column: Column) {
  if (!column.sortable) return
  if (sortKey.value === column.key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = column.key
    sortDir.value = 'asc'
  }
}

const sortedRows = computed<Row[]>(() => {
  if (!sortKey.value) return props.rows
  const key = sortKey.value
  const dir = sortDir.value === 'asc' ? 1 : -1
  return [...props.rows].sort((a, b) => {
    const av = a[key]
    const bv = b[key]
    if (av == null && bv == null) return 0
    if (av == null) return -1 * dir
    if (bv == null) return 1 * dir
    if (typeof av === 'number' && typeof bv === 'number') {
      return (av - bv) * dir
    }
    return String(av).localeCompare(String(bv)) * dir
  })
})

function ariaSort(column: Column): 'ascending' | 'descending' | 'none' {
  if (sortKey.value !== column.key) return 'none'
  return sortDir.value === 'asc' ? 'ascending' : 'descending'
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
            :aria-sort="ariaSort(column)"
            :class="{ sortable: column.sortable, active: sortKey === column.key }"
            @click="toggleSort(column)"
          >
            {{ column.label }}
            <span v-if="column.sortable" class="sort-indicator">
              <template v-if="sortKey === column.key">
                {{ sortDir === 'asc' ? '▲' : '▼' }}
              </template>
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
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.data-table {
  font-family: system-ui, sans-serif;
}
.data-table__title {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  border: 1px solid #ddd;
  padding: 0.5rem 0.75rem;
  text-align: left;
}
th {
  background: #f5f5f5;
  user-select: none;
}
th.sortable {
  cursor: pointer;
}
th.sortable:hover {
  background: #ececec;
}
th.active {
  background: #e4e9f2;
}
.sort-indicator {
  margin-left: 0.25rem;
  font-size: 0.75rem;
  opacity: 0.7;
}
</style>
