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
          @click="handleNotificationClick(notification)"
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

const props = defineProps({
  notifications: {
    type: Array,
    default: () => [
      { id: 1, title: 'New message', message: 'You have a new message from John', time: '5 min ago', read: false },
      { id: 2, title: 'Update available', message: 'A new version is ready to install', time: '1 hour ago', read: false },
      { id: 3, title: 'Welcome!', message: 'Thanks for joining our platform', time: '2 days ago', read: true },
    ]
  }
})

const emit = defineEmits(['notification-click', 'mark-all-read'])

const isOpen = ref(false)
const bellRef = ref(null)
const localNotifications = ref([...props.notifications])

const unreadCount = computed(() => {
  return localNotifications.value.filter(n => !n.read).length
})

const notifications = computed(() => localNotifications.value)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function handleNotificationClick(notification) {
  notification.read = true
  emit('notification-click', notification)
}

function markAllAsRead() {
  localNotifications.value.forEach(n => n.read = true)
  emit('mark-all-read')
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
  background-color: #ef4444;
  color: white;
  font-size: 11px;
  font-weight: bold;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 320px;
  max-height: 400px;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 600;
}

.mark-read-btn {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 12px;
  cursor: pointer;
}

.mark-read-btn:hover {
  text-decoration: underline;
}

.notification-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 320px;
  overflow-y: auto;
}

.notification-item {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
}

.notification-item:hover {
  background-color: #f9f9f9;
}

.notification-item.unread {
  background-color: #eff6ff;
}

.notification-item.unread:hover {
  background-color: #dbeafe;
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
  padding: 32px 16px;
  text-align: center;
  color: #999;
}
</style>
