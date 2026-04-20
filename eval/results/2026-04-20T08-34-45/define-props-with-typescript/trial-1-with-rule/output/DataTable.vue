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
            @click="col.sortable ? toggleSort(col.key) : undefined"
          >
            {{ col.label }}
            <span v-if="col.sortable" class="sort-indicator">
              {{ sortKey === col.key ? (sortDir === 'asc' ? '▲' : '▼') : '⇅' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in sortedRows" :key="i">
          <td v-for="col in columns" :key="col.key">{{ row[col.key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type SortDir = 'asc' | 'desc'

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
const sortDir = ref<SortDir>('asc')

function toggleSort(key: string) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows
  const key = sortKey.value
  return [...props.rows].sort((a, b) => {
    const av = a[key]
    const bv = b[key]
    if (av == null && bv == null) return 0
    if (av == null) return 1
    if (bv == null) return -1
    const result = av < bv ? -1 : av > bv ? 1 : 0
    return sortDir.value === 'asc' ? result : -result
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
}

.data-table th,
.data-table td {
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  text-align: left;
}

.data-table th {
  background: #f8fafc;
  font-weight: 600;
  user-select: none;
}

.data-table th.sortable {
  cursor: pointer;
}

.data-table th.sortable:hover {
  background: #edf2f7;
}

.data-table th.active {
  background: #e2e8f0;
}

.sort-indicator {
  margin-left: 0.4rem;
  font-size: 0.75rem;
  opacity: 0.6;
}

.data-table tbody tr:nth-child(even) {
  background: #f8fafc;
}

.data-table tbody tr:hover {
  background: #edf2f7;
}
</style>
