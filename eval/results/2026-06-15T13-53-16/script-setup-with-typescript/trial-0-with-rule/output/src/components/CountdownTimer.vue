<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps<{
  /** Target date to count down to. Accepts a Date, timestamp, or date string. */
  target: Date | string | number
}>()

const emit = defineEmits<{
  /** Fired once when the countdown reaches the target date. */
  (e: 'complete'): void
}>()

const targetTime = computed(() => new Date(props.target).getTime())
const now = ref(Date.now())

let timer: ReturnType<typeof setInterval> | undefined
let completed = false

const remaining = computed(() => Math.max(0, targetTime.value - now.value))

const isComplete = computed(() => remaining.value === 0)

const days = computed(() => Math.floor(remaining.value / 86_400_000))
const hours = computed(() => Math.floor((remaining.value % 86_400_000) / 3_600_000))
const minutes = computed(() => Math.floor((remaining.value % 3_600_000) / 60_000))
const seconds = computed(() => Math.floor((remaining.value % 60_000) / 1_000))

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

function tick() {
  now.value = Date.now()
  if (!completed && remaining.value === 0) {
    completed = true
    emit('complete')
    stop()
  }
}

function stop() {
  if (timer !== undefined) {
    clearInterval(timer)
    timer = undefined
  }
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 1_000)
})

onBeforeUnmount(stop)
</script>

<template>
  <div class="countdown-timer" :class="{ 'countdown-timer--complete': isComplete }">
    <div class="countdown-timer__unit">
      <span class="countdown-timer__value">{{ pad(days) }}</span>
      <span class="countdown-timer__label">Days</span>
    </div>
    <span class="countdown-timer__sep">:</span>
    <div class="countdown-timer__unit">
      <span class="countdown-timer__value">{{ pad(hours) }}</span>
      <span class="countdown-timer__label">Hours</span>
    </div>
    <span class="countdown-timer__sep">:</span>
    <div class="countdown-timer__unit">
      <span class="countdown-timer__value">{{ pad(minutes) }}</span>
      <span class="countdown-timer__label">Minutes</span>
    </div>
    <span class="countdown-timer__sep">:</span>
    <div class="countdown-timer__unit">
      <span class="countdown-timer__value">{{ pad(seconds) }}</span>
      <span class="countdown-timer__label">Seconds</span>
    </div>
  </div>
</template>

<style scoped>
.countdown-timer {
  display: inline-flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-variant-numeric: tabular-nums;
}

.countdown-timer__unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 3.5rem;
}

.countdown-timer__value {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

.countdown-timer__label {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.7;
}

.countdown-timer__sep {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
}

.countdown-timer--complete {
  opacity: 0.6;
}
</style>
