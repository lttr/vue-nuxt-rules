<template>
  <div class="countdown-timer">
    <div class="countdown-segment">
      <span class="countdown-value">{{ days }}</span>
      <span class="countdown-label">Days</span>
    </div>
    <div class="countdown-segment">
      <span class="countdown-value">{{ hours }}</span>
      <span class="countdown-label">Hours</span>
    </div>
    <div class="countdown-segment">
      <span class="countdown-value">{{ minutes }}</span>
      <span class="countdown-label">Minutes</span>
    </div>
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

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let intervalId = null

function update() {
  const now = new Date().getTime()
  const target = new Date(props.targetDate).getTime()
  const diff = Math.max(0, target - now)

  days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((diff % (1000 * 60)) / 1000)

  if (diff === 0) {
    clearInterval(intervalId)
  }
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
  gap: 1rem;
}

.countdown-segment {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.countdown-value {
  font-size: 2rem;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
}

.countdown-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  opacity: 0.7;
}
</style>
