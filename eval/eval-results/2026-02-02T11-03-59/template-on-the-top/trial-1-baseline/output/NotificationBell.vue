<template>
  <div class="notification-bell" ref="bellRef">
    <button class="bell-button" @click="toggleDropdown" aria-label="Notifications">
      <svg class="bell-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
    </button>

    <div v-if="isOpen" class="dropdown">
      <div class="dropdown-header">
        <span>Notifications</span>
        <button v-if="unreadCount > 0" class="mark-all-read" @click="markAllRead">Mark all read</button>
      </div>
      <ul v-if="notifications.length > 0" class="notification-list">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ unread: !notification.read }"
          @click="markRead(notification.id)"
        >
          <div class="notification-text">{{ notification.text }}</div>
          <div class="notification-time">{{ notification.time }}</div>
        </li>
      </ul>
      <div v-else class="empty">No notifications</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  notifications: {
    type: Array,
    default: () => [
      { id: 1, text: 'New comment on your post', time: '2m ago', read: false },
      { id: 2, text: 'You have a new follower', time: '10m ago', read: false },
      { id: 3, text: 'Your report is ready', time: '1h ago', read: true },
      { id: 4, text: 'Server deployment complete', time: '3h ago', read: false },
      { id: 5, text: 'Weekly digest available', time: '1d ago', read: true },
    ],
  },
})

const emit = defineEmits(['update:notifications'])

const isOpen = ref(false)
const bellRef = ref(null)

const localNotifications = ref([...props.notifications])

const notifications = computed(() => localNotifications.value)

const unreadCount = computed(() =>
  localNotifications.value.filter((n) => !n.read).length
)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function markRead(id) {
  const notification = localNotifications.value.find((n) => n.id === id)
  if (notification) {
    notification.read = true
    emit('update:notifications', [...localNotifications.value])
  }
}

function markAllRead() {
  localNotifications.value.forEach((n) => (n.read = true))
  emit('update:notifications', [...localNotifications.value])
}

function handleClickOutside(event) {
  if (bellRef.value && !bellRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.notification-bell {
  position: relative;
  display: inline-block;
}

.bell-button {
  position: relative;
  background: none;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.bell-button:hover {
  background: #f5f5f5;
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #e74c3c;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  line-height: 18px;
  border-radius: 9px;
  text-align: center;
  padding: 0 4px;
  box-sizing: border-box;
}

.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 300px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.mark-all-read {
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  font-size: 12px;
  padding: 0;
}

.mark-all-read:hover {
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
  padding: 10px 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background 0.15s;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background: #f9f9f9;
}

.notification-item.unread {
  background: #edf6ff;
}

.notification-item.unread:hover {
  background: #ddeeff;
}

.notification-text {
  font-size: 13px;
  color: #333;
  margin-bottom: 4px;
}

.notification-time {
  font-size: 11px;
  color: #999;
}

.empty {
  padding: 24px;
  text-align: center;
  color: #999;
  font-size: 13px;
}
</style>
