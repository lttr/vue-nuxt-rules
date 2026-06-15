<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  // Target date: a Date, an ISO string, or a timestamp (ms)
  targetDate: {
    type: [Date, String, Number],
    required: true,
  },
})

const emit = defineEmits(['finished'])

const now = ref(Date.now())
let intervalId = null

const target = computed(() => new Date(props.targetDate).getTime())

const remaining = computed(() => Math.max(0, target.value - now.value))
const isFinished = computed(() => remaining.value === 0)

const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

const days = computed(() => Math.floor(remaining.value / DAY))
const hours = computed(() => Math.floor((remaining.value % DAY) / HOUR))
const minutes = computed(() => Math.floor((remaining.value % HOUR) / MINUTE))
const seconds = computed(() => Math.floor((remaining.value % MINUTE) / SECOND))

const pad = (n) => String(n).padStart(2, '0')

function tick() {
  now.value = Date.now()
  if (isFinished.value) {
    stop()
    emit('finished')
  }
}

function start() {
  stop()
  tick()
  if (!isFinished.value) {
    intervalId = setInterval(tick, 1000)
  }
}

function stop() {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

onMounted(start)
onBeforeUnmount(stop)

// Restart the countdown if the target changes
watch(target, start)
</script>

<template>
  <div class="countdown-timer" role="timer" aria-live="polite">
    <div class="unit">
      <span class="value">{{ pad(days) }}</span>
      <span class="label">Days</span>
    </div>
    <span class="sep">:</span>
    <div class="unit">
      <span class="value">{{ pad(hours) }}</span>
      <span class="label">Hours</span>
    </div>
    <span class="sep">:</span>
    <div class="unit">
      <span class="value">{{ pad(minutes) }}</span>
      <span class="label">Minutes</span>
    </div>
    <span class="sep">:</span>
    <div class="unit">
      <span class="value">{{ pad(seconds) }}</span>
      <span class="label">Seconds</span>
    </div>
  </div>
</template>

<style scoped>
.countdown-timer {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-family: system-ui, -apple-system, sans-serif;
}

.unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 3.5rem;
}

.value {
  font-size: 2.5rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.label {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.7;
}

.sep {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}
</style>
