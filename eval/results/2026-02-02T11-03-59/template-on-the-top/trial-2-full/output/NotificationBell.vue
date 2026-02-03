<template>
  <div class="notification-bell" ref="bellRef">
    <button class="bell-button" @click="isOpen = !isOpen">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </button>

    <div v-if="isOpen" class="dropdown">
      <div class="dropdown-header">
        <span>Notifications</span>
        <button v-if="unreadCount > 0" class="mark-read-btn" @click="markAllRead">Mark all read</button>
      </div>
      <ul v-if="notifications.length">
        <li
          v-for="n in notifications"
          :key="n.id"
          :class="{ unread: !n.read }"
          @click="markRead(n.id)"
        >
          <span class="message">{{ n.message }}</span>
          <span class="time">{{ n.time }}</span>
        </li>
      </ul>
      <p v-else class="empty">No notifications</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const isOpen = ref(false)
const bellRef = ref(null)

const notifications = ref([
  { id: 1, message: 'New comment on your post', time: '2m ago', read: false },
  { id: 2, message: 'You have a new follower', time: '10m ago', read: false },
  { id: 3, message: 'Your report is ready', time: '1h ago', read: true },
  { id: 4, message: 'System maintenance scheduled', time: '3h ago', read: true },
])

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

function markRead(id) {
  const n = notifications.value.find(n => n.id === id)
  if (n) n.read = true
}

function markAllRead() {
  notifications.value.forEach(n => { n.read = true })
}

function onClickOutside(e) {
  if (bellRef.value && !bellRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
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

.mark-read-btn {
  background: none;
  border: none;
  color: #3182ce;
  font-size: 12px;
  cursor: pointer;
}

.mark-read-btn:hover {
  text-decoration: underline;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
}

li {
  padding: 10px 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

li:hover {
  background: #f9f9f9;
}

li.unread {
  background: #ebf5ff;
}

li.unread:hover {
  background: #dbeafe;
}

.message {
  font-size: 13px;
  color: #333;
}

.time {
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
