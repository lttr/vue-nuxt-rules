import { ref, reactive, computed } from 'vue'

/**
 * useUserDashboard
 *
 * Manages three concerns for a user dashboard:
 *   1. User profile data (with loading state)
 *   2. Notification preferences (with a save method)
 *   3. Activity log (with pagination)
 *
 * @param {Object} [options]
 * @param {Function} [options.fetchProfile]       async () => profile
 * @param {Function} [options.saveNotifications]  async (prefs) => void
 * @param {Function} [options.fetchActivity]      async ({ page, pageSize }) => { items, total }
 */
export function useUserDashboard(options = {}) {
  const {
    fetchProfile = defaultFetchProfile,
    saveNotifications = defaultSaveNotifications,
    fetchActivity = defaultFetchActivity,
  } = options

  // ── State (6+ variables) ──────────────────────────────────────────────

  // 1. Profile data
  const profile = ref(null)
  // 2. Profile loading flag
  const isLoadingProfile = ref(false)
  // 3. Notification preferences
  const notificationPreferences = reactive({
    email: true,
    push: false,
    sms: false,
  })
  // 4. Saving flag for preferences
  const isSavingPreferences = ref(false)
  // 5. Activity log entries (current page)
  const activityLog = ref([])
  // 6. Current pagination page (1-based)
  const currentPage = ref(1)
  // 7. Page size
  const pageSize = ref(10)
  // 8. Total number of activity items (for pagination math)
  const totalActivityItems = ref(0)
  // 9. Shared error holder
  const error = ref(null)

  // ── Derived state ─────────────────────────────────────────────────────

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(totalActivityItems.value / pageSize.value))
  )
  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPreviousPage = computed(() => currentPage.value > 1)

  // ── Methods (3+) ──────────────────────────────────────────────────────

  /**
   * Method 1: Load the user profile, toggling the loading state.
   */
  async function loadProfile() {
    isLoadingProfile.value = true
    error.value = null
    try {
      profile.value = await fetchProfile()
      return profile.value
    } catch (err) {
      error.value = err
      throw err
    } finally {
      isLoadingProfile.value = false
    }
  }

  /**
   * Method 2: Persist notification preferences.
   * @param {Partial<typeof notificationPreferences>} [updates]
   */
  async function savePreferences(updates = {}) {
    Object.assign(notificationPreferences, updates)
    isSavingPreferences.value = true
    error.value = null
    try {
      // Pass a plain snapshot so callers don't mutate our reactive state.
      await saveNotifications({ ...notificationPreferences })
      return { ...notificationPreferences }
    } catch (err) {
      error.value = err
      throw err
    } finally {
      isSavingPreferences.value = false
    }
  }

  /**
   * Method 3: Load a page of the activity log.
   * @param {number} [page] defaults to the current page
   */
  async function loadActivity(page = currentPage.value) {
    const target = Math.min(Math.max(1, page), Number.MAX_SAFE_INTEGER)
    error.value = null
    try {
      const { items, total } = await fetchActivity({
        page: target,
        pageSize: pageSize.value,
      })
      activityLog.value = items
      totalActivityItems.value = total
      currentPage.value = target
      return activityLog.value
    } catch (err) {
      error.value = err
      throw err
    }
  }

  /**
   * Method 4: Convenience — advance one page if possible.
   */
  async function nextPage() {
    if (!hasNextPage.value) return activityLog.value
    return loadActivity(currentPage.value + 1)
  }

  /**
   * Method 5: Convenience — go back one page if possible.
   */
  async function previousPage() {
    if (!hasPreviousPage.value) return activityLog.value
    return loadActivity(currentPage.value - 1)
  }

  return {
    // state
    profile,
    isLoadingProfile,
    notificationPreferences,
    isSavingPreferences,
    activityLog,
    currentPage,
    pageSize,
    totalActivityItems,
    error,
    // derived
    totalPages,
    hasNextPage,
    hasPreviousPage,
    // methods
    loadProfile,
    savePreferences,
    loadActivity,
    nextPage,
    previousPage,
  }
}

// ── Default no-op implementations (swap via options in real usage) ───────

async function defaultFetchProfile() {
  return { id: null, name: '', email: '' }
}

async function defaultSaveNotifications(_prefs) {
  return
}

async function defaultFetchActivity({ page, pageSize }) {
  return { items: [], total: 0 }
}
