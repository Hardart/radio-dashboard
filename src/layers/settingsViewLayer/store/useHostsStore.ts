import type { HostFormData } from '@/shared/schemes/host-schema'
import type { User } from '@/shared/schemes/user-schema'
import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useToggle } from '@vueuse/core'
import { userAPI } from '@/api/user-api'
import { useAuthStore } from '@/store/useAuthStore'
import { removeLocalUrl } from '@/shared/helpers/utils'

export const useHostsStore = defineStore('hosts', () => {
  const authStore = useAuthStore()
  const [isOpen, toggleOpenState] = useToggle()
  const pending = ref(false)

  const userFormData = reactive<HostFormData>({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    password_new: '',
    roles: [],
  })

  const users = ref<User[]>([])

  const filterUsers = (id: string) =>
    (users.value = users.value.filter((item) => item.id !== id))

  function editUser(user: User) {
    userFormData.id = user.id
    userFormData.email = user.email
    userFormData.firstName = user.firstName
    userFormData.lastName = user.lastName
    userFormData.avatar = user.avatar
    userFormData.roles = user.roles
    toggleOpenState(true)
  }

  function resetUser() {
    userFormData.id = ''
    userFormData.email = ''
    userFormData.firstName = ''
    userFormData.lastName = ''
    userFormData.avatar = ''
    userFormData.roles = []
  }

  async function fetchUsers() {
    pending.value = true
    const response = await userAPI.list()
    pending.value = false
    if (authStore.isCreator) users.value = response
    else
      users.value = response.filter((item) => !item.roles.includes('creator'))
  }

  async function addUser() {
    pending.value = true
    if (userFormData.avatar) {
      userFormData.avatar = removeLocalUrl(userFormData.avatar)
    }

    const user = await userAPI.addOne(userFormData)
    pending.value = false
    if (user) users.value.push(user)
    resetUser()
    toggleOpenState(false)
  }

  async function updateUser() {
    pending.value = true
    if (userFormData.avatar) {
      userFormData.avatar = removeLocalUrl(userFormData.avatar)
    }
    const res = await userAPI.update(userFormData)
    pending.value = false
    toggleOpenState(false)
  }

  async function deleteUser() {
    if (!userFormData.id) return
    pending.value = true
    const user = await userAPI.deleteOne(userFormData.id)
    pending.value = false
    if (user) {
      filterUsers(user.id)
      resetUser()
    }
    toggleOpenState(false)
  }

  async function setUser() {
    if (userFormData.id) await updateUser()
    else await addUser()
  }

  return {
    users,
    userFormData,
    pending,
    isOpen,
    fetchUsers,
    deleteUser,
    editUser,
    toggleOpenState,
    setUser,
  }
})
