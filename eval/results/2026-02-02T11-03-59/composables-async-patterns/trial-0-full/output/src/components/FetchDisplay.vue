<script setup lang="ts">
import { useFetch } from '../composables/useFetch'

const props = defineProps<{ url: string }>()

const { data, error, isLoading } = useFetch(() => props.url)
</script>

<template>
  <div class="loading-spinner" v-if="isLoading">Loading...</div>
  <div class="error-message" v-else-if="error">Error: {{ error.message }}</div>
  <slot v-else :data="data" />
</template>
