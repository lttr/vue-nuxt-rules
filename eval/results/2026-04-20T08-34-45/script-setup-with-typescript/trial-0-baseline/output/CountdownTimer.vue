<template>
  <div class="countdown-timer">
    <div class="countdown-unit">
      <span class="value">{{ days }}</span>
      <span class="label">Days</span>
    </div>
    <div class="countdown-unit">
      <span class="value">{{ hours }}</span>
      <span class="label">Hours</span>
    </div>
    <div class="countdown-unit">
      <span class="value">{{ minutes }}</span>
      <span class="label">Minutes</span>
    </div>
    <div class="countdown-unit">
      <span class="value">{{ seconds }}</span>
      <span class="label">Seconds</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  targetDate: {
    type: [String, Date],
    required: true,
  },
})

const remaining = ref(0)
let intervalId = null

function update() {
  const target = new Date(props.targetDate).getTime()
  const now = Date.now()
  remaining.value = Math.max(0, Math.floor((target - now) / 1000))
}

const days = computed(() => String(Math.floor(remaining.value / 86400)).padStart(2, '0'))
const hours = computed(() => String(Math.floor((remaining.value % 86400) / 3600)).padStart(2, '0'))
const minutes = computed(() => String(Math.floor((remaining.value % 3600) / 60)).padStart(2, '0'))
const seconds = computed(() => String(remaining.value % 60).padStart(2, '0'))

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
  gap: 1.5rem;
}

.countdown-unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.value {
  font-size: 2.5rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.25rem;
  opacity: 0.6;
}
</style>
