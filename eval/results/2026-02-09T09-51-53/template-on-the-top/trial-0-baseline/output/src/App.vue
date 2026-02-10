<template>
  <div class="app">
    <header class="header">
      <h1>My App</h1>
      <NotificationBell
        :notifications="notifications"
        @mark-read="onMarkRead"
        @mark-all-read="onMarkAllRead"
      />
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NotificationBell from './components/NotificationBell.vue'

const notifications = ref([
  { id: 1, message: 'New comment on your post', time: '2 min ago', read: false },
  { id: 2, message: 'Alice sent you a friend request', time: '10 min ago', read: false },
  { id: 3, message: 'Your order has been shipped', time: '1 hour ago', read: false },
  { id: 4, message: 'Welcome to the platform!', time: '2 hours ago', read: true },
])

function onMarkRead(id) {
  const n = notifications.value.find((n) => n.id === id)
  if (n) n.read = true
}

function onMarkAllRead() {
  notifications.value.forEach((n) => (n.read = true))
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
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.header h1 {
  margin: 0;
  font-size: 18px;
  color: #111827;
}
</style>
