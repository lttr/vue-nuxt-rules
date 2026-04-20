<template>
  <div class="countdown-timer">
    <div class="countdown-segment">
      <span class="countdown-value">{{ days }}</span>
      <span class="countdown-label">Days</span>
    </div>
    <span class="countdown-separator">:</span>
    <div class="countdown-segment">
      <span class="countdown-value">{{ hours }}</span>
      <span class="countdown-label">Hours</span>
    </div>
    <span class="countdown-separator">:</span>
    <div class="countdown-segment">
      <span class="countdown-value">{{ minutes }}</span>
      <span class="countdown-label">Minutes</span>
    </div>
    <span class="countdown-separator">:</span>
    <div class="countdown-segment">
      <span class="countdown-value">{{ seconds }}</span>
      <span class="countdown-label">Seconds</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  targetDate: {
    type: [Date, String],
    required: true,
  },
})

const remaining = ref(0)
let intervalId = null

function calcRemaining() {
  const target = new Date(props.targetDate).getTime()
  const diff = target - Date.now()
  remaining.value = diff > 0 ? diff : 0
}

const days = computed(() => String(Math.floor(remaining.value / 86_400_000)).padStart(2, '0'))
const hours = computed(() => String(Math.floor((remaining.value % 86_400_000) / 3_600_000)).padStart(2, '0'))
const minutes = computed(() => String(Math.floor((remaining.value % 3_600_000) / 60_000)).padStart(2, '0'))
const seconds = computed(() => String(Math.floor((remaining.value % 60_000) / 1_000)).padStart(2, '0'))

onMounted(() => {
  calcRemaining()
  intervalId = setInterval(calcRemaining, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
.countdown-timer {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
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
  line-height: 1;
}

.countdown-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #666;
}

.countdown-separator {
  font-size: 2rem;
  font-weight: bold;
  align-self: flex-start;
  line-height: 1;
  padding-bottom: 1rem;
}
</style>
