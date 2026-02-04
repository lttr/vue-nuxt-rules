<script setup lang="ts">
import { ref } from 'vue'

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

const items = ref<TodoItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// ... rest of component using items, loading, error
</script>
