<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{
  targetDate: Date | string | number
}>()

const now = ref(Date.now())
let intervalId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
})

const target = computed(() => new Date(props.targetDate).getTime())

const remaining = computed(() => Math.max(0, target.value - now.value))

const days = computed(() => Math.floor(remaining.value / 86_400_000))
const hours = computed(() => Math.floor((remaining.value % 86_400_000) / 3_600_000))
const minutes = computed(() => Math.floor((remaining.value % 3_600_000) / 60_000))
const seconds = computed(() => Math.floor((remaining.value % 60_000) / 1000))

const pad = (n: number) => n.toString().padStart(2, '0')
</script>

<template>
  <div class="countdown-timer">
    <div class="unit">
      <span class="value">{{ days }}</span>
      <span class="label">days</span>
    </div>
    <div class="unit">
      <span class="value">{{ pad(hours) }}</span>
      <span class="label">hours</span>
    </div>
    <div class="unit">
      <span class="value">{{ pad(minutes) }}</span>
      <span class="label">minutes</span>
    </div>
    <div class="unit">
      <span class="value">{{ pad(seconds) }}</span>
      <span class="label">seconds</span>
    </div>
  </div>
</template>

<style scoped>
.countdown-timer {
  display: inline-flex;
  gap: 1rem;
  font-family: system-ui, sans-serif;
}

.unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 3rem;
}

.value {
  font-size: 2rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.7;
}
</style>
