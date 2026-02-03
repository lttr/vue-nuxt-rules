import { ref, reactive, computed } from 'vue';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  digestFrequency: 'daily' | 'weekly' | 'never';
}

interface ActivityLogEntry {
  id: string;
  action: string;
  timestamp: string;
  details: string;
}

export function useUserDashboard(userId: string) {
  // --- State ---
  const userProfile = ref<UserProfile | null>(null);
  const profileLoading = ref(false);
  const profileError = ref<string | null>(null);

  const notificationPreferences = reactive<NotificationPreferences>({
    emailNotifications: true,
    pushNotifications: false,
    digestFrequency: 'daily',
  });
  const savingPreferences = ref(false);

  const activityLog = ref<ActivityLogEntry[]>([]);
  const activityPage = ref(1);
  const activityPageSize = ref(20);
  const activityTotalItems = ref(0);
  const activityLoading = ref(false);

  // --- Computed ---
  const activityTotalPages = computed(() =>
    Math.max(1, Math.ceil(activityTotalItems.value / activityPageSize.value))
  );

  const hasMoreActivities = computed(() =>
    activityPage.value < activityTotalPages.value
  );

  // --- Methods ---

  async function fetchUserProfile(): Promise<void> {
    profileLoading.value = true;
    profileError.value = null;
    try {
      const response = await fetch(`/api/users/${userId}/profile`);
      if (!response.ok) {
        throw new Error(`Failed to fetch profile: ${response.statusText}`);
      }
      userProfile.value = await response.json();
    } catch (err) {
      profileError.value = err instanceof Error ? err.message : String(err);
    } finally {
      profileLoading.value = false;
    }
  }

  async function saveNotificationPreferences(): Promise<void> {
    savingPreferences.value = true;
    try {
      const response = await fetch(`/api/users/${userId}/notifications`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPreferences),
      });
      if (!response.ok) {
        throw new Error(`Failed to save preferences: ${response.statusText}`);
      }
    } finally {
      savingPreferences.value = false;
    }
  }

  async function fetchActivityLog(page?: number): Promise<void> {
    if (page !== undefined) {
      activityPage.value = page;
    }
    activityLoading.value = true;
    try {
      const params = new URLSearchParams({
        page: String(activityPage.value),
        pageSize: String(activityPageSize.value),
      });
      const response = await fetch(
        `/api/users/${userId}/activity?${params}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch activity: ${response.statusText}`);
      }
      const data = await response.json();
      activityLog.value = data.items;
      activityTotalItems.value = data.totalItems;
    } finally {
      activityLoading.value = false;
    }
  }

  return {
    // State
    userProfile,
    profileLoading,
    profileError,
    notificationPreferences,
    savingPreferences,
    activityLog,
    activityPage,
    activityPageSize,
    activityTotalItems,
    activityLoading,

    // Computed
    activityTotalPages,
    hasMoreActivities,

    // Methods
    fetchUserProfile,
    saveNotificationPreferences,
    fetchActivityLog,
  };
}
