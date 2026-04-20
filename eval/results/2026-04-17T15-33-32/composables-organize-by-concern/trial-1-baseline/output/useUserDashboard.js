import { ref, reactive, computed } from 'vue'

export function useUserDashboard() {
  const profile = ref(null)
  const isProfileLoading = ref(false)
  const profileError = ref(null)

  const notificationPreferences = reactive({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  })
  const isSavingPreferences = ref(false)

  const activityLog = ref([])
  const currentPage = ref(1)
  const pageSize = ref(10)
  const totalActivities = ref(0)
  const isActivityLoading = ref(false)

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(totalActivities.value / pageSize.value))
  )

  async function loadProfile(userId) {
    isProfileLoading.value = true
    profileError.value = null
    try {
      const res = await fetch(`/api/users/${userId}`)
      if (!res.ok) throw new Error(`Failed to load profile: ${res.status}`)
      const data = await res.json()
      profile.value = data
      Object.assign(notificationPreferences, data.notificationPreferences ?? {})
      return data
    } catch (err) {
      profileError.value = err.message
      throw err
    } finally {
      isProfileLoading.value = false
    }
  }

  async function saveNotificationPreferences(userId) {
    isSavingPreferences.value = true
    try {
      const res = await fetch(`/api/users/${userId}/notifications`, {
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

  async function fetchActivityPage(userId, page = currentPage.value) {
    isActivityLoading.value = true
    try {
      const res = await fetch(
        `/api/users/${userId}/activity?page=${page}&pageSize=${pageSize.value}`
      )
      if (!res.ok) throw new Error(`Failed to load activity: ${res.status}`)
      const { items, total } = await res.json()
      activityLog.value = items
      totalActivities.value = total
      currentPage.value = page
      return items
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
    currentPage,
    pageSize,
    totalActivities,
    totalPages,
    isActivityLoading,
    loadProfile,
    saveNotificationPreferences,
    fetchActivityPage,
  }
}
