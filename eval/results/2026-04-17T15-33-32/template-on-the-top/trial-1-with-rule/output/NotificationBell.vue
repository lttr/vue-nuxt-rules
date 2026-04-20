<template>
  <div class="notification-bell">
    <button class="bell-button" @click="toggleDropdown" aria-label="Notifications">
      <span class="bell-icon">🔔</span>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
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
          v-for="n in notifications"
          :key="n.id"
          class="notification-item"
          :class="{ unread: !n.read }"
          @click="markRead(n)"
        >
          <div class="notification-message">{{ n.message }}</div>
          <div class="notification-time">{{ n.time }}</div>
        </li>
      </ul>
      <div v-else class="empty">No notifications</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  notifications: {
    type: Array,
    default: () => [
      { id: 1, message: 'Welcome to the app!', time: '2m ago', read: false },
      { id: 2, message: 'You have a new follower.', time: '1h ago', read: false },
      { id: 3, message: 'Your report is ready.', time: 'Yesterday', read: true }
    ]
  }
})

const isOpen = ref(false)
const items = ref([...props.notifications])

const unreadCount = computed(() => items.value.filter(n => !n.read).length)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function markRead(n) {
  n.read = true
}

function markAllRead() {
  items.value.forEach(n => (n.read = true))
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
  padding: 6px;
  font-size: 20px;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #e53935;
  color: #fff;
  border-radius: 10px;
  padding: 1px 6px;
  font-size: 11px;
  min-width: 16px;
  text-align: center;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  width: 280px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
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

.notification-item:hover {
  background: #f7f7f7;
}

.notification-item.unread {
  background: #eaf4ff;
}

.notification-message {
  font-size: 14px;
}

.notification-time {
  font-size: 11px;
  color: #888;
  margin-top: 2px;
}

.empty {
  padding: 16px;
  text-align: center;
  color: #888;
  font-size: 13px;
}
</style>
