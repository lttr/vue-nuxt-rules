<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  // Target date: a Date, a timestamp (ms), or an ISO string.
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

const days = computed(() => Math.floor(remaining.value / 86400000))
const hours = computed(() => Math.floor((remaining.value % 86400000) / 3600000))
const minutes = computed(() => Math.floor((remaining.value % 3600000) / 60000))
const seconds = computed(() => Math.floor((remaining.value % 60000) / 1000))

const pad = (n) => String(n).padStart(2, '0')

function tick() {
  now.value = Date.now()
}

function start() {
  stop()
  tick()
  intervalId = setInterval(tick, 1000)
}

function stop() {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

// Stop ticking and emit once the countdown reaches zero.
watch(isFinished, (finished) => {
  if (finished) {
    stop()
    emit('finished')
  }
})

watch(target, () => start())

onMounted(start)
onBeforeUnmount(stop)
</script>

<template>
  <div class="countdown-timer" role="timer" aria-live="polite">
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
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.7;
}
</style>
