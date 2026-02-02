<template>
  <div class="countdown-timer">
    <div class="countdown-segment">
      <span class="countdown-value">{{ days }}</span>
      <span class="countdown-label">Days</span>
    </div>
    <div class="countdown-separator">:</div>
    <div class="countdown-segment">
      <span class="countdown-value">{{ hours }}</span>
      <span class="countdown-label">Hours</span>
    </div>
    <div class="countdown-separator">:</div>
    <div class="countdown-segment">
      <span class="countdown-value">{{ minutes }}</span>
      <span class="countdown-label">Minutes</span>
    </div>
    <div class="countdown-separator">:</div>
    <div class="countdown-segment">
      <span class="countdown-value">{{ seconds }}</span>
      <span class="countdown-label">Seconds</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  targetDate: {
    type: [String, Date],
    required: true,
  },
})

const days = ref('00')
const hours = ref('00')
const minutes = ref('00')
const seconds = ref('00')

let intervalId = null

function pad(n) {
  return String(n).padStart(2, '0')
}

function update() {
  const now = Date.now()
  const target = new Date(props.targetDate).getTime()
  const diff = target - now

  if (diff <= 0) {
    days.value = '00'
    hours.value = '00'
    minutes.value = '00'
    seconds.value = '00'
    clearInterval(intervalId)
    return
  }

  const totalSeconds = Math.floor(diff / 1000)
  days.value = pad(Math.floor(totalSeconds / 86400))
  hours.value = pad(Math.floor((totalSeconds % 86400) / 3600))
  minutes.value = pad(Math.floor((totalSeconds % 3600) / 60))
  seconds.value = pad(totalSeconds % 60)
}

onMounted(() => {
  update()
  intervalId = setInterval(update, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.countdown-timer {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: monospace;
}

.countdown-segment {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.countdown-value {
  font-size: 2rem;
  font-weight: bold;
}

.countdown-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.7;
}

.countdown-separator {
  font-size: 2rem;
  font-weight: bold;
  align-self: flex-start;
}
</style>
