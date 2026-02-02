<template>
  <div class="notification-bell" ref="bellRef">
    <button class="bell-button" @click="toggleDropdown">
      <span class="bell-icon">🔔</span>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </button>
    <div v-if="isOpen" class="dropdown">
      <div class="dropdown-header">Notifications</div>
      <ul v-if="notifications.length" class="notification-list">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ unread: !notification.read }"
          @click="markAsRead(notification)"
        >
          <span class="notification-text">{{ notification.text }}</span>
          <span class="notification-time">{{ notification.time }}</span>
        </li>
      </ul>
      <div v-else class="empty">No notifications</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)
const bellRef = ref(null)

const notifications = ref([
  { id: 1, text: 'New message from Alice', time: '2m ago', read: false },
  { id: 2, text: 'Your order has shipped', time: '1h ago', read: false },
  { id: 3, text: 'Welcome to the app!', time: '3h ago', read: true },
])

const unreadCount = computed(() =>
  notifications.value.filter((n) => !n.read).length
)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function markAsRead(notification) {
  notification.read = true
}

function handleClickOutside(event) {
  if (bellRef.value && !bellRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.notification-bell {
  position: relative;
  display: inline-block;
}

.bell-button {
  background: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  position: relative;
  font-size: 20px;
}

.bell-button:hover {
  background: #f0f0f0;
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #e74c3c;
  color: #fff;
  font-size: 11px;
  font-weight: bold;
  border-radius: 50%;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  width: 280px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
}

.dropdown-header {
  padding: 12px 16px;
  font-weight: 600;
  border-bottom: 1px solid #eee;
}

.notification-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  padding: 10px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.notification-item:hover {
  background: #f9f9f9;
}

.notification-item.unread {
  background: #eef4ff;
}

.notification-item.unread:hover {
  background: #e0ecff;
}

.notification-text {
  font-size: 13px;
}

.notification-time {
  font-size: 11px;
  color: #999;
}

.empty {
  padding: 20px 16px;
  text-align: center;
  color: #999;
  font-size: 13px;
}
</style>
