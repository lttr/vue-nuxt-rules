<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  targetDate: {
    type: [Date, String],
    required: true
  }
})

const now = ref(Date.now())
let intervalId = null

const timeRemaining = computed(() => {
  const target = new Date(props.targetDate).getTime()
  const diff = Math.max(0, target - now.value)

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
})

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) {
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
  justify-content: center;
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
