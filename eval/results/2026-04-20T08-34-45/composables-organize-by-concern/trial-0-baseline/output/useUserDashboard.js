import { ref, reactive, computed } from 'vue'

const PAGE_SIZE = 10

export function useUserDashboard() {
  // --- Profile ---
  const profile = reactive({
    id: null,
    name: '',
    email: '',
    avatarUrl: '',
  })
  const profileLoading = ref(false)
  const profileError = ref(null)

  // --- Notification preferences ---
  const notificationPreferences = reactive({
    email: true,
    push: false,
    sms: false,
    frequency: 'daily', // 'realtime' | 'daily' | 'weekly'
  })
  const preferencesSaving = ref(false)
  const preferencesSaveError = ref(null)

  // --- Activity log ---
  const activityLog = ref([])
  const activityPage = ref(1)
  const activityTotalCount = ref(0)
  const activityLoading = ref(false)

  const activityTotalPages = computed(() =>
    Math.ceil(activityTotalCount.value / PAGE_SIZE)
  )
  const hasMoreActivity = computed(() => activityPage.value < activityTotalPages.value)

  // --- Methods ---

  async function fetchProfile(userId) {
    profileLoading.value = true
    profileError.value = null
    try {
      const res = await fetch(`/api/users/${userId}`)
      if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`)
      const data = await res.json()
      Object.assign(profile, data)
    } catch (err) {
      profileError.value = err.message
    } finally {
      profileLoading.value = false
    }
  }

  async function saveNotificationPreferences() {
    preferencesSaving.value = true
    preferencesSaveError.value = null
    try {
      const res = await fetch(`/api/users/${profile.id}/notification-preferences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...notificationPreferences }),
      })
      if (!res.ok) throw new Error(`Failed to save preferences: ${res.status}`)
      const updated = await res.json()
      Object.assign(notificationPreferences, updated)
    } catch (err) {
      preferencesSaveError.value = err.message
    } finally {
      preferencesSaving.value = false
    }
  }

  async function fetchActivityLog(page = 1) {
    activityLoading.value = true
    try {
      const params = new URLSearchParams({ page, limit: PAGE_SIZE })
      const res = await fetch(`/api/users/${profile.id}/activity?${params}`)
      if (!res.ok) throw new Error(`Failed to fetch activity: ${res.status}`)
      const { items, total } = await res.json()
      activityLog.value = page === 1 ? items : [...activityLog.value, ...items]
      activityTotalCount.value = total
      activityPage.value = page
    } catch (err) {
      // non-fatal; caller can surface activityLoading going false as a signal
      console.error(err)
    } finally {
      activityLoading.value = false
    }
  }

  function loadNextActivityPage() {
    if (hasMoreActivity.value) {
      fetchActivityLog(activityPage.value + 1)
    }
  }

  return {
    // profile
    profile,
    profileLoading,
    profileError,

    // notification preferences
    notificationPreferences,
    preferencesSaving,
    preferencesSaveError,

    // activity log
    activityLog,
    activityPage,
    activityTotalCount,
    activityTotalPages,
    activityLoading,
    hasMoreActivity,

    // methods
    fetchProfile,
    saveNotificationPreferences,
    fetchActivityLog,
    loadNextActivityPage,
  }
}
