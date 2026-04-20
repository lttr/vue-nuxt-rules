<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  targetDate: {
    type: [Date, String, Number],
    required: true,
  },
})

const now = ref(Date.now())
let intervalId = null

const target = computed(() => new Date(props.targetDate).getTime())

const remaining = computed(() => Math.max(0, target.value - now.value))

const isExpired = computed(() => remaining.value === 0)

const days = computed(() => Math.floor(remaining.value / 86_400_000))
const hours = computed(() => Math.floor((remaining.value % 86_400_000) / 3_600_000))
const minutes = computed(() => Math.floor((remaining.value % 3_600_000) / 60_000))
const seconds = computed(() => Math.floor((remaining.value % 60_000) / 1000))

const pad = (n) => String(n).padStart(2, '0')

const start = () => {
  stop()
  intervalId = setInterval(() => {
    now.value = Date.now()
    if (remaining.value === 0) stop()
  }, 1000)
}

const stop = () => {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(start)
onUnmounted(stop)
watch(() => props.targetDate, () => {
  now.value = Date.now()
  if (!isExpired.value) start()
})
</script>

<template>
  <div class="countdown-timer" :class="{ expired: isExpired }">
    <template v-if="isExpired">
      <span class="expired-label">Expired</span>
    </template>
    <template v-else>
      <div class="unit">
        <span class="value">{{ days }}</span>
        <span class="label">Days</span>
      </div>
      <div class="unit">
        <span class="value">{{ pad(hours) }}</span>
        <span class="label">Hours</span>
      </div>
      <div class="unit">
        <span class="value">{{ pad(minutes) }}</span>
        <span class="label">Minutes</span>
      </div>
      <div class="unit">
        <span class="value">{{ pad(seconds) }}</span>
        <span class="label">Seconds</span>
      </div>
    </template>
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
  letter-spacing: 0.05em;
  opacity: 0.7;
}
.expired .expired-label {
  font-size: 1.25rem;
  font-weight: 600;
  color: #c00;
}
</style>
