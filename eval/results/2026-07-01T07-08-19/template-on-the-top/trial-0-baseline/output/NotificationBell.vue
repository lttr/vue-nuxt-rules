<template>
  <div class="notification-bell">
    <button class="bell-button" @click="toggleDropdown" aria-label="Notifications">
      <span class="bell-icon">🔔</span>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
    </button>

    <div v-if="isOpen" class="dropdown">
      <div class="dropdown-header">
        <span>Notifications</span>
        <button v-if="unreadCount > 0" class="mark-read-btn" @click="markAllRead">
          Mark all as read
        </button>
      </div>

      <ul v-if="notifications.length" class="notification-list">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ unread: !notification.read }"
          @click="markRead(notification)"
        >
          <div class="notification-title">{{ notification.title }}</div>
          <div class="notification-message">{{ notification.message }}</div>
          <div class="notification-time">{{ notification.time }}</div>
        </li>
      </ul>

      <div v-else class="empty-state">No notifications</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  notifications: {
    type: Array,
    default: () => [
      { id: 1, title: 'Welcome!', message: 'Thanks for joining.', time: '2m ago', read: false },
      { id: 2, title: 'New comment', message: 'Someone replied to your post.', time: '1h ago', read: false },
      { id: 3, title: 'Update', message: 'Your profile was updated.', time: '1d ago', read: true },
    ],
  },
})

const isOpen = ref(false)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

const unreadCount = computed(
  () => props.notifications.filter((n) => !n.read).length
)

function markRead(notification) {
  notification.read = true
}

function markAllRead() {
  props.notifications.forEach((n) => (n.read = true))
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
  font-size: 22px;
  padding: 6px;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #e53935;
  color: #fff;
  border-radius: 999px;
  font-size: 11px;
  line-height: 1;
  padding: 3px 5px;
  min-width: 16px;
  text-align: center;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 8px;
  width: 300px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
  font-weight: bold;
}

.mark-read-btn {
  background: none;
  border: none;
  color: #1976d2;
  cursor: pointer;
  font-size: 12px;
  font-weight: normal;
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

.notification-item.unread {
  background: #f5f9ff;
}

.notification-title {
  font-weight: bold;
  font-size: 14px;
}

.notification-message {
  font-size: 13px;
  color: #555;
}

.notification-time {
  font-size: 11px;
  color: #999;
  margin-top: 2px;
}

.empty-state {
  padding: 20px;
  text-align: center;
  color: #999;
  font-size: 13px;
}
</style>
