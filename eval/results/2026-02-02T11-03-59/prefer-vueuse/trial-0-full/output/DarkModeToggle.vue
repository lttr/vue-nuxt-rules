<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { computed } from 'vue'

const mode = useColorMode({
  storageKey: 'color-mode',
  attribute: 'class',
  selector: 'html',
})

const isDark = computed(() => mode.value === 'dark')

function toggle() {
  mode.value = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <slot>
      <span v-if="isDark">&#x2600;&#xFE0F; Light</span>
      <span v-else>&#x1F319; Dark</span>
    </slot>
  </button>
</template>
