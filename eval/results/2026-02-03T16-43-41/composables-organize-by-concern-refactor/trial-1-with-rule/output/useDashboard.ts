// useDashboard.ts
export function useDashboard() {
  // User concern
  const user = ref(null)
  const fetchUser = async () => { /* ... */ }

  // Posts concern
  const posts = ref([])
  const fetchPosts = async () => { /* ... */ }

  // Notifications concern
  const notifications = ref([])
  const fetchNotifications = async () => { /* ... */ }

  return { user, posts, notifications, fetchUser, fetchPosts, fetchNotifications }
}
