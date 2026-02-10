<template>
  <DataTable :columns="columns" :rows="rows" title="Employee Directory" />
</template>

<script setup>
import DataTable from './DataTable.vue';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
  { key: 'department', label: 'Department', sortable: false },
];

const rows = [
  { name: 'Alice', role: 'Engineer', age: 30, department: 'Platform' },
  { name: 'Bob', role: 'Designer', age: 25, department: 'Product' },
  { name: 'Carol', role: 'Manager', age: 40, department: 'Platform' },
  { name: 'Dave', role: 'Engineer', age: 35, department: 'Backend' },
];
</script>
