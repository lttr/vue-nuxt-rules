<template>
  <div class="notification-bell">
    <button class="bell-button" @click="toggleDropdown" aria-label="Notifications">
      <span class="bell-icon">🔔</span>
      <span v-if="unreadCount > 0" class="badge">{{ displayCount }}</span>
    </button>

    <div v-if="isOpen" class="dropdown">
      <div class="dropdown-header">
        <span>Notifications</span>
        <button v-if="unreadCount > 0" class="mark-read" @click="markAllRead">
          Mark all read
        </button>
      </div>

      <ul v-if="notifications.length > 0" class="notification-list">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ unread: !notification.read }"
          @click="markRead(notification)"
        >
          <p class="notification-text">{{ notification.text }}</p>
          <span class="notification-time">{{ notification.time }}</span>
        </li>
      </ul>

      <p v-else class="empty-state">No notifications</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  notifications: {
    type: Array,
    default: () => [],
  },
})

const isOpen = ref(false)

const unreadCount = computed(
  () => props.notifications.filter((n) => !n.read).length
)

const displayCount = computed(() =>
  unreadCount.value > 99 ? '99+' : unreadCount.value
)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function markRead(notification) {
  notification.read = true
}

function markAllRead() {
  props.notifications.forEach((n) => {
    n.read = true
  })
}
</script>

<style scoped>
.notification-bell {
  position: relative;
  display: inline-block;
  font-family: sans-serif;
}

.bell-button {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  font-size: 20px;
  line-height: 1;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  box-sizing: border-box;
  background: #e53935;
  color: #fff;
  font-size: 11px;
  font-weight: bold;
  line-height: 18px;
  text-align: center;
  border-radius: 9px;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 8px;
  width: 280px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 10;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
  font-weight: bold;
}

.mark-read {
  background: none;
  border: none;
  color: #1976d2;
  cursor: pointer;
  font-size: 12px;
}

.notification-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  padding: 10px 12px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background: #f9f9f9;
}

.notification-item.unread {
  background: #eaf3fc;
}

.notification-text {
  margin: 0 0 4px;
  font-size: 14px;
  color: #222;
}

.notification-time {
  font-size: 12px;
  color: #888;
}

.empty-state {
  padding: 16px 12px;
  margin: 0;
  text-align: center;
  color: #888;
  font-size: 14px;
}
</style>
