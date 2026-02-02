import { ref, reactive, computed } from 'vue'

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

export interface ActivityLogEntry {
  id: string
  action: string
  timestamp: string
  details: string
}

export function useUserDashboard() {
  // --- State ---
  const userProfile = ref<UserProfile | null>(null)
  const isLoadingProfile = ref(false)
  const notificationPreferences = reactive<NotificationPreferences>({
    email: true,
    push: false,
    sms: false,
    frequency: 'daily',
  })
  const activityLog = ref<ActivityLogEntry[]>([])
  const activityPage = ref(1)
  const activityPageSize = ref(10)
  const activityTotal = ref(0)
  const isSavingPreferences = ref(false)
  const isLoadingActivity = ref(false)
  const error = ref<string | null>(null)

  // --- Metadata ---
  const hasMoreActivity = computed(
    () => activityPage.value * activityPageSize.value < activityTotal.value
  )
  const totalActivityPages = computed(
    () => Math.ceil(activityTotal.value / activityPageSize.value)
  )

  // --- Methods ---
  async function fetchUserProfile(userId: string) {
    isLoadingProfile.value = true
    error.value = null
    try {
      const response = await fetch(`/api/users/${userId}`)
      if (!response.ok) throw new Error('Failed to fetch user profile')
      userProfile.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isLoadingProfile.value = false
    }
  }

  async function saveNotificationPreferences() {
    if (!userProfile.value) return
    isSavingPreferences.value = true
    error.value = null
    try {
      const response = await fetch(
        `/api/users/${userProfile.value.id}/notifications`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(notificationPreferences),
        }
      )
      if (!response.ok) throw new Error('Failed to save notification preferences')
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
    } finally {
      isSavingPreferences.value = false
    }
  }

  async function fetchActivityLog(page?: number) {
    if (!userProfile.value) return
    if (page !== undefined) activityPage.value = page
    isLoadingActivity.value = true
    error.value = null
    try {
      const params = new URLSearchParams({
        page: String(activityPage.value),
        pageSize: String(activityPageSize.value),
      })
      const response = await fetch(
        `/api/users/${userProfile.value.id}/activity?${params}`
      )
      if (!response.ok) throw new Error('Failed to fetch activity log')
      const data = await response.json()
      activityLog.value = data.items
      activityTotal.value = data.total
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error'
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
    activityTotal,
    isSavingPreferences,
    isLoadingActivity,
    error,
    hasMoreActivity,
    totalActivityPages,
    fetchUserProfile,
    saveNotificationPreferences,
    fetchActivityLog,
  }
}
