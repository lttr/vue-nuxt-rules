<template>
  <div class="notification-bell">
    <button
      class="bell-button"
      :aria-label="`Notifications: ${unreadCount} unread`"
      @click="toggleDropdown"
    >
      <span class="bell-icon" aria-hidden="true">🔔</span>
      <span v-if="unreadCount > 0" class="badge">
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </button>

    <div v-if="isOpen" class="dropdown" role="menu">
      <div class="dropdown-header">
        <span>Notifications</span>
        <button
          v-if="unreadCount > 0"
          class="mark-read-btn"
          @click="markAllRead"
        >
          Mark all read
        </button>
      </div>

      <ul v-if="notifications.length > 0" class="notification-list">
        <li
          v-for="n in notifications"
          :key="n.id"
          class="notification-item"
          :class="{ unread: !n.read }"
          @click="handleClick(n)"
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
    default: () => []
  }
})

const emit = defineEmits(['read', 'read-all'])

const isOpen = ref(false)
const rootEl = ref(null)

const unreadCount = computed(
  () => props.notifications.filter(n => !n.read).length
)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function handleClick(n) {
  if (!n.read) emit('read', n.id)
}

function markAllRead() {
  emit('read-all')
}

function onDocClick(e) {
  if (!e.target.closest('.notification-bell')) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

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
  border-radius: 50%;
}

.bell-button:hover {
  background: #f0f0f0;
}

.badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #e53935;
  color: #fff;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: bold;
  min-width: 18px;
  text-align: center;
  line-height: 1;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  width: 320px;
  max-height: 400px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.dropdown-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  font-weight: 600;
}

.mark-read-btn {
  background: none;
  border: none;
  color: #1976d2;
  cursor: pointer;
  font-size: 12px;
}

.mark-read-btn:hover {
  text-decoration: underline;
}

.notification-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.notification-item {
  padding: 12px 16px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
}

.notification-item:hover {
  background: #fafafa;
}

.notification-item.unread {
  background: #f0f7ff;
}

.notification-item.unread:hover {
  background: #e3f0ff;
}

.notification-message {
  font-size: 14px;
  color: #222;
  margin-bottom: 4px;
}

.notification-time {
  font-size: 12px;
  color: #888;
}

.empty {
  padding: 24px;
  text-align: center;
  color: #888;
  font-size: 14px;
}
</style>
