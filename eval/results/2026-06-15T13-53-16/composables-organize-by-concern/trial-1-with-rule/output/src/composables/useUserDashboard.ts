import { ref, computed } from 'vue'

// --- Types --------------------------------------------------------------

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

// --- Composable ---------------------------------------------------------

export function useUserDashboard(userId: string) {
  // === User profile concern =============================================
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

  // === Notification preferences concern =================================
  const preferences = ref<NotificationPreferences>({
    email: true,
    push: false,
    sms: false,
  })
  const isSavingPreferences = ref(false)

  async function savePreferences() {
    isSavingPreferences.value = true
    try {
      const res = await fetch(`/api/users/${userId}/preferences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences.value),
      })
      if (!res.ok) throw new Error(`Failed to save preferences (${res.status})`)
      return true
    } catch {
      return false
    } finally {
      isSavingPreferences.value = false
    }
  }

  // === Activity log concern (paginated) =================================
  const activities = ref<ActivityEntry[]>([])
  const activityPage = ref(1)
  const activityPageSize = ref(10)
  const activityTotal = ref(0)

  const totalActivityPages = computed(() =>
    Math.max(1, Math.ceil(activityTotal.value / activityPageSize.value)),
  )
  const hasNextActivityPage = computed(
    () => activityPage.value < totalActivityPages.value,
  )

  async function loadActivityPage(page = activityPage.value) {
    const res = await fetch(
      `/api/users/${userId}/activity?page=${page}&size=${activityPageSize.value}`,
    )
    if (!res.ok) throw new Error(`Failed to load activity (${res.status})`)
    const data = (await res.json()) as { items: ActivityEntry[]; total: number }
    activities.value = data.items
    activityTotal.value = data.total
    activityPage.value = page
  }

  function nextActivityPage() {
    if (hasNextActivityPage.value) {
      return loadActivityPage(activityPage.value + 1)
    }
  }

  return {
    // profile
    profile,
    isProfileLoading,
    profileError,
    displayName,
    loadProfile,
    // notification preferences
    preferences,
    isSavingPreferences,
    savePreferences,
    // activity log
    activities,
    activityPage,
    activityPageSize,
    activityTotal,
    totalActivityPages,
    hasNextActivityPage,
    loadActivityPage,
    nextActivityPage,
  }
}
