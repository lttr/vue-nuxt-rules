<template>
  <div class="notification-bell" ref="bellRef">
    <button class="bell-btn" @click="toggleDropdown" aria-label="Notifications">
      <span class="bell-icon">&#128276;</span>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
    </button>

    <div v-if="open" class="dropdown">
      <div class="dropdown-header">
        <span>Notifications</span>
        <button v-if="unreadCount > 0" class="mark-all-btn" @click="markAllRead">Mark all read</button>
      </div>

      <ul v-if="notifications.length" class="notification-list">
        <li
          v-for="n in notifications"
          :key="n.id"
          class="notification-item"
          :class="{ unread: !n.read }"
          @click="markRead(n)"
        >
          <span class="notification-text">{{ n.message }}</span>
          <span class="notification-time">{{ n.time }}</span>
        </li>
      </ul>

      <div v-else class="empty">No notifications</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  notifications: {
    type: Array,
    default: () => [
      { id: 1, message: 'Your report is ready', time: '2m ago', read: false },
      { id: 2, message: 'Alice commented on your post', time: '10m ago', read: false },
      { id: 3, message: 'New follower: Bob', time: '1h ago', read: true },
    ],
  },
})

const notifications = ref(props.notifications.map(n => ({ ...n })))
const open = ref(false)
const bellRef = ref(null)

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

function toggleDropdown() {
  open.value = !open.value
}

function markRead(notification) {
  notification.read = true
}

function markAllRead() {
  notifications.value.forEach(n => (n.read = true))
}

function handleClickOutside(e) {
  if (bellRef.value && !bellRef.value.contains(e.target)) {
    open.value = false
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

.bell-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  position: relative;
  font-size: 1.5rem;
  line-height: 1;
}

.bell-btn:hover .bell-icon {
  opacity: 0.75;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #e53e3e;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  pointer-events: none;
}

.dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 6px);
  width: 300px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 1000;
  overflow: hidden;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  font-weight: 600;
  font-size: 0.9rem;
  border-bottom: 1px solid #e2e8f0;
  background: #f7fafc;
}

.mark-all-btn {
  background: none;
  border: none;
  color: #3182ce;
  font-size: 0.8rem;
  cursor: pointer;
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
  flex-direction: column;
  gap: 2px;
  padding: 10px 14px;
  cursor: pointer;
  border-bottom: 1px solid #edf2f7;
  transition: background 0.15s;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background: #f7fafc;
}

.notification-item.unread {
  background: #ebf8ff;
}

.notification-item.unread:hover {
  background: #bee3f8;
}

.notification-text {
  font-size: 0.875rem;
  color: #2d3748;
}

.notification-time {
  font-size: 0.75rem;
  color: #a0aec0;
}

.empty {
  padding: 20px;
  text-align: center;
  color: #a0aec0;
  font-size: 0.875rem;
}
</style>
