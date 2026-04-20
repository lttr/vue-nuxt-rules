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
  const activityLoading = ref(false)
  const activityPage = ref(1)
  const activityPageSize = ref(10)
  const activityTotal = ref(0)

  const totalActivityPages = computed(() =>
    Math.max(1, Math.ceil(activityTotal.value / activityPageSize.value))
  )

  async function fetchProfile(userId) {
    profileLoading.value = true
    profileError.value = null
    try {
      const res = await fetch(`/api/users/${userId}`)
      if (!res.ok) throw new Error(`Failed to load profile: ${res.status}`)
      profile.value = await res.json()
    } catch (err) {
      profileError.value = err.message
      profile.value = null
    } finally {
      profileLoading.value = false
    }
  }

  async function saveNotificationPreferences(userId) {
    preferencesSaving.value = true
    try {
      const res = await fetch(`/api/users/${userId}/preferences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPreferences),
      })
      if (!res.ok) throw new Error(`Failed to save preferences: ${res.status}`)
      return await res.json()
    } finally {
      preferencesSaving.value = false
    }
  }

  async function loadActivityPage(userId, page = activityPage.value) {
    activityLoading.value = true
    try {
      const res = await fetch(
        `/api/users/${userId}/activity?page=${page}&pageSize=${activityPageSize.value}`
      )
      if (!res.ok) throw new Error(`Failed to load activity: ${res.status}`)
      const data = await res.json()
      activityLog.value = data.items
      activityTotal.value = data.total
      activityPage.value = page
    } finally {
      activityLoading.value = false
    }
  }

  async function nextActivityPage(userId) {
    if (activityPage.value < totalActivityPages.value) {
      await loadActivityPage(userId, activityPage.value + 1)
    }
  }

  async function prevActivityPage(userId) {
    if (activityPage.value > 1) {
      await loadActivityPage(userId, activityPage.value - 1)
    }
  }

  return {
    profile,
    profileLoading,
    profileError,
    notificationPreferences,
    preferencesSaving,
    activityLog,
    activityLoading,
    activityPage,
    activityPageSize,
    activityTotal,
    totalActivityPages,
    fetchProfile,
    saveNotificationPreferences,
    loadActivityPage,
    nextActivityPage,
    prevActivityPage,
  }
}
