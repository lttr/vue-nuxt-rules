<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  // [{ key: string, label: string, sortable?: boolean }]
  columns: {
    type: Array,
    required: true,
  },
  // [{ [key]: any }]
  rows: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
})

const sortKey = ref('')
const sortOrder = ref('asc') // 'asc' | 'desc'

function toggleSort(column) {
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
  const factor = sortOrder.value === 'asc' ? 1 : -1

  return [...props.rows].sort((a, b) => {
    const av = a[key]
    const bv = b[key]

    if (av == null && bv == null) return 0
    if (av == null) return 1
    if (bv == null) return -1

    if (typeof av === 'number' && typeof bv === 'number') {
      return (av - bv) * factor
    }

    return String(av).localeCompare(String(bv)) * factor
  })
})

function ariaSort(column) {
  if (sortKey.value !== column.key) return 'none'
  return sortOrder.value === 'asc' ? 'ascending' : 'descending'
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
            :class="{
              'is-sortable': column.sortable,
              'is-active': sortKey === column.key,
            }"
            :aria-sort="ariaSort(column)"
            scope="col"
            @click="toggleSort(column)"
          >
            <span class="data-table__header">
              {{ column.label }}
              <span v-if="column.sortable" class="data-table__indicator">
                <template v-if="sortKey === column.key">
                  {{ sortOrder === 'asc' ? '▲' : '▼' }}
                </template>
                <template v-else>⇅</template>
              </span>
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

.data-table__table {
  width: 100%;
  border-collapse: collapse;
}

.data-table__table th,
.data-table__table td {
  padding: 0.5rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.data-table__table th {
  font-weight: 600;
  user-select: none;
}

.data-table__table th.is-sortable {
  cursor: pointer;
}

.data-table__table th.is-sortable:hover {
  background: #f5f5f5;
}

.data-table__table th.is-active {
  color: #1565c0;
}

.data-table__header {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.data-table__indicator {
  font-size: 0.75em;
  opacity: 0.7;
}

.data-table__empty {
  text-align: center;
  color: #888;
  font-style: italic;
}
</style>
