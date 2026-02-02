import { ref, reactive, computed } from 'vue';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  joinedAt: string;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  mentionAlerts: boolean;
}

export interface ActivityEntry {
  id: string;
  action: string;
  timestamp: string;
  details: string;
}

export function useUserDashboard(userId: string) {
  // --- State (6+) ---
  const userProfile = ref<UserProfile | null>(null);
  const profileLoading = ref(false);
  const profileError = ref<string | null>(null);

  const notificationPreferences = reactive<NotificationPreferences>({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    mentionAlerts: true,
  });
  const savingPreferences = ref(false);

  const activityLog = ref<ActivityEntry[]>([]);
  const activityPage = ref(1);
  const activityPageSize = ref(10);
  const activityTotal = ref(0);
  const activityLoading = ref(false);

  // --- Computed ---
  const totalActivityPages = computed(() =>
    Math.max(1, Math.ceil(activityTotal.value / activityPageSize.value))
  );

  const hasMoreActivity = computed(() => activityPage.value < totalActivityPages.value);

  // --- Methods (3+) ---

  async function fetchUserProfile(): Promise<void> {
    profileLoading.value = true;
    profileError.value = null;
    try {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
      userProfile.value = await res.json();
    } catch (err: any) {
      profileError.value = err.message ?? 'Unknown error';
    } finally {
      profileLoading.value = false;
    }
  }

  async function saveNotificationPreferences(): Promise<boolean> {
    savingPreferences.value = true;
    try {
      const res = await fetch(`/api/users/${userId}/notifications`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPreferences),
      });
      if (!res.ok) throw new Error(`Failed to save preferences: ${res.status}`);
      return true;
    } catch {
      return false;
    } finally {
      savingPreferences.value = false;
    }
  }

  async function fetchActivityLog(page?: number): Promise<void> {
    if (page !== undefined) activityPage.value = page;
    activityLoading.value = true;
    try {
      const params = new URLSearchParams({
        page: String(activityPage.value),
        pageSize: String(activityPageSize.value),
      });
      const res = await fetch(`/api/users/${userId}/activity?${params}`);
      if (!res.ok) throw new Error(`Failed to fetch activity: ${res.status}`);
      const data = await res.json();
      activityLog.value = data.items;
      activityTotal.value = data.total;
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
    activityTotal,
    activityLoading,

    // Computed
    totalActivityPages,
    hasMoreActivity,

    // Methods
    fetchUserProfile,
    saveNotificationPreferences,
    fetchActivityLog,
  };
}
