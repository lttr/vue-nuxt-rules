<template>
  <div class="notification-bell">
    <button class="bell-button" @click="isOpen = !isOpen">
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
          <div class="notification-message">{{ notification.message }}</div>
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
  () => props.notifications.filter(n => !n.read).length
)
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
  padding: 4px 8px;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #e53935;
  color: white;
  border-radius: 50%;
  font-size: 0.7rem;
  padding: 2px 6px;
  line-height: 1;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 8px;
  width: 280px;
  max-height: 320px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 10;
}

.empty {
  padding: 16px;
  text-align: center;
  color: #888;
}

.notification-list {
  list-style: none;
  margin: 0;
  padding: 0;
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
  font-weight: 600;
  font-size: 0.9rem;
}

.notification-message {
  font-size: 0.8rem;
  color: #555;
}
</style>
