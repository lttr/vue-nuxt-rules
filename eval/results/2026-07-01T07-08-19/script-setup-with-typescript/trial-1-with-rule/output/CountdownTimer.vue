<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<{
  targetDate: Date | string | number
}>()

const now = ref(Date.now())
let intervalId: ReturnType<typeof setInterval> | undefined

const target = computed(() => new Date(props.targetDate).getTime())
const remaining = computed(() => Math.max(0, target.value - now.value))

const days = computed(() => Math.floor(remaining.value / (1000 * 60 * 60 * 24)))
const hours = computed(() => Math.floor((remaining.value / (1000 * 60 * 60)) % 24))
const minutes = computed(() => Math.floor((remaining.value / (1000 * 60)) % 60))
const seconds = computed(() => Math.floor((remaining.value / 1000) % 60))
const isExpired = computed(() => remaining.value <= 0)

const pad = (value: number) => value.toString().padStart(2, '0')

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="countdown-timer">
    <div v-if="!isExpired" class="countdown-timer__segments">
      <div class="countdown-timer__segment">
        <span class="countdown-timer__value">{{ days }}</span>
        <span class="countdown-timer__label">Days</span>
      </div>
      <div class="countdown-timer__segment">
        <span class="countdown-timer__value">{{ pad(hours) }}</span>
        <span class="countdown-timer__label">Hours</span>
      </div>
      <div class="countdown-timer__segment">
        <span class="countdown-timer__value">{{ pad(minutes) }}</span>
        <span class="countdown-timer__label">Minutes</span>
      </div>
      <div class="countdown-timer__segment">
        <span class="countdown-timer__value">{{ pad(seconds) }}</span>
        <span class="countdown-timer__label">Seconds</span>
      </div>
    </div>
    <div v-else class="countdown-timer__expired">Time's up!</div>
  </div>
</template>

<style scoped>
.countdown-timer__segments {
  display: flex;
  gap: 1rem;
}

.countdown-timer__segment {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 3rem;
}

.countdown-timer__value {
  font-size: 1.5rem;
  font-weight: 700;
}

.countdown-timer__label {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #666;
}

.countdown-timer__expired {
  font-size: 1.25rem;
  font-weight: 600;
}
</style>
