<template>
  <div class="notification-bell" ref="bellRef">
    <button class="bell-button" @click="toggleDropdown">
      <svg
        class="bell-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </button>

    <div v-if="isOpen" class="dropdown">
      <div class="dropdown-header">
        <span>Notifications</span>
        <button v-if="unreadCount > 0" class="mark-all" @click="markAllRead">
          Mark all read
        </button>
      </div>
      <ul v-if="notifications.length" class="notification-list">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ unread: !notification.read }"
          @click="markRead(notification.id)"
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  initialNotifications: {
    type: Array,
    default: () => [
      { id: 1, text: 'New comment on your post', time: '2m ago', read: false },
      { id: 2, text: 'Someone liked your photo', time: '10m ago', read: false },
      { id: 3, text: 'You have a new follower', time: '1h ago', read: true },
      { id: 4, text: 'Your order has shipped', time: '3h ago', read: false },
    ],
  },
})

const notifications = ref([...props.initialNotifications])
const isOpen = ref(false)
const bellRef = ref(null)

const unreadCount = computed(() => notifications.value.filter((n) => !n.read).length)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function markRead(id) {
  const notification = notifications.value.find((n) => n.id === id)
  if (notification) {
    notification.read = true
  }
}

function markAllRead() {
  notifications.value.forEach((n) => {
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

onBeforeUnmount(() => {
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
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bell-button:hover {
  background-color: #f5f5f5;
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #e74c3c;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
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
  top: calc(100% + 8px);
  right: 0;
  width: 300px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
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
}

.mark-all {
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  font-size: 12px;
}

.mark-all:hover {
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
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background-color: #f9f9f9;
}

.notification-item.unread {
  background-color: #edf6ff;
}

.notification-item.unread:hover {
  background-color: #e0f0ff;
}

.notification-text {
  margin: 0 0 4px;
  font-size: 13px;
  color: #333;
}

.notification-time {
  font-size: 11px;
  color: #999;
}

.empty {
  padding: 24px 16px;
  text-align: center;
  color: #999;
  font-size: 13px;
}
</style>
