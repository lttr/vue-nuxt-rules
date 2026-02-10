<template>
  <DataTable :columns="columns" :rows="rows" title="Team Members" />
</template>

<script setup>
import DataTable from './DataTable.vue';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'age', label: 'Age', sortable: true },
  { key: 'email', label: 'Email', sortable: false },
];

const rows = [
  { name: 'Alice', role: 'Engineer', age: 30, email: 'alice@example.com' },
  { name: 'Bob', role: 'Designer', age: 25, email: 'bob@example.com' },
  { name: 'Carol', role: 'Engineer', age: 35, email: 'carol@example.com' },
  { name: 'Dave', role: 'Manager', age: 40, email: 'dave@example.com' },
];
</script>
