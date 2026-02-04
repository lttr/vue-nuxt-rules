// useDashboard.ts

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

// Main composable that composes the focused ones
export function useDashboard() {
  const { user, fetchUser } = useUser()
  const { posts, fetchPosts } = usePosts()
  const { notifications, fetchNotifications } = useNotifications()

  return { user, posts, notifications, fetchUser, fetchPosts, fetchNotifications }
}
