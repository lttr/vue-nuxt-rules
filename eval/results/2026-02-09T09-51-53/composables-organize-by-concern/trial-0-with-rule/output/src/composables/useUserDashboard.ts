import { ref, reactive, computed } from 'vue'
import type {
  UserProfile,
  NotificationPreferences,
  ActivityLogEntry,
  ActivityPage,
} from './types'

export function useUserDashboard(userId: string) {
  // --- User Profile ---

  const profile = ref<UserProfile | null>(null)
  const profileLoading = ref(false)
  const profileError = ref<string | null>(null)

  async function fetchProfile() {
    profileLoading.value = true
    profileError.value = null
    try {
      const res = await fetch(`/api/users/${userId}/profile`)
      if (!res.ok) throw new Error(`Failed to fetch profile: ${res.statusText}`)
      profile.value = await res.json()
    } catch (err) {
      profileError.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      profileLoading.value = false
    }
  }

  // --- Notification Preferences ---

  const notificationPreferences = reactive<NotificationPreferences>({
    email: true,
    push: true,
    sms: false,
    digest: 'daily',
  })
  const preferencesSaving = ref(false)
  const preferencesDirty = ref(false)

  function updatePreferences(updates: Partial<NotificationPreferences>) {
    Object.assign(notificationPreferences, updates)
    preferencesDirty.value = true
  }

  async function savePreferences() {
    preferencesSaving.value = true
    try {
      const res = await fetch(`/api/users/${userId}/notifications`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPreferences),
      })
      if (!res.ok) throw new Error(`Failed to save preferences: ${res.statusText}`)
      preferencesDirty.value = false
    } finally {
      preferencesSaving.value = false
    }
  }

  // --- Activity Log ---

  const activityLog = ref<ActivityLogEntry[]>([])
  const activityPage = ref(1)
  const activityPageSize = ref(20)
  const activityTotal = ref(0)
  const activityLoading = ref(false)

  const activityTotalPages = computed(() =>
    Math.max(1, Math.ceil(activityTotal.value / activityPageSize.value))
  )

  async function fetchActivityLog(page?: number) {
    if (page !== undefined) {
      activityPage.value = page
    }
    activityLoading.value = true
    try {
      const params = new URLSearchParams({
        page: String(activityPage.value),
        pageSize: String(activityPageSize.value),
      })
      const res = await fetch(`/api/users/${userId}/activity?${params}`)
      if (!res.ok) throw new Error(`Failed to fetch activity: ${res.statusText}`)
      const data: ActivityPage = await res.json()
      activityLog.value = data.entries
      activityTotal.value = data.total
    } finally {
      activityLoading.value = false
    }
  }

  return {
    // User Profile
    profile,
    profileLoading,
    profileError,
    fetchProfile,

    // Notification Preferences
    notificationPreferences,
    preferencesSaving,
    preferencesDirty,
    updatePreferences,
    savePreferences,

    // Activity Log
    activityLog,
    activityPage,
    activityPageSize,
    activityTotal,
    activityTotalPages,
    activityLoading,
    fetchActivityLog,
  }
}
