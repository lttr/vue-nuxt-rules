<script setup lang="ts" generic="T extends Record<string, unknown>">
import { computed, ref } from 'vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

const props = defineProps<{
  columns: Column[]
  rows: T[]
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

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows
  const key = sortKey.value
  const dir = sortDir.value === 'asc' ? 1 : -1
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

function ariaSort(column: Column): 'ascending' | 'descending' | 'none' | undefined {
  if (!column.sortable) return undefined
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
th.active {
  color: #2563eb;
}
.sort-indicator {
  margin-left: 0.25rem;
  font-size: 0.75em;
  opacity: 0.6;
}
</style>
