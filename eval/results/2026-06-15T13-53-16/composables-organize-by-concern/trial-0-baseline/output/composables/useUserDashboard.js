import { ref, computed } from 'vue'

/**
 * useUserDashboard
 *
 * Manages three concerns for a user dashboard:
 *  - Profile data with a loading state
 *  - Notification preferences with a save method
 *  - A paginated activity log
 *
 * @param {Object} [options]
 * @param {Function} [options.fetchProfile]      async () => profile
 * @param {Function} [options.savePreferences]   async (prefs) => void
 * @param {Function} [options.fetchActivity]     async ({ page, pageSize }) => { items, total }
 * @param {number}   [options.pageSize=10]
 */
export function useUserDashboard(options = {}) {
  const {
    fetchProfile,
    savePreferences: persistPreferences,
    fetchActivity,
    pageSize = 10,
  } = options

  // ── Profile state ──────────────────────────────────────────────
  const profile = ref(null)
  const isProfileLoading = ref(false)
  const profileError = ref(null)

  // ── Notification preferences state ─────────────────────────────
  const notificationPreferences = ref({
    email: true,
    push: false,
    sms: false,
  })
  const isSavingPreferences = ref(false)

  // ── Activity log state (paginated) ─────────────────────────────
  const activityLog = ref([])
  const isActivityLoading = ref(false)
  const activityPage = ref(1)
  const activityTotal = ref(0)

  // ── Derived state ──────────────────────────────────────────────
  const totalPages = computed(() =>
    Math.max(1, Math.ceil(activityTotal.value / pageSize))
  )
  const hasNextPage = computed(() => activityPage.value < totalPages.value)
  const hasPreviousPage = computed(() => activityPage.value > 1)

  // ── Method 1: load the user profile ────────────────────────────
  async function loadProfile() {
    isProfileLoading.value = true
    profileError.value = null
    try {
      profile.value = fetchProfile ? await fetchProfile() : null
      // Hydrate preferences from the profile when present.
      if (profile.value?.notificationPreferences) {
        notificationPreferences.value = {
          ...notificationPreferences.value,
          ...profile.value.notificationPreferences,
        }
      }
      return profile.value
    } catch (err) {
      profileError.value = err
      throw err
    } finally {
      isProfileLoading.value = false
    }
  }

  // ── Method 2: persist notification preferences ─────────────────
  async function savePreferences(next) {
    if (next) {
      notificationPreferences.value = {
        ...notificationPreferences.value,
        ...next,
      }
    }
    isSavingPreferences.value = true
    try {
      if (persistPreferences) {
        await persistPreferences({ ...notificationPreferences.value })
      }
      return { ...notificationPreferences.value }
    } finally {
      isSavingPreferences.value = false
    }
  }

  // ── Method 3: load a page of the activity log ──────────────────
  async function loadActivity(page = activityPage.value) {
    const target = Math.min(Math.max(1, page), Number.MAX_SAFE_INTEGER)
    isActivityLoading.value = true
    try {
      const result = fetchActivity
        ? await fetchActivity({ page: target, pageSize })
        : { items: [], total: 0 }
      activityLog.value = result.items ?? []
      activityTotal.value = result.total ?? 0
      activityPage.value = target
      return activityLog.value
    } finally {
      isActivityLoading.value = false
    }
  }

  // Pagination convenience wrappers around loadActivity.
  function nextActivityPage() {
    if (hasNextPage.value) return loadActivity(activityPage.value + 1)
    return Promise.resolve(activityLog.value)
  }

  function previousActivityPage() {
    if (hasPreviousPage.value) return loadActivity(activityPage.value - 1)
    return Promise.resolve(activityLog.value)
  }

  return {
    // profile
    profile,
    isProfileLoading,
    profileError,
    loadProfile,
    // preferences
    notificationPreferences,
    isSavingPreferences,
    savePreferences,
    // activity log
    activityLog,
    isActivityLoading,
    activityPage,
    activityTotal,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    loadActivity,
    nextActivityPage,
    previousActivityPage,
  }
}

export default useUserDashboard
