import { ref, computed } from 'vue'

export function useUserDashboard(userId) {
  // --- Profile ---
  const profile = ref(null)
  const profileLoading = ref(false)

  async function loadProfile() {
    profileLoading.value = true
    try {
      const res = await fetch(`/api/users/${userId}`)
      profile.value = await res.json()
    } finally {
      profileLoading.value = false
    }
  }

  // --- Notification preferences ---
  const notificationPrefs = ref({ email: true, push: false, sms: false })

  async function saveNotificationPrefs() {
    const res = await fetch(`/api/users/${userId}/notifications`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notificationPrefs.value),
    })
    return res.ok
  }

  // --- Activity log (paginated) ---
  const activityLog = ref([])
  const activityPage = ref(1)
  const activityPageSize = ref(20)
  const activityTotal = ref(0)
  const activityTotalPages = computed(() =>
    Math.ceil(activityTotal.value / activityPageSize.value)
  )

  async function fetchActivity(page = activityPage.value) {
    const res = await fetch(
      `/api/users/${userId}/activity?page=${page}&size=${activityPageSize.value}`
    )
    const data = await res.json()
    activityLog.value = data.items
    activityTotal.value = data.total
    activityPage.value = page
  }

  return {
    profile,
    profileLoading,
    loadProfile,

    notificationPrefs,
    saveNotificationPrefs,

    activityLog,
    activityPage,
    activityPageSize,
    activityTotal,
    activityTotalPages,
    fetchActivity,
  }
}
