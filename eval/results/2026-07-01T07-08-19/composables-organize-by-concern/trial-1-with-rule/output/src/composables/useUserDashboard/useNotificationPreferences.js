import { ref } from 'vue'

export function useNotificationPreferences() {
  const notificationPreferences = ref({
    email: true,
    push: true,
    sms: false,
  })
  const isSavingPreferences = ref(false)

  async function saveNotificationPreferences(userId) {
    isSavingPreferences.value = true
    try {
      await fetch(`/api/users/${userId}/notification-preferences`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPreferences.value),
      })
    } finally {
      isSavingPreferences.value = false
    }
  }

  return {
    notificationPreferences,
    isSavingPreferences,
    saveNotificationPreferences,
  }
}
