<template>
  <div class="notification-bell" ref="bellRef">
    <button class="bell-button" @click="toggleDropdown">
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
        <button v-if="unreadCount > 0" class="mark-read-btn" @click="markAllAsRead">
          Mark all as read
        </button>
      </div>
      <ul v-if="notifications.length > 0" class="notification-list">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ unread: !notification.read }"
          @click="markAsRead(notification.id)"
        >
          <div class="notification-content">
            <p class="notification-title">{{ notification.title }}</p>
            <p class="notification-message">{{ notification.message }}</p>
            <span class="notification-time">{{ notification.time }}</span>
          </div>
        </li>
      </ul>
      <div v-else class="empty-state">
        No notifications
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const bellRef = ref(null)

const notifications = ref([
  { id: 1, title: 'New message', message: 'You have a new message from John', time: '5 min ago', read: false },
  { id: 2, title: 'Update available', message: 'A new version is ready to install', time: '1 hour ago', read: false },
  { id: 3, title: 'Welcome!', message: 'Thanks for joining our platform', time: '2 days ago', read: true },
])

const unreadCount = computed(() => {
  return notifications.value.filter(n => !n.read).length
})

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function markAsRead(id) {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

function markAllAsRead() {
  notifications.value.forEach(n => {
    n.read = true
  })
}

function handleClickOutside(event) {
  if (bellRef.value && !bellRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
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
  padding: 8px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.bell-button:hover {
  background-color: #f0f0f0;
}

.bell-icon {
  width: 24px;
  height: 24px;
  color: #333;
}

.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: #e74c3c;
  color: white;
  font-size: 11px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  margin-top: 8px;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  font-weight: 600;
}

.mark-read-btn {
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  font-size: 12px;
}

.mark-read-btn:hover {
  text-decoration: underline;
}

.notification-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background-color: #f9f9f9;
}

.notification-item.unread {
  background-color: #f0f7ff;
}

.notification-item.unread:hover {
  background-color: #e5f0ff;
}

.notification-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.notification-title {
  margin: 0;
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.notification-message {
  margin: 0;
  font-size: 13px;
  color: #666;
}

.notification-time {
  font-size: 11px;
  color: #999;
}

.empty-state {
  padding: 24px;
  text-align: center;
  color: #999;
}
</style>
