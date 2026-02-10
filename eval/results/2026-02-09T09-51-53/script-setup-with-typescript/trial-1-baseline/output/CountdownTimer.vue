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
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  targetDate: {
    type: [String, Date],
    required: true,
  },
});

const now = ref(Date.now());
let intervalId = null;

const remaining = computed(() => {
  const target = new Date(props.targetDate).getTime();
  const diff = target - now.value;
  return diff > 0 ? diff : 0;
});

const days = computed(() =>
  String(Math.floor(remaining.value / (1000 * 60 * 60 * 24))).padStart(2, '0')
);

const hours = computed(() =>
  String(Math.floor((remaining.value / (1000 * 60 * 60)) % 24)).padStart(2, '0')
);

const minutes = computed(() =>
  String(Math.floor((remaining.value / (1000 * 60)) % 60)).padStart(2, '0')
);

const seconds = computed(() =>
  String(Math.floor((remaining.value / 1000) % 60)).padStart(2, '0')
);

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = Date.now();
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
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
