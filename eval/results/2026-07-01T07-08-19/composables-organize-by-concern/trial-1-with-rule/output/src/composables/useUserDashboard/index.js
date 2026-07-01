import { useProfile } from './useProfile'
import { useNotificationPreferences } from './useNotificationPreferences'
import { useActivityLog } from './useActivityLog'

export function useUserDashboard() {
  const profileState = useProfile()
  const notificationPreferencesState = useNotificationPreferences()
  const activityLogState = useActivityLog()

  return {
    ...profileState,
    ...notificationPreferencesState,
    ...activityLogState,
  }
}
