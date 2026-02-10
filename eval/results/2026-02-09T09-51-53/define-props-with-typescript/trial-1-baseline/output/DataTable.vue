<template>
  <div class="data-table">
    <h2 v-if="title" class="data-table-title">{{ title }}</h2>
    <table>
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
              <span v-if="sortKey === col.key">{{ sortOrder === 'asc' ? '\u25B2' : '\u25BC' }}</span>
              <span v-else class="sort-inactive">\u25B2</span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in sortedRows" :key="idx">
          <td v-for="col in columns" :key="col.key">
            {{ row[col.key] }}
          </td>
        </tr>
        <tr v-if="sortedRows.length === 0">
          <td :colspan="columns.length" class="empty-message">No data available</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  columns: {
    type: Array,
    required: true,
    validator: (cols) =>
      cols.every((c) => typeof c.key === 'string' && typeof c.label === 'string'),
  },
  rows: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
});

const sortKey = ref(null);
const sortOrder = ref('asc');

function toggleSort(key) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
}

const sortedRows = computed(() => {
  if (!sortKey.value) {
    return props.rows;
  }

  const key = sortKey.value;
  const order = sortOrder.value === 'asc' ? 1 : -1;

  return [...props.rows].sort((a, b) => {
    const valA = a[key];
    const valB = b[key];

    if (valA == null && valB == null) return 0;
    if (valA == null) return 1;
    if (valB == null) return -1;

    if (typeof valA === 'number' && typeof valB === 'number') {
      return (valA - valB) * order;
    }

    return String(valA).localeCompare(String(valB)) * order;
  });
});
</script>

<style scoped>
.data-table {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.data-table-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.5rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

th {
  background: #f7fafc;
  font-weight: 600;
  user-select: none;
}

th.sortable {
  cursor: pointer;
}

th.sortable:hover {
  background: #edf2f7;
}

th.active {
  background: #edf2f7;
}

.sort-indicator {
  margin-left: 0.25rem;
  font-size: 0.65rem;
}

.sort-inactive {
  opacity: 0.3;
}

tbody tr:hover {
  background: #f7fafc;
}

.empty-message {
  text-align: center;
  color: #a0aec0;
  padding: 2rem;
}
</style>
