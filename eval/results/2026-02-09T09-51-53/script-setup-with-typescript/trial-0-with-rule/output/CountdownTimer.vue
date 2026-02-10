<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{
  targetDate: string | Date
}>()

const now = ref(Date.now())
let intervalId: ReturnType<typeof setInterval> | null = null

const timeRemaining = computed(() => {
  const target = new Date(props.targetDate).getTime()
  const diff = Math.max(0, target - now.value)

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, expired: diff === 0 }
})

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

function pad(value: number): string {
  return String(value).padStart(2, '0')
}
</script>

<template>
  <div class="countdown-timer">
    <template v-if="!timeRemaining.expired">
      <div class="countdown-segments">
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
      </div>
    </template>
    <template v-else>
      <div class="expired">Countdown complete!</div>
    </template>
  </div>
</template>

<style scoped>
.countdown-timer {
  display: flex;
  justify-content: center;
  font-family: inherit;
}

.countdown-segments {
  display: flex;
  gap: 1rem;
}

.segment {
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
  opacity: 0.7;
}

.expired {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
