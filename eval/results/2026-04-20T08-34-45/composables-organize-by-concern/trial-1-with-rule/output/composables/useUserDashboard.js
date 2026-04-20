import { ref, computed } from 'vue'

export function useUserDashboard() {
  // --- User Profile ---
  const profile = ref(null)
  const profileLoading = ref(false)
  const profileError = ref(null)

  async function fetchProfile(userId) {
    profileLoading.value = true
    profileError.value = null
    try {
      const res = await fetch(`/api/users/${userId}`)
      if (!res.ok) throw new Error('Failed to load profile')
      profile.value = await res.json()
    } catch (err) {
      profileError.value = err.message
    } finally {
      profileLoading.value = false
    }
  }

  // --- Notification Preferences ---
  const notificationPrefs = ref({
    email: true,
    push: false,
    sms: false,
    digest: 'daily',
  })
  const prefsSaving = ref(false)
  const prefsSaveError = ref(null)

  async function saveNotificationPrefs() {
    prefsSaving.value = true
    prefsSaveError.value = null
    try {
      const res = await fetch('/api/users/notification-prefs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPrefs.value),
      })
      if (!res.ok) throw new Error('Failed to save preferences')
    } catch (err) {
      prefsSaveError.value = err.message
    } finally {
      prefsSaving.value = false
    }
  }

  // --- Activity Log ---
  const activityLog = ref([])
  const activityPage = ref(1)
  const activityPageSize = ref(20)
  const activityTotal = ref(0)
  const activityLoading = ref(false)
  const activityError = ref(null)

  const totalPages = computed(() =>
    Math.ceil(activityTotal.value / activityPageSize.value)
  )
  const hasNextPage = computed(() => activityPage.value < totalPages.value)
  const hasPrevPage = computed(() => activityPage.value > 1)

  async function fetchActivityLog(userId) {
    activityLoading.value = true
    activityError.value = null
    try {
      const params = new URLSearchParams({
        page: activityPage.value,
        pageSize: activityPageSize.value,
      })
      const res = await fetch(`/api/users/${userId}/activity?${params}`)
      if (!res.ok) throw new Error('Failed to load activity log')
      const data = await res.json()
      activityLog.value = data.items
      activityTotal.value = data.total
    } catch (err) {
      activityError.value = err.message
    } finally {
      activityLoading.value = false
    }
  }

  async function goToPage(userId, page) {
    if (page < 1 || page > totalPages.value) return
    activityPage.value = page
    await fetchActivityLog(userId)
  }

  return {
    // profile
    profile,
    profileLoading,
    profileError,
    fetchProfile,

    // notification prefs
    notificationPrefs,
    prefsSaving,
    prefsSaveError,
    saveNotificationPrefs,

    // activity log
    activityLog,
    activityPage,
    activityPageSize,
    activityTotal,
    activityLoading,
    activityError,
    totalPages,
    hasNextPage,
    hasPrevPage,
    fetchActivityLog,
    goToPage,
  }
}
