import type { HostFormData } from '@schema/host-schema'
import type { User } from '@schema/user-schema'
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
    Object.assign(userFormData, user)
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
    const user = await userAPI.addOne(userFormData)
    if (user) users.value.push(user)
  }

  async function updateUser() {
    await userAPI.update(userFormData)
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
    pending.value = true
    if (userFormData.avatar) {
      userFormData.avatar = removeLocalUrl(userFormData.avatar)
    }
    if (userFormData.id) {
      await updateUser()
    } else {
      await addUser()
    }
    pending.value = false
    resetUser()
    toggleOpenState(false)
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
