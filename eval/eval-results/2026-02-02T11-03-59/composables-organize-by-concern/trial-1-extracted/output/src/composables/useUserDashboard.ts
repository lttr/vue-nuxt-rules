import { ref, computed, reactive } from 'vue'

export interface UserProfile {
  id: string
  name: string
  email: string
  avatarUrl: string
}

export interface NotificationPreferences {
  email: boolean
  push: boolean
  sms: boolean
  frequency: 'immediate' | 'daily' | 'weekly'
}

export interface ActivityEntry {
  id: string
  action: string
  timestamp: string
}

export function useUserDashboard() {
  // --- State ---
  const userProfile = ref<UserProfile | null>(null)
  const isLoadingProfile = ref(false)
  const notificationPreferences = reactive<NotificationPreferences>({
    email: true,
    push: false,
    sms: false,
    frequency: 'immediate',
  })
  const activityLog = ref<ActivityEntry[]>([])
  const activityPage = ref(1)
  const activityPageSize = ref(10)
  const isLoadingActivity = ref(false)
  const isSavingPreferences = ref(false)
  const profileError = ref<string | null>(null)

  // --- Metadata ---
  const hasMoreActivities = computed(() => activityLog.value.length === activityPageSize.value)
  const totalActivitiesLoaded = computed(() => (activityPage.value - 1) * activityPageSize.value + activityLog.value.length)

  // --- Methods ---
  async function fetchUserProfile(userId: string) {
    isLoadingProfile.value = true
    profileError.value = null
    try {
      const response = await fetch(`/api/users/${userId}`)
      if (!response.ok) throw new Error(`Failed to fetch profile: ${response.statusText}`)
      userProfile.value = await response.json()
    } catch (err) {
      profileError.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      isLoadingProfile.value = false
    }
  }

  async function saveNotificationPreferences() {
    isSavingPreferences.value = true
    try {
      const response = await fetch('/api/notifications/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPreferences),
      })
      if (!response.ok) throw new Error(`Failed to save preferences: ${response.statusText}`)
    } finally {
      isSavingPreferences.value = false
    }
  }

  async function fetchActivityLog(page?: number) {
    if (page !== undefined) activityPage.value = page
    isLoadingActivity.value = true
    try {
      const params = new URLSearchParams({
        page: String(activityPage.value),
        pageSize: String(activityPageSize.value),
      })
      const response = await fetch(`/api/activity?${params}`)
      if (!response.ok) throw new Error(`Failed to fetch activity: ${response.statusText}`)
      activityLog.value = await response.json()
    } finally {
      isLoadingActivity.value = false
    }
  }

  // --- Return ---
  return {
    userProfile,
    isLoadingProfile,
    notificationPreferences,
    activityLog,
    activityPage,
    activityPageSize,
    isLoadingActivity,
    isSavingPreferences,
    profileError,
    hasMoreActivities,
    totalActivitiesLoaded,
    fetchUserProfile,
    saveNotificationPreferences,
    fetchActivityLog,
  }
}
