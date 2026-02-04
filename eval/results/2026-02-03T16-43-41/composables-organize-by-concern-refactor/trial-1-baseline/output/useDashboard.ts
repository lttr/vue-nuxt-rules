// useDashboard.ts

import { ref } from 'vue'

// Focused composable for user data
function useUser() {
  const user = ref(null)
  const fetchUser = async () => { /* ... */ }
  return { user, fetchUser }
}

// Focused composable for posts data
function usePosts() {
  const posts = ref([])
  const fetchPosts = async () => { /* ... */ }
  return { posts, fetchPosts }
}

// Focused composable for notifications data
function useNotifications() {
  const notifications = ref([])
  const fetchNotifications = async () => { /* ... */ }
  return { notifications, fetchNotifications }
}

// Compose smaller composables together
export function useDashboard() {
  const { user, fetchUser } = useUser()
  const { posts, fetchPosts } = usePosts()
  const { notifications, fetchNotifications } = useNotifications()

  return { user, posts, notifications, fetchUser, fetchPosts, fetchNotifications }
}
