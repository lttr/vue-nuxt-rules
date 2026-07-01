<template>
  <div class="notification-bell">
    <button class="bell-button" @click="toggleDropdown">
      🔔
      <span v-if="unreadCount > 0" class="badge">{{ unreadCount }}</span>
    </button>

    <div v-if="isOpen" class="dropdown">
      <div v-if="notifications.length === 0" class="empty">
        No notifications
      </div>
      <ul v-else class="notification-list">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{ unread: !notification.read }"
        >
          <div class="notification-title">{{ notification.title }}</div>
          <div class="notification-time">{{ notification.time }}</div>
        </li>
      </ul>
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

const unreadCount = computed(
  () => props.notifications.filter((n) => !n.read).length
)

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
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: red;
  color: white;
  font-size: 0.7rem;
  border-radius: 50%;
  padding: 2px 6px;
  line-height: 1;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 8px;
  width: 260px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.empty {
  padding: 12px;
  text-align: center;
  color: #888;
}

.notification-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-item.unread {
  background: #f0f6ff;
}

.notification-title {
  font-size: 0.9rem;
  color: #222;
}

.notification-time {
  font-size: 0.75rem;
  color: #999;
  margin-top: 2px;
}
</style>
