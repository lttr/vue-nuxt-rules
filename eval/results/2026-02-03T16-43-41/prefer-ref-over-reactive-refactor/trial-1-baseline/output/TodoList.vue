<script setup lang="ts">
import { reactive } from 'vue'

interface TodoItem {
  id: number
  text: string
  completed: boolean
}

interface State {
  items: TodoItem[]
  loading: boolean
  error: string | null
}

const state = reactive<State>({
  items: [],
  loading: false,
  error: null
})

// ... rest of component using state.items, state.loading
</script>
