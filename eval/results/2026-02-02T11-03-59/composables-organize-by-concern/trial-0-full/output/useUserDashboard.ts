import { ref, computed, type Ref } from 'vue'

interface User {
  id: string
  name: string
  email: string
  avatar: string | null
}

interface NotificationPreferences {
  email: boolean
  push: boolean
  sms: boolean
}

interface ActivityEntry {
  id: string
  action: string
  timestamp: string
}

export function useUserDashboard(userId: Ref<string>) {
  // --- User profile concern ---
  const user = ref<User | null>(null)
  const profileLoading = ref(false)
  const profileError = ref<string | null>(null)

  const fetchProfile = async () => {
    profileLoading.value = true
    profileError.value = null
    try {
      const res = await fetch(`/api/users/${userId.value}`)
      if (!res.ok) throw new Error('Failed to fetch profile')
      user.value = await res.json()
    } catch (e) {
      profileError.value = (e as Error).message
    } finally {
      profileLoading.value = false
    }
  }

  // --- Notification preferences concern ---
  const notifications = ref<NotificationPreferences>({
    email: true,
    push: false,
    sms: false,
  })
  const notificationsSaving = ref(false)

  const saveNotifications = async () => {
    notificationsSaving.value = true
    try {
      const res = await fetch(`/api/users/${userId.value}/notifications`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notifications.value),
      })
      if (!res.ok) throw new Error('Failed to save notification preferences')
    } finally {
      notificationsSaving.value = false
    }
  }

  // --- Activity log concern ---
  const activities = ref<ActivityEntry[]>([])
  const activityPage = ref(1)
  const activityLoading = ref(false)
  const hasMoreActivities = ref(true)
  const totalActivities = computed(() => activities.value.length)

  const fetchActivities = async (page = activityPage.value) => {
    activityLoading.value = true
    try {
      const res = await fetch(
        `/api/users/${userId.value}/activities?page=${page}&limit=20`,
      )
      if (!res.ok) throw new Error('Failed to fetch activities')
      const data: ActivityEntry[] = await res.json()
      if (page === 1) {
        activities.value = data
      } else {
        activities.value = [...activities.value, ...data]
      }
      hasMoreActivities.value = data.length === 20
      activityPage.value = page
    } finally {
      activityLoading.value = false
    }
  }

  const loadMoreActivities = () => {
    if (!activityLoading.value && hasMoreActivities.value) {
      return fetchActivities(activityPage.value + 1)
    }
  }

  return {
    // Profile
    user,
    profileLoading,
    profileError,
    fetchProfile,
    // Notifications
    notifications,
    notificationsSaving,
    saveNotifications,
    // Activity log
    activities,
    activityPage,
    activityLoading,
    hasMoreActivities,
    totalActivities,
    fetchActivities,
    loadMoreActivities,
  }
}
