import { ref, reactive } from 'vue'

export function useUserDashboard() {
  // Profile
  const profile = ref(null)
  const isProfileLoading = ref(false)

  async function fetchProfile(userId) {
    isProfileLoading.value = true
    try {
      const response = await fetch(`/api/users/${userId}`)
      profile.value = await response.json()
    } finally {
      isProfileLoading.value = false
    }
  }

  // Notification preferences
  const notificationPreferences = reactive({
    email: true,
    push: true,
    sms: false,
  })
  const isSavingPreferences = ref(false)

  async function saveNotificationPreferences() {
    isSavingPreferences.value = true
    try {
      await fetch('/api/notification-preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPreferences),
      })
    } finally {
      isSavingPreferences.value = false
    }
  }

  // Activity log
  const activityLog = ref([])
  const activityPage = ref(1)
  const activityPageSize = ref(20)
  const isActivityLoading = ref(false)
  const hasMoreActivity = ref(true)

  async function fetchActivityLog(userId, page = activityPage.value) {
    isActivityLoading.value = true
    try {
      const response = await fetch(
        `/api/users/${userId}/activity?page=${page}&pageSize=${activityPageSize.value}`
      )
      const data = await response.json()
      activityLog.value = page === 1 ? data.items : [...activityLog.value, ...data.items]
      activityPage.value = page
      hasMoreActivity.value = data.items.length === activityPageSize.value
    } finally {
      isActivityLoading.value = false
    }
  }

  function nextActivityPage(userId) {
    if (!hasMoreActivity.value || isActivityLoading.value) return
    return fetchActivityLog(userId, activityPage.value + 1)
  }

  return {
    // profile
    profile,
    isProfileLoading,
    fetchProfile,

    // notification preferences
    notificationPreferences,
    isSavingPreferences,
    saveNotificationPreferences,

    // activity log
    activityLog,
    activityPage,
    activityPageSize,
    isActivityLoading,
    hasMoreActivity,
    fetchActivityLog,
    nextActivityPage,
  }
}
