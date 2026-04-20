<script setup lang="ts">
import { ref, computed } from 'vue'

type SortDirection = 'asc' | 'desc' | null

interface ColumnDef {
  key: string
  label: string
  sortable?: boolean
}

const props = defineProps<{
  columns: ColumnDef[]
  rows: Record<string, unknown>[]
  title?: string
}>()

const sortKey = ref<string | null>(null)
const sortDir = ref<SortDirection>(null)

function toggleSort(col: ColumnDef) {
  if (!col.sortable) return
  if (sortKey.value !== col.key) {
    sortKey.value = col.key
    sortDir.value = 'asc'
  } else if (sortDir.value === 'asc') {
    sortDir.value = 'desc'
  } else {
    sortKey.value = null
    sortDir.value = null
  }
}

const sortedRows = computed(() => {
  if (!sortKey.value || !sortDir.value) return props.rows
  const key = sortKey.value
  const dir = sortDir.value
  return [...props.rows].sort((a, b) => {
    const av = a[key]
    const bv = b[key]
    if (av === bv) return 0
    const cmp = av == null ? -1 : bv == null ? 1 : av < bv ? -1 : 1
    return dir === 'asc' ? cmp : -cmp
  })
})
</script>

<template>
  <div class="data-table-wrapper">
    <h2 v-if="title" class="data-table-title">{{ title }}</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :class="['data-table-th', col.sortable && 'sortable', sortKey === col.key && 'active']"
            @click="toggleSort(col)"
          >
            {{ col.label }}
            <span v-if="col.sortable" class="sort-indicator" aria-hidden="true">
              <template v-if="sortKey === col.key && sortDir === 'asc'">▲</template>
              <template v-else-if="sortKey === col.key && sortDir === 'desc'">▼</template>
              <template v-else>⇅</template>
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
  border: 1px solid #ddd;
  text-align: left;
}

.data-table-th.sortable {
  cursor: pointer;
  user-select: none;
}

.data-table-th.sortable:hover {
  background: #f0f0f0;
}

.data-table-th.active {
  background: #e8f0fe;
}

.sort-indicator {
  margin-left: 0.4rem;
  font-size: 0.75rem;
  opacity: 0.7;
}
</style>
