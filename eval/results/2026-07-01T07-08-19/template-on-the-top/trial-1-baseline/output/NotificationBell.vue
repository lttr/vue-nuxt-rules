<template>
  <div class="notification-bell">
    <button class="bell-button" @click="toggleDropdown" aria-label="Notifications">
      <span class="bell-icon">🔔</span>
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount > 99 ? '99+' : unreadCount }}</span>
    </button>

    <div v-if="isOpen" class="dropdown">
      <div class="dropdown-header">Notifications</div>
      <ul v-if="notifications.length" class="notification-list">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ unread: !notification.read }"
        >
          <div class="notification-title">{{ notification.title }}</div>
          <div class="notification-message">{{ notification.message }}</div>
          <div class="notification-time">{{ notification.time }}</div>
        </li>
      </ul>
      <div v-else class="empty-state">No notifications</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  notifications: {
    type: Array,
    default: () => []
  }
})

const isOpen = ref(false)

const unreadCount = computed(() => props.notifications.filter(n => !n.read).length)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}
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
  font-size: 1.5rem;
  padding: 0.25rem;
}

.bell-icon {
  display: inline-block;
}

.badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #e53e3e;
  color: #fff;
  border-radius: 999px;
  font-size: 0.7rem;
  line-height: 1;
  padding: 2px 5px;
  font-weight: bold;
}

.dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  width: 280px;
  max-height: 320px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
}

.dropdown-header {
  padding: 10px 12px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}

.notification-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.notification-item {
  padding: 10px 12px;
  border-bottom: 1px solid #f0f0f0;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item.unread {
  background: #f5f9ff;
}

.notification-title {
  font-weight: 600;
  font-size: 0.9rem;
}

.notification-message {
  font-size: 0.85rem;
  color: #555;
  margin-top: 2px;
}

.notification-time {
  font-size: 0.75rem;
  color: #999;
  margin-top: 4px;
}

.empty-state {
  padding: 16px;
  text-align: center;
  color: #999;
  font-size: 0.9rem;
}
</style>
