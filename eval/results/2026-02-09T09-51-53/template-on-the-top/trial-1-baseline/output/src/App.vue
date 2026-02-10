<template>
  <div class="app">
    <header class="header">
      <span class="app-title">My App</span>
      <NotificationBell
        :notifications="notifications"
        @mark-read="markRead"
        @mark-all-read="markAllRead"
      />
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NotificationBell from './components/NotificationBell.vue'

const notifications = ref([
  { id: 1, message: 'You have a new follower', time: '2 min ago', read: false },
  { id: 2, message: 'Your report is ready to download', time: '1 hour ago', read: false },
  { id: 3, message: 'New comment on your post', time: '3 hours ago', read: false },
  { id: 4, message: 'System maintenance scheduled for tonight', time: '5 hours ago', read: true },
  { id: 5, message: 'Welcome to the platform!', time: '1 day ago', read: true },
])

function markRead(id) {
  const notification = notifications.value.find((n) => n.id === id)
  if (notification) {
    notification.read = true
  }
}

function markAllRead() {
  notifications.value.forEach((n) => {
    n.read = true
  })
}
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.app {
  min-height: 100vh;
  background: #f9fafb;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.app-title {
  font-weight: 600;
  font-size: 18px;
  color: #111827;
}
</style>
