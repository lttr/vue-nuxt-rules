<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
    validator: (cols) =>
      cols.every(
        (c) =>
          typeof c.key === 'string' &&
          typeof c.label === 'string' &&
          (c.sortable === undefined || typeof c.sortable === 'boolean'),
      ),
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
const sortDir = ref('asc')

function toggleSort(col) {
  if (!col.sortable) return
  if (sortKey.value === col.key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = col.key
    sortDir.value = 'asc'
  }
}

function ariaSortFor(col) {
  if (sortKey.value !== col.key) return 'none'
  return sortDir.value === 'asc' ? 'ascending' : 'descending'
}

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows
  const key = sortKey.value
  const dir = sortDir.value === 'asc' ? 1 : -1
  return [...props.rows].sort((a, b) => {
    const av = a[key]
    const bv = b[key]
    if (av == null && bv == null) return 0
    if (av == null) return 1
    if (bv == null) return -1
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir
    return String(av).localeCompare(String(bv)) * dir
  })
})
</script>

<template>
  <div class="data-table">
    <h2 v-if="title" class="data-table__title">{{ title }}</h2>
    <table>
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :aria-sort="ariaSortFor(col)"
            :class="{ sortable: col.sortable, active: sortKey === col.key }"
            @click="toggleSort(col)"
          >
            {{ col.label }}
            <span v-if="col.sortable" class="sort-indicator">
              <template v-if="sortKey === col.key">
                {{ sortDir === 'asc' ? '▲' : '▼' }}
              </template>
              <template v-else>⇅</template>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in sortedRows" :key="i">
          <td v-for="col in columns" :key="col.key">{{ row[col.key] }}</td>
        </tr>
        <tr v-if="!sortedRows.length">
          <td :colspan="columns.length" class="empty">No data</td>
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
  background: #f3f4f6;
}
th.active {
  color: #2563eb;
}
.sort-indicator {
  margin-left: 0.25rem;
  font-size: 0.75em;
  opacity: 0.7;
}
.empty {
  text-align: center;
  color: #6b7280;
  padding: 1rem;
}
</style>
