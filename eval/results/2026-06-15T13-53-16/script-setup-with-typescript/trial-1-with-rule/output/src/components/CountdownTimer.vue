<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{
  /** The target date to count down to. Accepts a Date, timestamp, or date string. */
  targetDate: Date | string | number
}>()

const emit = defineEmits<{
  (e: 'finished'): void
}>()

const now = ref(Date.now())
let intervalId: ReturnType<typeof setInterval> | undefined

const target = computed(() => new Date(props.targetDate).getTime())

/** Milliseconds remaining, clamped at zero. */
const remaining = computed(() => Math.max(0, target.value - now.value))

const isFinished = computed(() => remaining.value === 0)

const days = computed(() => Math.floor(remaining.value / 86_400_000))
const hours = computed(() => Math.floor((remaining.value % 86_400_000) / 3_600_000))
const minutes = computed(() => Math.floor((remaining.value % 3_600_000) / 60_000))
const seconds = computed(() => Math.floor((remaining.value % 60_000) / 1_000))

const pad = (value: number) => String(value).padStart(2, '0')

function tick() {
  now.value = Date.now()
  if (isFinished.value && intervalId !== undefined) {
    clearInterval(intervalId)
    intervalId = undefined
    emit('finished')
  }
}

onMounted(() => {
  tick()
  if (!isFinished.value) {
    intervalId = setInterval(tick, 1000)
  }
})

onBeforeUnmount(() => {
  if (intervalId !== undefined) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="countdown-timer" role="timer" aria-live="polite">
    <div class="segment">
      <span class="value">{{ pad(days) }}</span>
      <span class="label">Days</span>
    </div>
    <div class="segment">
      <span class="value">{{ pad(hours) }}</span>
      <span class="label">Hours</span>
    </div>
    <div class="segment">
      <span class="value">{{ pad(minutes) }}</span>
      <span class="label">Minutes</span>
    </div>
    <div class="segment">
      <span class="value">{{ pad(seconds) }}</span>
      <span class="label">Seconds</span>
    </div>
  </div>
</template>

<style scoped>
.countdown-timer {
  display: inline-flex;
  gap: 1rem;
  font-variant-numeric: tabular-nums;
}

.segment {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 3rem;
}

.value {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.label {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.7;
}
</style>
