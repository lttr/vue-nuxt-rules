import { ref, reactive, computed } from 'vue'

const PAGE_SIZE = 10

export function useUserDashboard(userId) {
  // --- state ---
  const profile = ref(null)
  const profileLoading = ref(false)
  const profileError = ref(null)

  const notifications = reactive({
    email: true,
    push: false,
    sms: false,
    marketing: false,
  })
  const notificationsSaving = ref(false)

  const activityLog = ref([])
  const activityLoading = ref(false)
  const activityPage = ref(1)
  const activityTotalPages = ref(1)

  // --- computed ---
  const hasMoreActivity = computed(() => activityPage.value < activityTotalPages.value)

  // --- methods ---
  async function fetchProfile() {
    profileLoading.value = true
    profileError.value = null
    try {
      const res = await fetch(`/api/users/${userId}/profile`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      profile.value = data.user
      Object.assign(notifications, data.notificationPreferences ?? {})
    } catch (err) {
      profileError.value = err.message
    } finally {
      profileLoading.value = false
    }
  }

  async function saveNotifications() {
    notificationsSaving.value = true
    try {
      const res = await fetch(`/api/users/${userId}/notifications`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...notifications }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
    } finally {
      notificationsSaving.value = false
    }
  }

  async function fetchActivityLog(page = 1) {
    activityLoading.value = true
    try {
      const res = await fetch(
        `/api/users/${userId}/activity?page=${page}&pageSize=${PAGE_SIZE}`
      )
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      activityLog.value = page === 1 ? data.items : [...activityLog.value, ...data.items]
      activityPage.value = page
      activityTotalPages.value = data.totalPages ?? 1
    } finally {
      activityLoading.value = false
    }
  }

  function loadNextPage() {
    if (hasMoreActivity.value) {
      fetchActivityLog(activityPage.value + 1)
    }
  }

  return {
    // profile
    profile,
    profileLoading,
    profileError,
    // notifications
    notifications,
    notificationsSaving,
    // activity
    activityLog,
    activityLoading,
    activityPage,
    activityTotalPages,
    hasMoreActivity,
    // methods
    fetchProfile,
    saveNotifications,
    fetchActivityLog,
    loadNextPage,
  }
}
