<template>
  <div class="countdown-timer">
    <div v-if="isExpired" class="countdown-expired">
      <slot name="expired">Countdown complete</slot>
    </div>
    <div v-else class="countdown-units">
      <div class="countdown-unit">
        <span class="value">{{ days }}</span>
        <span class="label">days</span>
      </div>
      <div class="countdown-unit">
        <span class="value">{{ pad(hours) }}</span>
        <span class="label">hours</span>
      </div>
      <div class="countdown-unit">
        <span class="value">{{ pad(minutes) }}</span>
        <span class="label">minutes</span>
      </div>
      <div class="countdown-unit">
        <span class="value">{{ pad(seconds) }}</span>
        <span class="label">seconds</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  targetDate: {
    type: [Date, String, Number],
    required: true,
  },
})

const emit = defineEmits(['expired', 'tick'])

const now = ref(Date.now())
let intervalId = null

const targetTime = computed(() => new Date(props.targetDate).getTime())
const diff = computed(() => Math.max(0, targetTime.value - now.value))
const isExpired = computed(() => diff.value === 0)

const days = computed(() => Math.floor(diff.value / 86_400_000))
const hours = computed(() => Math.floor((diff.value % 86_400_000) / 3_600_000))
const minutes = computed(() => Math.floor((diff.value % 3_600_000) / 60_000))
const seconds = computed(() => Math.floor((diff.value % 60_000) / 1000))

const pad = (n) => String(n).padStart(2, '0')

const start = () => {
  stop()
  intervalId = setInterval(() => {
    now.value = Date.now()
    emit('tick', diff.value)
    if (diff.value === 0) {
      emit('expired')
      stop()
    }
  }, 1000)
}

const stop = () => {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

watch(
  () => props.targetDate,
  () => {
    now.value = Date.now()
    if (!isExpired.value) start()
  },
)

onMounted(() => {
  if (!isExpired.value) start()
})

onBeforeUnmount(stop)
</script>

<style scoped>
.countdown-timer {
  display: inline-block;
  font-family: system-ui, sans-serif;
}
.countdown-units {
  display: flex;
  gap: 1rem;
}
.countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 3rem;
}
.countdown-unit .value {
  font-size: 2rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}
.countdown-unit .label {
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.7;
}
</style>
