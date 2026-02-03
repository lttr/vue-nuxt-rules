<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  targetDate: string | Date
}>()

const now = ref(Date.now())
let intervalId: ReturnType<typeof setInterval> | null = null

const timeRemaining = computed(() => {
  const target = new Date(props.targetDate).getTime()
  const diff = Math.max(0, target - now.value)

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, expired: diff === 0 }
})

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = Date.now()
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
    <template v-if="timeRemaining.expired">
      <span class="expired">Countdown complete!</span>
    </template>
    <template v-else>
      <div class="segment">
        <span class="value">{{ timeRemaining.days }}</span>
        <span class="label">days</span>
      </div>
      <div class="segment">
        <span class="value">{{ pad(timeRemaining.hours) }}</span>
        <span class="label">hours</span>
      </div>
      <div class="segment">
        <span class="value">{{ pad(timeRemaining.minutes) }}</span>
        <span class="label">minutes</span>
      </div>
      <div class="segment">
        <span class="value">{{ pad(timeRemaining.seconds) }}</span>
        <span class="label">seconds</span>
      </div>
    </template>
  </div>
</template>

<style scoped>
.countdown-timer {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-family: monospace;
}

.segment {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.value {
  font-size: 2rem;
  font-weight: bold;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #666;
}

.expired {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
