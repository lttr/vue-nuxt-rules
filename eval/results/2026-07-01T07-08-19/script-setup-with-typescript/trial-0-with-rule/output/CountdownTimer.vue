<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{
  targetDate: string | number | Date
}>()

const now = ref(Date.now())
let intervalId: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})

const remaining = computed(() => {
  const target = new Date(props.targetDate).getTime()
  const diff = Math.max(0, target - now.value)

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  return { days, hours, minutes, seconds, isExpired: diff <= 0 }
})
</script>

<template>
  <div class="countdown-timer">
    <template v-if="!remaining.isExpired">
      <div class="countdown-timer__segment">
        <span class="countdown-timer__value">{{ remaining.days }}</span>
        <span class="countdown-timer__label">Days</span>
      </div>
      <div class="countdown-timer__segment">
        <span class="countdown-timer__value">{{ remaining.hours }}</span>
        <span class="countdown-timer__label">Hours</span>
      </div>
      <div class="countdown-timer__segment">
        <span class="countdown-timer__value">{{ remaining.minutes }}</span>
        <span class="countdown-timer__label">Minutes</span>
      </div>
      <div class="countdown-timer__segment">
        <span class="countdown-timer__value">{{ remaining.seconds }}</span>
        <span class="countdown-timer__label">Seconds</span>
      </div>
    </template>
    <template v-else>
      <span class="countdown-timer__expired">Time's up!</span>
    </template>
  </div>
</template>

<style scoped>
.countdown-timer {
  display: flex;
  gap: 1rem;
}

.countdown-timer__segment {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.countdown-timer__value {
  font-size: 1.5rem;
  font-weight: bold;
}

.countdown-timer__label {
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.7;
}

.countdown-timer__expired {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
