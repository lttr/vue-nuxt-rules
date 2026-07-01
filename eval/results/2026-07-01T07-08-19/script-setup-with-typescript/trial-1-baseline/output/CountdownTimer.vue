<template>
  <div class="countdown-timer">
    <template v-if="!expired">
      <div class="countdown-unit">
        <span class="value">{{ remaining.days }}</span>
        <span class="label">Days</span>
      </div>
      <div class="countdown-unit">
        <span class="value">{{ remaining.hours }}</span>
        <span class="label">Hours</span>
      </div>
      <div class="countdown-unit">
        <span class="value">{{ remaining.minutes }}</span>
        <span class="label">Minutes</span>
      </div>
      <div class="countdown-unit">
        <span class="value">{{ remaining.seconds }}</span>
        <span class="label">Seconds</span>
      </div>
    </template>
    <div v-else class="expired">
      <slot name="expired">Time's up!</slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  targetDate: {
    type: [String, Number, Date],
    required: true,
  },
})

const emit = defineEmits(['expired'])

const target = computed(() => new Date(props.targetDate).getTime())
const now = ref(Date.now())
let intervalId = null

const diff = computed(() => Math.max(0, target.value - now.value))
const expired = computed(() => diff.value <= 0)

const remaining = computed(() => {
  const totalSeconds = Math.floor(diff.value / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }
})

function tick() {
  now.value = Date.now()
  if (target.value - now.value <= 0 && intervalId) {
    clearInterval(intervalId)
    intervalId = null
    emit('expired')
  }
}

onMounted(() => {
  tick()
  intervalId = setInterval(tick, 1000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.countdown-timer {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
}

.countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 3.5rem;
}

.value {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #666;
  margin-top: 0.25rem;
}

.expired {
  font-size: 1.5rem;
  font-weight: 700;
}
</style>
