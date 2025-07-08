import type { Icon } from '@/shared/types/Icon'
import { ref } from 'vue'

export type Notification = {
  id: number
  text?: string
  icon?: Icon
  duration?: number
  status?: 'primary' | 'success' | 'warning'
  onHover?: boolean
  autoClose?: boolean
}

export type Toast = {
  add(notification: Omit<Notification, 'id'>): void
  remove(id: number): void
  removeContainer(): void
}

let id = 0
const notifications = ref<Notification[]>([])
const isShowContainer = ref(false)

export function useNotifications() {
  async function add(notification: Omit<Notification, 'id'>) {
    isShowContainer.value = true

    requestAnimationFrame(addToast)

    function addToast() {
      id++
      notifications.value.push({ id, ...notification })
    }
  }

  function remove(id: number) {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  function removeContainer() {
    if (!notifications.value.length) isShowContainer.value = false
  }
  return { notifications, add, remove, removeContainer, isShowContainer }
}
