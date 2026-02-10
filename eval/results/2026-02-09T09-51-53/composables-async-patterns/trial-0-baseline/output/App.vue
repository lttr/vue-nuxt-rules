<script setup>
import { ref } from 'vue';
import DataFetcher from './DataFetcher.vue';

const apiUrl = ref('https://jsonplaceholder.typicode.com/posts/1');
</script>

<template>
  <div id="app">
    <h1>Data Fetcher Demo</h1>

    <label>
      API URL:
      <input v-model="apiUrl" type="text" style="width: 400px" />
    </label>

    <DataFetcher :url="apiUrl">
      <template #default="{ data }">
        <h2>{{ data.title }}</h2>
        <p>{{ data.body }}</p>
      </template>
    </DataFetcher>
  </div>
</template>
