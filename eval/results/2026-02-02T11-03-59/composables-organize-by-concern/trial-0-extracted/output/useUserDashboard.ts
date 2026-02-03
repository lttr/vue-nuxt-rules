import { ref, computed, type Ref } from 'vue'

interface UserProfile {
  id: string
  name: string
  email: string
  avatarUrl: string
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

export function useUserDashboard() {
  // --- state ---
  const userProfile: Ref<UserProfile | null> = ref(null)
  const isLoadingProfile = ref(false)
  const notificationPreferences = ref<NotificationPreferences>({
    email: true,
    push: true,
    sms: false,
  })
  const activityLog = ref<ActivityEntry[]>([])
  const activityPage = ref(1)
  const activityPageSize = ref(10)
  const isLoadingActivity = ref(false)
  const profileError = ref<string | null>(null)

  // --- metadata ---
  const hasMoreActivity = computed(() =>
    activityLog.value.length === activityPageSize.value
  )
  const totalActivitiesLoaded = computed(() =>
    (activityPage.value - 1) * activityPageSize.value + activityLog.value.length
  )

  // --- methods ---
  async function fetchProfile(userId: string) {
    isLoadingProfile.value = true
    profileError.value = null
    try {
      const res = await fetch(`/api/users/${userId}`)
      if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`)
      userProfile.value = await res.json()
    } catch (e: any) {
      profileError.value = e.message ?? 'Unknown error'
    } finally {
      isLoadingProfile.value = false
    }
  }

  async function saveNotificationPreferences() {
    if (!userProfile.value) return
    const res = await fetch(`/api/users/${userProfile.value.id}/notifications`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notificationPreferences.value),
    })
    if (!res.ok) throw new Error(`Failed to save preferences: ${res.status}`)
  }

  async function fetchActivityLog(page?: number) {
    if (!userProfile.value) return
    if (page !== undefined) activityPage.value = page
    isLoadingActivity.value = true
    try {
      const params = new URLSearchParams({
        page: String(activityPage.value),
        pageSize: String(activityPageSize.value),
      })
      const res = await fetch(
        `/api/users/${userProfile.value.id}/activity?${params}`
      )
      if (!res.ok) throw new Error(`Failed to fetch activity: ${res.status}`)
      activityLog.value = await res.json()
    } finally {
      isLoadingActivity.value = false
    }
  }

  // --- return ---
  return {
    userProfile,
    isLoadingProfile,
    notificationPreferences,
    activityLog,
    activityPage,
    activityPageSize,
    isLoadingActivity,
    profileError,
    hasMoreActivity,
    totalActivitiesLoaded,
    fetchProfile,
    saveNotificationPreferences,
    fetchActivityLog,
  }
}
