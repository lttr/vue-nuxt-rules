import { ref } from 'vue'

const PAGE_SIZE = 20

export function useActivityLog() {
  const activityLog = ref([])
  const activityPage = ref(1)
  const isActivityLoading = ref(false)

  async function loadActivityPage(userId, page = activityPage.value) {
    isActivityLoading.value = true
    try {
      const response = await fetch(
        `/api/users/${userId}/activity?page=${page}&pageSize=${PAGE_SIZE}`
      )
      activityLog.value = await response.json()
      activityPage.value = page
    } finally {
      isActivityLoading.value = false
    }
  }

  return {
    activityLog,
    activityPage,
    isActivityLoading,
    loadActivityPage,
  }
}
