<template>
  <div class="countdown-timer">
    <div class="countdown-unit">
      <span class="value">{{ days }}</span>
      <span class="label">Days</span>
    </div>
    <div class="countdown-unit">
      <span class="value">{{ hours }}</span>
      <span class="label">Hours</span>
    </div>
    <div class="countdown-unit">
      <span class="value">{{ minutes }}</span>
      <span class="label">Minutes</span>
    </div>
    <div class="countdown-unit">
      <span class="value">{{ seconds }}</span>
      <span class="label">Seconds</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  targetDate: Date | string
}>()

const remaining = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

function getRemaining(): number {
  const target = new Date(props.targetDate).getTime()
  return Math.max(0, Math.floor((target - Date.now()) / 1000))
}

const days = computed(() => Math.floor(remaining.value / 86400).toString().padStart(2, '0'))
const hours = computed(() => Math.floor((remaining.value % 86400) / 3600).toString().padStart(2, '0'))
const minutes = computed(() => Math.floor((remaining.value % 3600) / 60).toString().padStart(2, '0'))
const seconds = computed(() => (remaining.value % 60).toString().padStart(2, '0'))

onMounted(() => {
  remaining.value = getRemaining()
  intervalId = setInterval(() => {
    remaining.value = getRemaining()
    if (remaining.value === 0 && intervalId !== null) {
      clearInterval(intervalId)
    }
  }, 1000)
})

onUnmounted(() => {
  if (intervalId !== null) clearInterval(intervalId)
})
</script>

<style scoped>
.countdown-timer {
  display: flex;
  gap: 1rem;
}

.countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.value {
  font-size: 2rem;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #666;
}
</style>
