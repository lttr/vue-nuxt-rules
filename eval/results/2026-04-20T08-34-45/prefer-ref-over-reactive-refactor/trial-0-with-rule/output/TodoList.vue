<!-- TodoList.vue -->
<script setup lang="ts">
import { ref } from 'vue'

const items = ref<string[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
</script>
