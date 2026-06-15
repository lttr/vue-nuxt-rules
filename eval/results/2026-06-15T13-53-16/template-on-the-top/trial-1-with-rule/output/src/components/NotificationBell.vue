<template>
  <div class="notification-bell">
    <button class="bell-button" aria-label="Notifications" @click="toggleDropdown">
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

      <p v-else class="empty">No notifications</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

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
}

.bell-button {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  padding: 4px;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 9px;
  background: #e53935;
  color: #fff;
  font-size: 11px;
  line-height: 18px;
  text-align: center;
  box-sizing: border-box;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 280px;
  margin-top: 8px;
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
  font-weight: 600;
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
  max-height: 320px;
  overflow-y: auto;
}

.notification-item {
  padding: 10px 12px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.notification-item:hover {
  background: #f7f7f7;
}

.notification-item.unread {
  background: #eef5ff;
}

.notification-text {
  margin: 0 0 4px;
  font-size: 14px;
}

.notification-time {
  font-size: 12px;
  color: #888;
}

.empty {
  padding: 16px 12px;
  text-align: center;
  color: #888;
  font-size: 14px;
}
</style>
