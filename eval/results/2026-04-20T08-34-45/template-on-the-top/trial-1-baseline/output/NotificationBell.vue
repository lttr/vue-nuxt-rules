<template>
  <div class="notification-bell" ref="bellRef">
    <button class="bell-button" @click="toggleDropdown" aria-label="Notifications">
      <svg class="bell-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
    </button>

    <div v-if="open" class="dropdown">
      <div class="dropdown-header">
        <span>Notifications</span>
        <button v-if="unreadCount > 0" class="mark-all" @click="markAllRead">Mark all read</button>
      </div>

      <ul class="notification-list" v-if="notifications.length > 0">
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  notifications: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['mark-read', 'mark-all-read'])

const open = ref(false)
const bellRef = ref(null)

const unreadCount = computed(() => props.notifications.filter(n => !n.read).length)

function toggleDropdown() {
  open.value = !open.value
}

function markRead(notification) {
  if (!notification.read) {
    emit('mark-read', notification.id)
  }
}

function markAllRead() {
  emit('mark-all-read')
}

function onClickOutside(e) {
  if (bellRef.value && !bellRef.value.contains(e.target)) {
    open.value = false
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
  border: none;
  cursor: pointer;
  padding: 8px;
  color: #374151;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.bell-button:hover {
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  line-height: 1;
}

.dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 6px);
  width: 320px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 100;
  overflow: hidden;
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 14px;
  color: #111827;
  border-bottom: 1px solid #e5e7eb;
}

.mark-all {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  color: #6366f1;
  padding: 0;
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

.notification-message {
  font-size: 13px;
  color: #111827;
  margin-bottom: 4px;
}

.notification-time {
  font-size: 11px;
  color: #9ca3af;
}

.empty {
  padding: 24px 16px;
  text-align: center;
  font-size: 13px;
  color: #9ca3af;
}
</style>
