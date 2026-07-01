import { ref, reactive } from 'vue'

const ACTIVITY_PAGE_SIZE = 10

export function useUserDashboard() {
  // profile
  const profile = ref(null)
  const isProfileLoading = ref(false)
  const profileError = ref(null)

  // notification preferences
  const notificationPreferences = reactive({
    email: true,
    push: true,
    sms: false,
  })
  const isSavingPreferences = ref(false)

  // activity log / pagination
  const activityLog = ref([])
  const activityPage = ref(1)
  const hasMoreActivity = ref(true)
  const isActivityLoading = ref(false)

  async function fetchProfile(userId) {
    isProfileLoading.value = true
    profileError.value = null
    try {
      const res = await fetch(`/api/users/${userId}`)
      if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`)
      profile.value = await res.json()
    } catch (err) {
      profileError.value = err.message
    } finally {
      isProfileLoading.value = false
    }
  }

  async function saveNotificationPreferences() {
    isSavingPreferences.value = true
    try {
      const res = await fetch('/api/users/notification-preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPreferences),
      })
      if (!res.ok) throw new Error(`Failed to save preferences: ${res.status}`)
      return await res.json()
    } finally {
      isSavingPreferences.value = false
    }
  }

  async function fetchActivityLog({ reset = false } = {}) {
    if (reset) {
      activityPage.value = 1
      activityLog.value = []
      hasMoreActivity.value = true
    }
    if (!hasMoreActivity.value || isActivityLoading.value) return

    isActivityLoading.value = true
    try {
      const res = await fetch(
        `/api/users/activity?page=${activityPage.value}&pageSize=${ACTIVITY_PAGE_SIZE}`
      )
      if (!res.ok) throw new Error(`Failed to fetch activity: ${res.status}`)
      const { items, hasMore } = await res.json()
      activityLog.value.push(...items)
      hasMoreActivity.value = hasMore
      activityPage.value += 1
    } finally {
      isActivityLoading.value = false
    }
  }

  return {
    profile,
    isProfileLoading,
    profileError,
    notificationPreferences,
    isSavingPreferences,
    activityLog,
    activityPage,
    hasMoreActivity,
    isActivityLoading,
    fetchProfile,
    saveNotificationPreferences,
    fetchActivityLog,
  }
}
