import { ref, computed, watch } from 'vue'

export function useUserDashboard(userId) {
  // ── User profile ──────────────────────────────────────────────────────────
  const profile = ref(null)
  const profileLoading = ref(false)
  const profileError = ref(null)

  const displayName = computed(() =>
    profile.value ? `${profile.value.firstName} ${profile.value.lastName}` : ''
  )

  async function loadProfile() {
    profileLoading.value = true
    profileError.value = null
    try {
      const res = await fetch(`/api/users/${userId}`)
      if (!res.ok) throw new Error(`Failed to load profile: ${res.status}`)
      profile.value = await res.json()
    } catch (err) {
      profileError.value = err
    } finally {
      profileLoading.value = false
    }
  }

  // ── Notification preferences ──────────────────────────────────────────────
  const notificationPrefs = ref({
    email: true,
    sms: false,
    push: true,
  })
  const notificationSaving = ref(false)

  async function saveNotificationPrefs() {
    notificationSaving.value = true
    try {
      const res = await fetch(`/api/users/${userId}/notifications`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPrefs.value),
      })
      if (!res.ok) throw new Error(`Failed to save preferences: ${res.status}`)
      return await res.json()
    } finally {
      notificationSaving.value = false
    }
  }

  // ── Activity log (paginated) ──────────────────────────────────────────────
  const activityLog = ref([])
  const activityPage = ref(1)
  const activityPageSize = ref(20)
  const activityTotal = ref(0)
  const activityLoading = ref(false)

  const activityTotalPages = computed(() =>
    Math.max(1, Math.ceil(activityTotal.value / activityPageSize.value))
  )
  const hasNextActivityPage = computed(
    () => activityPage.value < activityTotalPages.value
  )

  async function loadActivityPage(page = activityPage.value) {
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

  watch(activityPageSize, () => loadActivityPage(1))

  return {
    // profile
    profile,
    profileLoading,
    profileError,
    displayName,
    loadProfile,

    // notifications
    notificationPrefs,
    notificationSaving,
    saveNotificationPrefs,

    // activity
    activityLog,
    activityPage,
    activityPageSize,
    activityTotal,
    activityLoading,
    activityTotalPages,
    hasNextActivityPage,
    loadActivityPage,
  }
}
