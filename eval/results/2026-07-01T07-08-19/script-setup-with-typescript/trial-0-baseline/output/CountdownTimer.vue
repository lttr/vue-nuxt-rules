<template>
  <div class="countdown-timer">
    <template v-if="!expired">
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
    </template>
    <div v-else class="countdown-timer__expired">
      {{ expiredText }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  targetDate: {
    type: [Date, String, Number],
    required: true,
  },
  expiredText: {
    type: String,
    default: 'Expired',
  },
})

const emit = defineEmits(['expired'])

const remainingMs = ref(0)
let intervalId = null

function computeRemaining() {
  const target = new Date(props.targetDate).getTime()
  const diff = target - Date.now()
  return diff > 0 ? diff : 0
}

function tick() {
  const previous = remainingMs.value
  remainingMs.value = computeRemaining()
  if (previous > 0 && remainingMs.value === 0) {
    emit('expired')
  }
}

const expired = computed(() => remainingMs.value <= 0)
const days = computed(() => Math.floor(remainingMs.value / 86400000))
const hours = computed(() => Math.floor((remainingMs.value % 86400000) / 3600000))
const minutes = computed(() => Math.floor((remainingMs.value % 3600000) / 60000))
const seconds = computed(() => Math.floor((remainingMs.value % 60000) / 1000))

function pad(value) {
  return String(value).padStart(2, '0')
}

onMounted(() => {
  tick()
  intervalId = setInterval(tick, 1000)
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

.countdown-timer__segment {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 3.5rem;
}

.countdown-timer__value {
  font-size: 2rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.countdown-timer__label {
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.7;
}

.countdown-timer__expired {
  font-size: 1.25rem;
  font-weight: 600;
}
</style>
