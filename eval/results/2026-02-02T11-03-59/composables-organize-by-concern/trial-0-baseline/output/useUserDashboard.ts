import { ref, reactive, computed } from 'vue';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
  mentionAlerts: boolean;
}

export interface ActivityLogEntry {
  id: string;
  action: string;
  timestamp: string;
  details: string;
}

export function useUserDashboard(userId: string) {
  // --- State ---
  const profile = ref<UserProfile | null>(null);
  const profileLoading = ref(false);
  const profileError = ref<string | null>(null);

  const notificationPreferences = reactive<NotificationPreferences>({
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    mentionAlerts: true,
  });
  const savingPreferences = ref(false);

  const activityLog = ref<ActivityLogEntry[]>([]);
  const activityPage = ref(1);
  const activityPageSize = ref(20);
  const activityTotal = ref(0);
  const activityLoading = ref(false);

  // --- Computed ---
  const totalActivityPages = computed(() =>
    Math.max(1, Math.ceil(activityTotal.value / activityPageSize.value))
  );

  const hasNextPage = computed(() => activityPage.value < totalActivityPages.value);
  const hasPrevPage = computed(() => activityPage.value > 1);

  // --- Methods ---
  async function fetchProfile(): Promise<void> {
    profileLoading.value = true;
    profileError.value = null;
    try {
      const res = await fetch(`/api/users/${userId}/profile`);
      if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
      profile.value = await res.json();
    } catch (err) {
      profileError.value = err instanceof Error ? err.message : 'Unknown error';
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
    if (page !== undefined) {
      activityPage.value = page;
    }
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
    } catch {
      activityLog.value = [];
    } finally {
      activityLoading.value = false;
    }
  }

  return {
    // State
    profile,
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
    hasNextPage,
    hasPrevPage,

    // Methods
    fetchProfile,
    saveNotificationPreferences,
    fetchActivityLog,
  };
}
