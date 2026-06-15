import { ref, computed } from 'vue'

export interface UserProfile {
  id: string
  name: string
  email: string
  avatarUrl?: string
}

export interface NotificationPreferences {
  email: boolean
  push: boolean
  sms: boolean
}

export interface ActivityEntry {
  id: string
  action: string
  timestamp: string
}

/**
 * Composable managing a user dashboard: profile, notification preferences,
 * and a paginated activity log.
 *
 * Code is grouped by concern (profile / notifications / activity) rather than
 * by Vue API type, so each feature's state and behaviour live together.
 */
export function useUserDashboard(userId: string) {
  // --- Profile --------------------------------------------------------------
  const profile = ref<UserProfile | null>(null)
  const isProfileLoading = ref(false)
  const profileError = ref<string | null>(null)

  const displayName = computed(() => profile.value?.name ?? 'Guest')

  async function loadProfile() {
    isProfileLoading.value = true
    profileError.value = null
    try {
      const res = await fetch(`/api/users/${userId}`)
      if (!res.ok) throw new Error(`Failed to load profile (${res.status})`)
      profile.value = (await res.json()) as UserProfile
    } catch (err) {
      profileError.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      isProfileLoading.value = false
    }
  }

  // --- Notification preferences ---------------------------------------------
  const notificationPrefs = ref<NotificationPreferences>({
    email: true,
    push: false,
    sms: false,
  })
  const isSavingPrefs = ref(false)

  async function saveNotificationPrefs() {
    isSavingPrefs.value = true
    try {
      const res = await fetch(`/api/users/${userId}/notifications`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPrefs.value),
      })
      if (!res.ok) throw new Error(`Failed to save preferences (${res.status})`)
      return true
    } catch {
      return false
    } finally {
      isSavingPrefs.value = false
    }
  }

  // --- Activity log (paginated) ---------------------------------------------
  const activityLog = ref<ActivityEntry[]>([])
  const activityPage = ref(1)
  const activityPageSize = ref(20)
  const activityTotal = ref(0)
  const isActivityLoading = ref(false)

  const totalActivityPages = computed(() =>
    Math.max(1, Math.ceil(activityTotal.value / activityPageSize.value)),
  )

  async function fetchActivityPage(page = activityPage.value) {
    isActivityLoading.value = true
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(activityPageSize.value),
      })
      const res = await fetch(`/api/users/${userId}/activity?${params}`)
      if (!res.ok) throw new Error(`Failed to load activity (${res.status})`)
      const data = (await res.json()) as { items: ActivityEntry[]; total: number }
      activityLog.value = data.items
      activityTotal.value = data.total
      activityPage.value = page
    } finally {
      isActivityLoading.value = false
    }
  }

  function nextActivityPage() {
    if (activityPage.value < totalActivityPages.value) {
      return fetchActivityPage(activityPage.value + 1)
    }
  }

  function prevActivityPage() {
    if (activityPage.value > 1) {
      return fetchActivityPage(activityPage.value - 1)
    }
  }

  return {
    // profile
    profile,
    isProfileLoading,
    profileError,
    displayName,
    loadProfile,
    // notifications
    notificationPrefs,
    isSavingPrefs,
    saveNotificationPrefs,
    // activity
    activityLog,
    activityPage,
    activityPageSize,
    activityTotal,
    isActivityLoading,
    totalActivityPages,
    fetchActivityPage,
    nextActivityPage,
    prevActivityPage,
  }
}
