<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  notifications: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['markAllRead', 'select'])

const isOpen = ref(false)

const unreadCount = computed(
  () => props.notifications.filter((n) => !n.read).length
)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function handleSelect(notification) {
  emit('select', notification)
}

function markAllRead() {
  emit('markAllRead')
}

// Closes the dropdown when clicking anywhere outside the component.
const vClickOutside = {
  mounted(el, binding) {
    el._clickOutside = (event) => {
      if (!el.contains(event.target)) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el) {
    document.removeEventListener('click', el._clickOutside)
  },
}
</script>

<template>
  <div class="notification-bell" v-click-outside="close">
    <button
      class="bell-button"
      type="button"
      :aria-label="`Notifications, ${unreadCount} unread`"
      @click="toggle"
    >
      <!-- Bell icon -->
      <svg
        class="bell-icon"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>

      <span v-if="unreadCount > 0" class="badge">
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </button>

    <div v-if="isOpen" class="dropdown">
      <div class="dropdown-header">
        <span>Notifications</span>
        <button
          v-if="unreadCount > 0"
          class="mark-read"
          type="button"
          @click="markAllRead"
        >
          Mark all read
        </button>
      </div>

      <ul v-if="notifications.length > 0" class="notification-list">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ unread: !notification.read }"
          @click="handleSelect(notification)"
        >
          <p class="notification-text">{{ notification.text }}</p>
          <span v-if="notification.time" class="notification-time">
            {{ notification.time }}
          </span>
        </li>
      </ul>

      <p v-else class="empty">No notifications</p>
    </div>
  </div>
</template>

<style scoped>
.notification-bell {
  position: relative;
  display: inline-block;
}

.bell-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background: none;
  border: none;
  border-radius: 50%;
  color: #333;
  cursor: pointer;
}

.bell-button:hover {
  background: #f0f0f0;
}

.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  box-sizing: border-box;
  background: #e53935;
  color: #fff;
  font-size: 11px;
  line-height: 18px;
  font-weight: 600;
  text-align: center;
  border-radius: 9px;
}

.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 100;
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  font-weight: 600;
}

.mark-read {
  background: none;
  border: none;
  color: #1e88e5;
  font-size: 12px;
  cursor: pointer;
}

.mark-read:hover {
  text-decoration: underline;
}

.notification-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.notification-item {
  padding: 12px 16px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background: #f9f9f9;
}

.notification-item.unread {
  background: #f0f7ff;
}

.notification-item.unread:hover {
  background: #e6f1ff;
}

.notification-text {
  margin: 0;
  font-size: 14px;
  color: #333;
}

.notification-time {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #999;
}

.empty {
  padding: 24px 16px;
  text-align: center;
  color: #999;
  font-size: 14px;
}
</style>
