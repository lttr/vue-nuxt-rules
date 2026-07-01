<template>
  <div class="data-table">
    <h2 v-if="title">{{ title }}</h2>
    <table>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            :class="{ sortable: column.sortable }"
            @click="column.sortable && toggleSort(column.key)"
          >
            {{ column.label }}
            <span v-if="column.sortable" class="sort-indicator">
              {{ sortIndicator(column.key) }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in sortedRows" :key="index">
          <td v-for="column in columns" :key="column.key">{{ row[column.key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Column {
  key: string
  label: string
  sortable?: boolean
}

interface Props {
  columns: Column[]
  rows: Record<string, unknown>[]
  title?: string
}

const props = defineProps<Props>()

const sortKey = ref<string | null>(null)
const sortOrder = ref<1 | -1>(1)

function toggleSort(key: string) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 1 ? -1 : 1
  } else {
    sortKey.value = key
    sortOrder.value = 1
  }
}

function sortIndicator(key: string) {
  if (sortKey.value !== key) return '⇅'
  return sortOrder.value === 1 ? '▲' : '▼'
}

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows
  const key = sortKey.value
  const order = sortOrder.value
  return [...props.rows].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    if (aVal == null || bVal == null) return 0
    if (aVal < bVal) return -1 * order
    if (aVal > bVal) return 1 * order
    return 0
  })
})
</script>

<style scoped>
.data-table table {
  border-collapse: collapse;
  width: 100%;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
}

.data-table th.sortable {
  cursor: pointer;
  user-select: none;
}

.sort-indicator {
  font-size: 0.8em;
  margin-left: 4px;
  opacity: 0.6;
}
</style>
