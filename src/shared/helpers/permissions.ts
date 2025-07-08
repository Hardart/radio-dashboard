import type { User } from '../schemes/user-schema'

const ROLES = {
  admin: ['articles'],
  host: ['tracks', 'programs'],
  superadmin: ['articles', 'categories', 'programs', 'users', 'settings'],
  creator: ['*'],
} as const

export type Role = keyof typeof ROLES
type Permission = (typeof ROLES)[Role][number]

export function hasPermission(user: User, permission: Permission = '*') {
  return (ROLES[user.role] as readonly Permission[]).includes(permission)
}
