import { ref, reactive, computed } from 'vue'

interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  createdAt: Date
}

interface NotificationPreferences {
  email: boolean
  push: boolean
  sms: boolean
  marketing: boolean
}

interface ActivityLogEntry {
  id: string
  action: string
  timestamp: Date
  details: string
}

interface PaginationState {
  page: number
  pageSize: number
  total: number
}

export function useUserDashboard() {
  // State variables
  const userProfile = ref<UserProfile | null>(null)
  const isLoadingProfile = ref(false)
  const notificationPreferences = reactive<NotificationPreferences>({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  })
  const isSavingPreferences = ref(false)
  const activityLog = ref<ActivityLogEntry[]>([])
  const activityPagination = reactive<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
  })
  const isLoadingActivity = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const hasMoreActivity = computed(() => {
    return activityPagination.page * activityPagination.pageSize < activityPagination.total
  })

  const totalActivityPages = computed(() => {
    return Math.ceil(activityPagination.total / activityPagination.pageSize)
  })

  // Methods
  async function fetchUserProfile(userId: string): Promise<void> {
    isLoadingProfile.value = true
    error.value = null

    try {
      const response = await fetch(`/api/users/${userId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch user profile')
      }
      const data = await response.json()
      userProfile.value = {
        ...data,
        createdAt: new Date(data.createdAt),
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error occurred'
      throw e
    } finally {
      isLoadingProfile.value = false
    }
  }

  async function saveNotificationPreferences(): Promise<void> {
    if (!userProfile.value) {
      throw new Error('No user profile loaded')
    }

    isSavingPreferences.value = true
    error.value = null

    try {
      const response = await fetch(`/api/users/${userProfile.value.id}/notifications`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationPreferences),
      })

      if (!response.ok) {
        throw new Error('Failed to save notification preferences')
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error occurred'
      throw e
    } finally {
      isSavingPreferences.value = false
    }
  }

  async function fetchActivityLog(page: number = 1): Promise<void> {
    if (!userProfile.value) {
      throw new Error('No user profile loaded')
    }

    isLoadingActivity.value = true
    error.value = null

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: activityPagination.pageSize.toString(),
      })

      const response = await fetch(
        `/api/users/${userProfile.value.id}/activity?${params}`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch activity log')
      }

      const data = await response.json()

      activityLog.value = data.items.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp),
      }))
      activityPagination.page = page
      activityPagination.total = data.total
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error occurred'
      throw e
    } finally {
      isLoadingActivity.value = false
    }
  }

  function updateNotificationPreference<K extends keyof NotificationPreferences>(
    key: K,
    value: NotificationPreferences[K]
  ): void {
    notificationPreferences[key] = value
  }

  function resetState(): void {
    userProfile.value = null
    isLoadingProfile.value = false
    Object.assign(notificationPreferences, {
      email: true,
      push: true,
      sms: false,
      marketing: false,
    })
    isSavingPreferences.value = false
    activityLog.value = []
    activityPagination.page = 1
    activityPagination.total = 0
    isLoadingActivity.value = false
    error.value = null
  }

  return {
    // State
    userProfile,
    isLoadingProfile,
    notificationPreferences,
    isSavingPreferences,
    activityLog,
    activityPagination,
    isLoadingActivity,
    error,

    // Computed
    hasMoreActivity,
    totalActivityPages,

    // Methods
    fetchUserProfile,
    saveNotificationPreferences,
    fetchActivityLog,
    updateNotificationPreference,
    resetState,
  }
}
