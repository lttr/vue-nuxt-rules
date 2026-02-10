export interface UserProfile {
  id: string
  name: string
  email: string
  avatarUrl: string
  bio: string
  joinedAt: string
}

export interface NotificationPreferences {
  email: boolean
  push: boolean
  sms: boolean
  digest: 'daily' | 'weekly' | 'never'
}

export interface ActivityLogEntry {
  id: string
  action: string
  timestamp: string
  details: string
}

export interface ActivityPage {
  entries: ActivityLogEntry[]
  total: number
  page: number
  pageSize: number
}
