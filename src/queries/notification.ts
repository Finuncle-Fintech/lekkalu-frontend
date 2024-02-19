import { Notification } from '@/types/notification'
import { v1ApiClient } from '@/utils/client'

export async function fetchNotifications(): Promise<Notification[]> {
  const { data } = await v1ApiClient.get<Notification[]>('/notification')
  return data
}
