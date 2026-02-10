<script setup>
import FetchDisplay from './components/FetchDisplay.vue';

const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
</script>

<template>
  <div id="app">
    <h1>Fetch Demo</h1>

    <!-- Default rendering (JSON dump) -->
    <FetchDisplay :url="apiUrl" />

    <!-- Custom rendering via scoped slot -->
    <FetchDisplay url="https://jsonplaceholder.typicode.com/users/1">
      <template #default="{ data }">
        <div class="user-card">
          <h2>{{ data.name }}</h2>
          <p>{{ data.email }}</p>
        </div>
      </template>
    </FetchDisplay>
  </div>
</template>

<style>
#app {
  font-family: system-ui, sans-serif;
  max-width: 640px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.user-card {
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
</style>
