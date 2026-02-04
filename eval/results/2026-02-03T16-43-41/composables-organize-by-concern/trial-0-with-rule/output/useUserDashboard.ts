import { ref, computed, reactive } from 'vue'

interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
}

interface NotificationPreferences {
  email: boolean
  push: boolean
  sms: boolean
}

interface ActivityLogEntry {
  id: string
  action: string
  timestamp: Date
  details: string
}

interface ActivityPagination {
  page: number
  pageSize: number
  total: number
}

export function useUserDashboard() {
  // User Profile
  const userProfile = ref<UserProfile | null>(null)
  const profileLoading = ref(false)
  const profileError = ref<string | null>(null)

  async function fetchUserProfile(userId: string) {
    profileLoading.value = true
    profileError.value = null
    try {
      const response = await fetch(`/api/users/${userId}`)
      if (!response.ok) throw new Error('Failed to fetch profile')
      userProfile.value = await response.json()
    } catch (err) {
      profileError.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      profileLoading.value = false
    }
  }

  // Notification Preferences
  const notificationPreferences = reactive<NotificationPreferences>({
    email: true,
    push: true,
    sms: false,
  })
  const preferencesSaving = ref(false)
  const preferencesError = ref<string | null>(null)

  async function saveNotificationPreferences() {
    if (!userProfile.value) return
    preferencesSaving.value = true
    preferencesError.value = null
    try {
      const response = await fetch(`/api/users/${userProfile.value.id}/preferences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPreferences),
      })
      if (!response.ok) throw new Error('Failed to save preferences')
    } catch (err) {
      preferencesError.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      preferencesSaving.value = false
    }
  }

  // Activity Log
  const activityLog = ref<ActivityLogEntry[]>([])
  const activityLoading = ref(false)
  const activityPagination = reactive<ActivityPagination>({
    page: 1,
    pageSize: 10,
    total: 0,
  })

  const hasMoreActivities = computed(() => {
    return activityPagination.page * activityPagination.pageSize < activityPagination.total
  })

  async function fetchActivityLog(page = 1) {
    if (!userProfile.value) return
    activityLoading.value = true
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(activityPagination.pageSize),
      })
      const response = await fetch(`/api/users/${userProfile.value.id}/activity?${params}`)
      if (!response.ok) throw new Error('Failed to fetch activity')
      const data = await response.json()
      activityLog.value = page === 1 ? data.items : [...activityLog.value, ...data.items]
      activityPagination.page = page
      activityPagination.total = data.total
    } catch (err) {
      console.error('Activity fetch error:', err)
    } finally {
      activityLoading.value = false
    }
  }

  async function loadMoreActivities() {
    if (hasMoreActivities.value && !activityLoading.value) {
      await fetchActivityLog(activityPagination.page + 1)
    }
  }

  return {
    // User Profile
    userProfile,
    profileLoading,
    profileError,
    fetchUserProfile,

    // Notification Preferences
    notificationPreferences,
    preferencesSaving,
    preferencesError,
    saveNotificationPreferences,

    // Activity Log
    activityLog,
    activityLoading,
    activityPagination,
    hasMoreActivities,
    fetchActivityLog,
    loadMoreActivities,
  }
}
