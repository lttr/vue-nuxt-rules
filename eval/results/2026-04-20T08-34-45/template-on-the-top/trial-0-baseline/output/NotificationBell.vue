<template>
  <div class="notification-bell" ref="containerRef">
    <button class="bell-btn" @click="toggleDropdown" aria-label="Notifications">
      <svg class="bell-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
    </button>

    <div v-if="isOpen" class="dropdown">
      <div class="dropdown-header">
        <span class="dropdown-title">Notifications</span>
        <button v-if="unreadCount > 0" class="mark-all-btn" @click="markAllRead">
          Mark all read
        </button>
      </div>

      <ul class="notification-list" role="list">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ unread: !notification.read }"
          @click="markRead(notification.id)"
        >
          <div class="notification-content">
            <p class="notification-message">{{ notification.message }}</p>
            <span class="notification-time">{{ notification.time }}</span>
          </div>
          <span v-if="!notification.read" class="unread-dot" aria-label="Unread" />
        </li>
      </ul>

      <p v-if="notifications.length === 0" class="empty-state">No notifications</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  notifications: {
    type: Array,
    default: () => [
      { id: 1, message: 'Alice commented on your post', time: '2m ago', read: false },
      { id: 2, message: 'Your report is ready to download', time: '15m ago', read: false },
      { id: 3, message: 'Bob liked your photo', time: '1h ago', read: true },
      { id: 4, message: 'System maintenance at midnight', time: '3h ago', read: true },
    ],
  },
})

const emit = defineEmits(['mark-read', 'mark-all-read'])

const isOpen = ref(false)
const containerRef = ref(null)

const notifications = ref(props.notifications.map(n => ({ ...n })))

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function markRead(id) {
  const n = notifications.value.find(n => n.id === id)
  if (n) n.read = true
  emit('mark-read', id)
}

function markAllRead() {
  notifications.value.forEach(n => (n.read = true))
  emit('mark-all-read')
}

function handleClickOutside(event) {
  if (containerRef.value && !containerRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside))
</script>

<style scoped>
.notification-bell {
  position: relative;
  display: inline-block;
}

.bell-btn {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  color: #374151;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.bell-btn:hover {
  background: #f3f4f6;
}

.bell-icon {
  width: 24px;
  height: 24px;
}

.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #ef4444;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  padding: 0 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 320px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  overflow: hidden;
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
}

.dropdown-title {
  font-weight: 600;
  font-size: 14px;
  color: #111827;
}

.mark-all-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #6366f1;
  padding: 0;
}

.mark-all-btn:hover {
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
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f3f4f6;
  transition: background 0.1s;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background: #f9fafb;
}

.notification-item.unread {
  background: #eef2ff;
}

.notification-item.unread:hover {
  background: #e0e7ff;
}

.notification-content {
  flex: 1;
  min-width: 0;
}

.notification-message {
  margin: 0 0 2px;
  font-size: 13px;
  color: #111827;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.notification-time {
  font-size: 11px;
  color: #9ca3af;
}

.unread-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6366f1;
  flex-shrink: 0;
}

.empty-state {
  padding: 24px;
  text-align: center;
  color: #9ca3af;
  font-size: 13px;
  margin: 0;
}
</style>
