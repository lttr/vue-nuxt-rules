import { ref, computed } from 'vue'

export function useUserDashboard(userId) {
  // ---------- Profile ----------
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

  // ---------- Notification preferences ----------
  const notifications = ref({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  })
  const notificationsSaving = ref(false)

  async function saveNotifications(next) {
    if (next) notifications.value = { ...notifications.value, ...next }
    notificationsSaving.value = true
    try {
      const res = await fetch(`/api/users/${userId}/notifications`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notifications.value),
      })
      if (!res.ok) throw new Error(`Failed to save notifications: ${res.status}`)
      return await res.json()
    } finally {
      notificationsSaving.value = false
    }
  }

  // ---------- Activity log (paginated) ----------
  const activity = ref([])
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

  async function loadActivity(page = activityPage.value) {
    activityLoading.value = true
    try {
      const res = await fetch(
        `/api/users/${userId}/activity?page=${page}&pageSize=${activityPageSize.value}`
      )
      if (!res.ok) throw new Error(`Failed to load activity: ${res.status}`)
      const data = await res.json()
      activity.value = data.items
      activityTotal.value = data.total
      activityPage.value = page
    } finally {
      activityLoading.value = false
    }
  }

  return {
    profile,
    profileLoading,
    profileError,
    displayName,
    loadProfile,

    notifications,
    notificationsSaving,
    saveNotifications,

    activity,
    activityPage,
    activityPageSize,
    activityTotal,
    activityLoading,
    activityTotalPages,
    hasNextActivityPage,
    loadActivity,
  }
}
