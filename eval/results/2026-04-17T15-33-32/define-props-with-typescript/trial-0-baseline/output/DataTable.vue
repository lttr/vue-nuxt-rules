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

function toggleSort(column) {
  if (!column.sortable) return
  if (sortKey.value === column.key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = column.key
    sortDir.value = 'asc'
  }
}

function sortIndicator(column) {
  if (sortKey.value !== column.key) return ''
  return sortDir.value === 'asc' ? ' ▲' : ' ▼'
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
            :aria-sort="
              sortKey === column.key
                ? sortDir === 'asc'
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
        <tr v-for="(row, index) in sortedRows" :key="row.id ?? index">
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
th.active {
  color: #1d4ed8;
}
</style>
