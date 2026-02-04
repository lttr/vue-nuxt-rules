<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  targetDate: Date | string
}>()

const now = ref(new Date())
let intervalId: number | null = null

const target = computed(() => {
  return props.targetDate instanceof Date
    ? props.targetDate
    : new Date(props.targetDate)
})

const timeRemaining = computed(() => {
  const diff = target.value.getTime() - now.value.getTime()

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const seconds = Math.floor((diff / 1000) % 60)
  const minutes = Math.floor((diff / 1000 / 60) % 60)
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24)
  const days = Math.floor(diff / 1000 / 60 / 60 / 24)

  return { days, hours, minutes, seconds }
})

onMounted(() => {
  intervalId = window.setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="countdown-timer">
    <div class="time-unit">
      <span class="value">{{ timeRemaining.days }}</span>
      <span class="label">Days</span>
    </div>
    <div class="time-unit">
      <span class="value">{{ timeRemaining.hours }}</span>
      <span class="label">Hours</span>
    </div>
    <div class="time-unit">
      <span class="value">{{ timeRemaining.minutes }}</span>
      <span class="label">Minutes</span>
    </div>
    <div class="time-unit">
      <span class="value">{{ timeRemaining.seconds }}</span>
      <span class="label">Seconds</span>
    </div>
  </div>
</template>

<style scoped>
.countdown-timer {
  display: flex;
  gap: 1rem;
}

.time-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.value {
  font-size: 2rem;
  font-weight: bold;
}

.label {
  font-size: 0.875rem;
  text-transform: uppercase;
}
</style>
