<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
    // Each: { key: string, label: string, sortable?: boolean }
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

function ariaSort(column) {
  if (sortKey.value !== column.key) return 'none'
  return sortOrder.value === 'asc' ? 'ascending' : 'descending'
}

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows

  const key = sortKey.value
  const dir = sortOrder.value === 'asc' ? 1 : -1

  // Copy so we don't mutate the prop array.
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
              'is-sorted': sortKey === column.key,
            }"
            :aria-sort="ariaSort(column)"
            @click="toggleSort(column)"
          >
            <span class="data-table__label">{{ column.label }}</span>
            <span v-if="column.sortable" class="data-table__indicator" aria-hidden="true">
              <template v-if="sortKey === column.key">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </template>
              <template v-else>↕</template>
            </span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="sortedRows.length === 0">
          <td :colspan="columns.length" class="data-table__empty">No data</td>
        </tr>
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
  border-bottom: 1px solid #e2e2e2;
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

.data-table__table th.is-sorted {
  color: #1a56db;
}

.data-table__indicator {
  margin-left: 0.35rem;
  font-size: 0.75em;
  opacity: 0.7;
}

.data-table__empty {
  text-align: center;
  color: #888;
  padding: 1rem;
}
</style>
