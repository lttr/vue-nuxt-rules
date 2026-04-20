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

const now = ref(Date.now())
let intervalId: ReturnType<typeof setInterval>

const remaining = computed(() => {
  const target = new Date(props.targetDate).getTime()
  return Math.max(0, target - now.value)
})

const days = computed(() => Math.floor(remaining.value / (1000 * 60 * 60 * 24)))
const hours = computed(() => Math.floor((remaining.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
const minutes = computed(() => Math.floor((remaining.value % (1000 * 60 * 60)) / (1000 * 60)))
const seconds = computed(() => Math.floor((remaining.value % (1000 * 60)) / 1000))

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
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
  min-width: 2ch;
  text-align: center;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
