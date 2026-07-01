import { ref } from 'vue'

// Owns profile data + its loading state (kept together since they change in lockstep)
export function useProfile() {
  const profile = ref(null)
  const isProfileLoading = ref(false)

  async function loadProfile(userId) {
    isProfileLoading.value = true
    try {
      const response = await fetch(`/api/users/${userId}`)
      profile.value = await response.json()
    } finally {
      isProfileLoading.value = false
    }
  }

  return {
    profile,
    isProfileLoading,
    loadProfile,
  }
}
