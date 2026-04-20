<!-- TodoList.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const items = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
// ... rest of component using items.value, loading.value, error.value
</script>
