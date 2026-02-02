<template>
  <div class="countdown-timer">
    <span class="segment">{{ days }}d</span>
    <span class="segment">{{ hours }}h</span>
    <span class="segment">{{ minutes }}m</span>
    <span class="segment">{{ seconds }}s</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{
  targetDate: string | Date
}>()

const now = ref(Date.now())
let intervalId: ReturnType<typeof setInterval> | null = null

const remaining = computed(() => {
  const diff = new Date(props.targetDate).getTime() - now.value
  return Math.max(0, diff)
})

const days = computed(() => Math.floor(remaining.value / (1000 * 60 * 60 * 24)))
const hours = computed(() => Math.floor((remaining.value / (1000 * 60 * 60)) % 24))
const minutes = computed(() => Math.floor((remaining.value / (1000 * 60)) % 60))
const seconds = computed(() => Math.floor((remaining.value / 1000) % 60))

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = Date.now()
    if (remaining.value <= 0 && intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
