<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useToggle } from '@vueuse/core'
import { hostFormSchema } from '@/shared/schemes/host-schema'
import DashboardContentBodyLayout from '@/layouts/dashboardContentBodyLayout.vue'
import HdUploadImage from '@/components/ui/hdUploadImage/hdUploadImage.vue'
import HdFormGroup from '@/components/ui/hdFormGroup/HdFormGroup.vue'
import HdSelect from '@/components/ui/hdSelect/hdSelect.vue'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
import HdModal from '@/components/ui/hdModal/HdModal.vue'
import HdCard from '@/components/ui/hdCard/HdCard.vue'
import HdForm from '@/components/ui/hdForm/HdForm.vue'
import Hosts from '../../components/hosts/Hosts.vue'
import { useHostsStore } from '../../store/useHostsStore'
import { correctImageUrl } from '@/shared/helpers/utils'

const rolesData = [
  { label: 'admin', option: 'Администратор' },
  { label: 'host', option: 'Ведущий' },
  { label: 'dj', option: 'Диджей' },
]

const hostsStore = useHostsStore()
const { users, userFormData, pending, isOpen } = storeToRefs(hostsStore)
hostsStore.fetchUsers()
</script>

<template>
  <DashboardContentBodyLayout>
    <div class="hosts">
      <div class="hosts-controls">
        <HdButton text="Добавить" @click="hostsStore.toggleOpenState()" />

        <HdCard>
          <ul class="host-list">
            <li
              class="host"
              v-for="user in users"
              @click="hostsStore.editUser(user)"
            >
              <div class="host__media">
                <img
                  :src="correctImageUrl(user.avatar)"
                  v-if="user.avatar"
                  class="host__avatar"
                  alt=""
                />
              </div>
              <div class="host__name">{{ user.fullName }}</div>
              <div class="host__roles">Роли - {{ user.roles.join(', ') }}</div>
            </li>
          </ul>
        </HdCard>
      </div>
      <Hosts />
    </div>
  </DashboardContentBodyLayout>
  <HdModal v-model="isOpen">
    <HdForm
      :state="userFormData"
      :schema="hostFormSchema"
      @on-submit="hostsStore.setUser"
    >
      <HdCard title="Добавить пользователя">
        <div class="new-host">
          <div class="new-host__name">
            <HdFormGroup label="Имя" name="firstName" required>
              <HdInput v-model="userFormData.firstName" />
            </HdFormGroup>
            <HdFormGroup label="Фамилия" name="lastName" required>
              <HdInput v-model="userFormData.lastName" />
            </HdFormGroup>
          </div>
          <div class="new-host__group">
            <div class="new-host__group new-host__group--col">
              <HdFormGroup
                label="Почта"
                class="new-host__email"
                name="email"
                required
              >
                <HdInput v-model="userFormData.email" type="email" />
              </HdFormGroup>
              <HdFormGroup label="Роли" name="roles">
                <HdSelect
                  v-model="userFormData.roles"
                  :options="rolesData"
                  option-attr="option"
                  key-attr="label"
                  multiple
                />
              </HdFormGroup>
            </div>
            <div class="new-host__media">
              <img
                class="new-host__image"
                :src="userFormData.avatar"
                v-if="userFormData.avatar"
              />
              <div class="new-host__upload-buttons">
                <HdUploadImage
                  name="AVATAR"
                  v-model="userFormData.avatar"
                  v-tooltip="{ label: 'загрузить изображение' }"
                />
              </div>
            </div>
          </div>
          <div class="new-host__password">
            <HdFormGroup label="Пароль" name="password" required>
              <HdInput v-model="userFormData.password" type="password" />
            </HdFormGroup>
            <HdFormGroup label="Повторите пароль" name="password_new" required>
              <HdInput v-model="userFormData.password_new" type="password" />
            </HdFormGroup>
          </div>
        </div>
        <template #footer>
          <HdButton
            v-if="userFormData.id"
            text="Удалить"
            color="danger"
            @click="hostsStore.deleteUser()"
            :pending
          />
          <HdButton v-if="userFormData.id" text="Обновить" type="submit" />
          <HdButton v-else text="Добавить" type="submit" />
        </template>
      </HdCard>
    </HdForm>
  </HdModal>
</template>

<style lang="scss" scoped src="./styles.scss" />
