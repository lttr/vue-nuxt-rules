<template>
  <div class="notification-bell" ref="bellRef">
    <button class="bell-button" @click="toggleDropdown">
      <svg class="bell-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </button>

    <div v-if="isOpen" class="dropdown">
      <div class="dropdown-header">
        <span>Notifications</span>
        <button v-if="unreadCount > 0" class="mark-all-read" @click="markAllRead">Mark all read</button>
      </div>
      <ul v-if="notifications.length" class="notification-list">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          :class="['notification-item', { unread: !notification.read }]"
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
  notifications: {
    type: Array,
    default: () => [
      { id: 1, text: 'New message from Alice', time: '2m ago', read: false },
      { id: 2, text: 'Your order has shipped', time: '1h ago', read: false },
      { id: 3, text: 'Welcome to the app!', time: '1d ago', read: true },
    ],
  },
})

const emit = defineEmits(['update:notifications'])

const isOpen = ref(false)
const bellRef = ref(null)

const unreadCount = computed(() => props.notifications.filter((n) => !n.read).length)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function markRead(id) {
  const updated = props.notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
  emit('update:notifications', updated)
}

function markAllRead() {
  const updated = props.notifications.map((n) => ({ ...n, read: true }))
  emit('update:notifications', updated)
}

function handleClickOutside(e) {
  if (bellRef.value && !bellRef.value.contains(e.target)) {
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
  position: relative;
  background: none;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  color: #333;
}

.bell-button:hover {
  background: #f5f5f5;
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #e53e3e;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  border-radius: 9px;
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
}

.mark-all-read {
  background: none;
  border: none;
  color: #3182ce;
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
  padding: 10px 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
}

.notification-item:hover {
  background: #f9f9f9;
}

.notification-item.unread {
  background: #ebf8ff;
}

.notification-item.unread:hover {
  background: #d6edf8;
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
  padding: 24px;
  text-align: center;
  color: #888;
}
</style>
