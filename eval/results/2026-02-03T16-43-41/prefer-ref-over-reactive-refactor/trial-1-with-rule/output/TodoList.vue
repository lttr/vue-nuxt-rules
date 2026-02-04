<!-- TodoList.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const items = ref([])
const loading = ref(false)
const error = ref(null)
// ... rest of component using items, loading, error
</script>
