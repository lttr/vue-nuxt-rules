<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  notifications: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['markAllRead', 'select'])

const isOpen = ref(false)

const unreadCount = computed(
  () => props.notifications.filter((n) => !n.read).length
)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function handleSelect(notification) {
  emit('select', notification)
}

function markAllRead() {
  emit('markAllRead')
}
</script>

<template>
  <div class="notification-bell" @keydown.esc="close">
    <button
      class="bell-button"
      type="button"
      :aria-label="`Notifications (${unreadCount} unread)`"
      @click="toggle"
    >
      <span class="bell-icon" aria-hidden="true">🔔</span>
      <span v-if="unreadCount > 0" class="badge">
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </button>

    <div v-if="isOpen" class="dropdown">
      <header class="dropdown-header">
        <span>Notifications</span>
        <button
          v-if="unreadCount > 0"
          type="button"
          class="mark-read"
          @click="markAllRead"
        >
          Mark all read
        </button>
      </header>

      <ul v-if="notifications.length" class="notification-list">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ unread: !notification.read }"
          @click="handleSelect(notification)"
        >
          <p class="notification-text">{{ notification.text }}</p>
          <span v-if="notification.time" class="notification-time">
            {{ notification.time }}
          </span>
        </li>
      </ul>

      <p v-else class="empty">No notifications</p>
    </div>
  </div>
</template>

<style scoped>
.notification-bell {
  position: relative;
  display: inline-block;
  font-family: sans-serif;
}

.bell-button {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  font-size: 20px;
  line-height: 1;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 9px;
  background: #e53935;
  color: #fff;
  font-size: 11px;
  line-height: 18px;
  text-align: center;
  box-sizing: border-box;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  width: 280px;
  margin-top: 6px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 100;
}

.dropdown-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  font-size: 14px;
}

.mark-read {
  background: none;
  border: none;
  color: #1e88e5;
  cursor: pointer;
  font-size: 12px;
}

.notification-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 320px;
  overflow-y: auto;
}

.notification-item {
  padding: 10px 12px;
  border-bottom: 1px solid #f2f2f2;
  cursor: pointer;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item:hover {
  background: #f7f7f7;
}

.notification-item.unread {
  background: #eef5ff;
}

.notification-text {
  margin: 0;
  font-size: 13px;
  color: #333;
}

.notification-time {
  display: block;
  margin-top: 2px;
  font-size: 11px;
  color: #999;
}

.empty {
  margin: 0;
  padding: 24px 12px;
  text-align: center;
  color: #999;
  font-size: 13px;
}
</style>
