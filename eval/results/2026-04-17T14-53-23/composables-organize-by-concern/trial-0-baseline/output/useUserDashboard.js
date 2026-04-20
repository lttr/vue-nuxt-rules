import { ref, reactive, computed } from 'vue'

export function useUserDashboard() {
  const profile = ref(null)
  const profileLoading = ref(false)
  const profileError = ref(null)

  const notificationPreferences = reactive({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  })
  const preferencesSaving = ref(false)

  const activityLog = ref([])
  const activityPage = ref(1)
  const activityPageSize = ref(10)
  const activityTotal = ref(0)
  const activityLoading = ref(false)

  const totalActivityPages = computed(() =>
    Math.max(1, Math.ceil(activityTotal.value / activityPageSize.value))
  )
  const hasNextPage = computed(() => activityPage.value < totalActivityPages.value)
  const hasPrevPage = computed(() => activityPage.value > 1)

  async function fetchProfile(userId) {
    profileLoading.value = true
    profileError.value = null
    try {
      const res = await fetch(`/api/users/${userId}`)
      if (!res.ok) throw new Error(`Failed to load profile: ${res.status}`)
      const data = await res.json()
      profile.value = data
      if (data.notificationPreferences) {
        Object.assign(notificationPreferences, data.notificationPreferences)
      }
      return data
    } catch (err) {
      profileError.value = err.message
      throw err
    } finally {
      profileLoading.value = false
    }
  }

  async function saveNotificationPreferences(userId) {
    preferencesSaving.value = true
    try {
      const res = await fetch(`/api/users/${userId}/notifications`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...notificationPreferences }),
      })
      if (!res.ok) throw new Error(`Failed to save preferences: ${res.status}`)
      return await res.json()
    } finally {
      preferencesSaving.value = false
    }
  }

  async function fetchActivityPage(userId, page = activityPage.value) {
    activityLoading.value = true
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(activityPageSize.value),
      })
      const res = await fetch(`/api/users/${userId}/activity?${params}`)
      if (!res.ok) throw new Error(`Failed to load activity: ${res.status}`)
      const { items, total } = await res.json()
      activityLog.value = items
      activityTotal.value = total
      activityPage.value = page
      return items
    } finally {
      activityLoading.value = false
    }
  }

  function nextActivityPage(userId) {
    if (!hasNextPage.value) return Promise.resolve(activityLog.value)
    return fetchActivityPage(userId, activityPage.value + 1)
  }

  function prevActivityPage(userId) {
    if (!hasPrevPage.value) return Promise.resolve(activityLog.value)
    return fetchActivityPage(userId, activityPage.value - 1)
  }

  return {
    profile,
    profileLoading,
    profileError,
    notificationPreferences,
    preferencesSaving,
    activityLog,
    activityPage,
    activityPageSize,
    activityTotal,
    activityLoading,
    totalActivityPages,
    hasNextPage,
    hasPrevPage,
    fetchProfile,
    saveNotificationPreferences,
    fetchActivityPage,
    nextActivityPage,
    prevActivityPage,
  }
}
