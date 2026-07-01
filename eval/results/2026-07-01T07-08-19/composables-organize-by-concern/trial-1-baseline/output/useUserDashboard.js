import { reactive, ref } from 'vue'

export function useUserDashboard(api) {
  const profile = ref(null)
  const isProfileLoading = ref(false)

  const notificationPreferences = reactive({
    email: true,
    sms: false,
    push: true,
  })
  const isSavingPreferences = ref(false)

  const activityLog = ref([])
  const activityPage = ref(1)
  const activityPageSize = ref(10)
  const totalActivityCount = ref(0)

  async function fetchProfile() {
    isProfileLoading.value = true
    try {
      profile.value = await api.getProfile()
    } finally {
      isProfileLoading.value = false
    }
  }

  async function saveNotificationPreferences(preferences = notificationPreferences) {
    isSavingPreferences.value = true
    try {
      await api.saveNotificationPreferences({ ...preferences })
      Object.assign(notificationPreferences, preferences)
    } finally {
      isSavingPreferences.value = false
    }
  }

  async function fetchActivityLog(page = activityPage.value) {
    const { items, total } = await api.getActivityLog({
      page,
      pageSize: activityPageSize.value,
    })
    activityLog.value = items
    totalActivityCount.value = total
    activityPage.value = page
  }

  return {
    profile,
    isProfileLoading,
    notificationPreferences,
    isSavingPreferences,
    activityLog,
    activityPage,
    activityPageSize,
    totalActivityCount,
    fetchProfile,
    saveNotificationPreferences,
    fetchActivityLog,
  }
}
