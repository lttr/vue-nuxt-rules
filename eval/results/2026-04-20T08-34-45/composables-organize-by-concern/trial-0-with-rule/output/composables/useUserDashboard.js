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
      if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`)
      profile.value = await res.json()
    } catch (err) {
      profileError.value = err.message
    } finally {
      profileLoading.value = false
    }
  }

  async function updateProfile(patch) {
    profileLoading.value = true
    profileError.value = null
    try {
      const res = await fetch(`/api/users/${profile.value.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
      })
      if (!res.ok) throw new Error(`Failed to update profile: ${res.status}`)
      profile.value = { ...profile.value, ...(await res.json()) }
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
  const prefsError = ref(null)
  const prefsSaved = ref(false)

  async function saveNotificationPrefs() {
    prefsSaving.value = true
    prefsError.value = null
    prefsSaved.value = false
    try {
      const res = await fetch(`/api/users/${profile.value?.id}/notification-prefs`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPrefs.value),
      })
      if (!res.ok) throw new Error(`Failed to save preferences: ${res.status}`)
      notificationPrefs.value = await res.json()
      prefsSaved.value = true
    } catch (err) {
      prefsError.value = err.message
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

  async function fetchActivityLog(page = activityPage.value) {
    activityLoading.value = true
    activityError.value = null
    try {
      const params = new URLSearchParams({
        page,
        pageSize: activityPageSize.value,
      })
      const res = await fetch(`/api/users/${profile.value?.id}/activity?${params}`)
      if (!res.ok) throw new Error(`Failed to fetch activity: ${res.status}`)
      const data = await res.json()
      activityLog.value = data.items
      activityTotal.value = data.total
      activityPage.value = page
    } catch (err) {
      activityError.value = err.message
    } finally {
      activityLoading.value = false
    }
  }

  function nextPage() {
    if (hasNextPage.value) fetchActivityLog(activityPage.value + 1)
  }

  function prevPage() {
    if (hasPrevPage.value) fetchActivityLog(activityPage.value - 1)
  }

  return {
    // profile
    profile,
    profileLoading,
    profileError,
    fetchProfile,
    updateProfile,

    // notification prefs
    notificationPrefs,
    prefsSaving,
    prefsError,
    prefsSaved,
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
    nextPage,
    prevPage,
  }
}
