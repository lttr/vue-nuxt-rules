import { ref, computed, reactive } from 'vue'

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface NotificationPreferences {
  email: boolean
  push: boolean
  sms: boolean
}

export interface ActivityLogEntry {
  id: string
  action: string
  timestamp: Date
  details?: string
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
    push: false,
    sms: false,
  })
  const savingPreferences = ref(false)

  async function saveNotificationPreferences() {
    if (!userProfile.value) return
    savingPreferences.value = true
    try {
      await fetch(`/api/users/${userProfile.value.id}/notifications`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPreferences),
      })
    } finally {
      savingPreferences.value = false
    }
  }

  // Activity Log with Pagination
  const activityLog = ref<ActivityLogEntry[]>([])
  const activityPage = ref(1)
  const activityPageSize = ref(10)
  const activityTotal = ref(0)
  const activityLoading = ref(false)

  const hasMoreActivities = computed(() => {
    return activityPage.value * activityPageSize.value < activityTotal.value
  })

  async function fetchActivityLog(page = 1) {
    if (!userProfile.value) return
    activityLoading.value = true
    activityPage.value = page
    try {
      const response = await fetch(
        `/api/users/${userProfile.value.id}/activity?page=${page}&limit=${activityPageSize.value}`
      )
      const data = await response.json()
      activityLog.value = data.items
      activityTotal.value = data.total
    } finally {
      activityLoading.value = false
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
    savingPreferences,
    saveNotificationPreferences,

    // Activity Log
    activityLog,
    activityPage,
    activityPageSize,
    activityTotal,
    activityLoading,
    hasMoreActivities,
    fetchActivityLog,
  }
}
