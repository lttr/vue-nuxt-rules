# `useFetch` composable

A small Vue 3 composable that fetches JSON from an API URL and exposes reactive
loading / error / data state.

## Files

- `composables/useFetch.js` — the composable.
- `components/DataView.vue` — example component showing a loading spinner while
  fetching and an error message (with a retry button) on failure.

## Composable API

```js
const { data, error, loading, refetch } = useFetch(url, options)
```

| Return    | Type                    | Description                                    |
| --------- | ----------------------- | ---------------------------------------------- |
| `data`    | `ShallowRef<unknown>`   | Parsed JSON response, or `null`.               |
| `error`   | `Ref<Error \| null>`    | The error if the request failed, else `null`.  |
| `loading` | `Ref<boolean>`          | `true` while a request is in flight.           |
| `refetch` | `() => void`            | Re-run the request manually.                   |

`url` may be a string, a `ref`, or a getter (`() => ...`). When reactive, the
request re-runs automatically as the URL changes. In-flight requests are aborted
when a new one starts or the URL changes.

## Usage

```vue
<script setup>
import DataView from './components/DataView.vue'
</script>

<template>
  <DataView url="https://jsonplaceholder.typicode.com/todos/1" v-slot="{ data }">
    <h2>{{ data.title }}</h2>
  </DataView>
</template>
```

Or use the composable directly:

```vue
<script setup>
import { useFetch } from './composables/useFetch.js'

const { data, error, loading } = useFetch('https://api.example.com/items')
</script>

<template>
  <p v-if="loading">Loading…</p>
  <p v-else-if="error">{{ error.message }}</p>
  <ul v-else><li v-for="item in data" :key="item.id">{{ item.name }}</li></ul>
</template>
```
