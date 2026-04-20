<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  notifications: {
    type: Array,
    default: () => []
  }
})

const isOpen = ref(false)

const unreadCount = computed(() =>
  props.notifications.filter(n => !n.read).length
)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="notification-bell">
    <button class="bell-button" @click="toggleDropdown" aria-label="Notifications">
      <svg
        class="bell-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </button>

    <div v-if="isOpen" class="dropdown">
      <div class="dropdown-header">Notifications</div>
      <ul v-if="notifications.length > 0" class="notification-list">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ unread: !notification.read }"
        >
          <div class="notification-message">{{ notification.message }}</div>
          <div v-if="notification.time" class="notification-time">
            {{ notification.time }}
          </div>
        </li>
      </ul>
      <div v-else class="empty">No notifications</div>
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
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  color: #333;
}

.bell-button:hover {
  background: #f0f0f0;
}

.bell-icon {
  width: 24px;
  height: 24px;
}

.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: #e53935;
  color: #fff;
  border-radius: 9px;
  font-size: 11px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
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
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-header {
  padding: 12px 16px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  background: #fafafa;
}

.notification-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.notification-item {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item.unread {
  background: #f5faff;
}

.notification-message {
  font-size: 14px;
  color: #333;
}

.notification-time {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
}

.empty {
  padding: 20px;
  text-align: center;
  color: #888;
  font-size: 14px;
}
</style>
