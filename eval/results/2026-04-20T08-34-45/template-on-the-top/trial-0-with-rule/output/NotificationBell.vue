<template>
  <div class="notification-bell" ref="bellRef">
    <button class="bell-btn" @click="toggleDropdown" aria-label="Notifications">
      <span class="bell-icon">🔔</span>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
    </button>

    <div v-if="open" class="dropdown">
      <div class="dropdown-header">
        <span>Notifications</span>
        <button v-if="unreadCount > 0" class="mark-all-btn" @click="markAllRead">Mark all read</button>
      </div>

      <ul v-if="notifications.length > 0" class="notification-list">
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

      <p v-else class="empty">No notifications</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  notifications: {
    type: Array,
    default: () => []
  }
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

function handleOutsideClick(e) {
  if (bellRef.value && !bellRef.value.contains(e.target)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', handleOutsideClick))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleOutsideClick))
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
  font-size: 22px;
  line-height: 1;
}

.bell-btn:hover .bell-icon {
  opacity: 0.75;
}

.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #e53e3e;
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
  pointer-events: none;
}

.dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  width: 300px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  z-index: 100;
  overflow: hidden;
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  font-weight: 600;
  font-size: 14px;
  border-bottom: 1px solid #e2e8f0;
  background: #f7fafc;
}

.mark-all-btn {
  background: none;
  border: none;
  color: #3182ce;
  font-size: 12px;
  cursor: pointer;
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
  font-size: 13px;
  color: #2d3748;
}

.notification-time {
  font-size: 11px;
  color: #a0aec0;
}

.empty {
  padding: 20px;
  text-align: center;
  color: #a0aec0;
  font-size: 13px;
  margin: 0;
}
</style>
