<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{
  targetDate: Date | string | number
}>()

const now = ref(Date.now())
let timerId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timerId = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timerId !== null) clearInterval(timerId)
})

const target = computed(() => new Date(props.targetDate).getTime())

const remaining = computed(() => Math.max(0, target.value - now.value))

const days = computed(() => Math.floor(remaining.value / (1000 * 60 * 60 * 24)))
const hours = computed(() => Math.floor((remaining.value / (1000 * 60 * 60)) % 24))
const minutes = computed(() => Math.floor((remaining.value / (1000 * 60)) % 60))
const seconds = computed(() => Math.floor((remaining.value / 1000) % 60))

const isExpired = computed(() => remaining.value === 0)

const pad = (n: number) => n.toString().padStart(2, '0')
</script>

<template>
  <div class="countdown-timer">
    <template v-if="isExpired">
      <span class="expired">Expired</span>
    </template>
    <template v-else>
      <div class="segment">
        <span class="value">{{ days }}</span>
        <span class="label">days</span>
      </div>
      <div class="segment">
        <span class="value">{{ pad(hours) }}</span>
        <span class="label">hours</span>
      </div>
      <div class="segment">
        <span class="value">{{ pad(minutes) }}</span>
        <span class="label">minutes</span>
      </div>
      <div class="segment">
        <span class="value">{{ pad(seconds) }}</span>
        <span class="label">seconds</span>
      </div>
    </template>
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
}

.value {
  font-size: 2rem;
  font-weight: 600;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.expired {
  font-weight: 600;
}
</style>
