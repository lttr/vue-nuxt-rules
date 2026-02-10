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
              <template v-if="sortKey === col.key">
                {{ sortOrder === 'asc' ? '\u25B2' : '\u25BC' }}
              </template>
              <template v-else>&#x25B4;&#x25BE;</template>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in sortedRows" :key="index">
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
    validator(value) {
      return value.every(
        (col) => typeof col.key === 'string' && typeof col.label === 'string'
      );
    },
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

const sortKey = ref('');
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

  return [...props.rows].sort((a, b) => {
    const valA = a[sortKey.value];
    const valB = b[sortKey.value];

    if (valA == null && valB == null) return 0;
    if (valA == null) return 1;
    if (valB == null) return -1;

    let comparison;
    if (typeof valA === 'number' && typeof valB === 'number') {
      comparison = valA - valB;
    } else {
      comparison = String(valA).localeCompare(String(valB));
    }

    return sortOrder.value === 'asc' ? comparison : -comparison;
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
  background: #e2e8f0;
}

.sort-indicator {
  margin-left: 0.25rem;
  font-size: 0.7rem;
}

tbody tr:hover {
  background: #f7fafc;
}

.empty-message {
  text-align: center;
  color: #a0aec0;
  padding: 2rem 0.75rem;
}
</style>
