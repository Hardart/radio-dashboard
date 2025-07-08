<script lang="ts" setup>
import type { HostFormData } from '@schema/host-schema'
import * as UI from '@ui'
import type { AnyZodObject } from 'zod'

defineProps<{
  state: HostFormData
  schema: AnyZodObject
  pending?: boolean
}>()

defineEmits(['on-submit', 'on-delete'])

const rolesData = [
  { label: 'admin', option: 'Администратор' },
  { label: 'superadmin', option: 'Супер администратор' },
  { label: 'host', option: 'Ведущий' },
  { label: 'dj', option: 'Диджей' },
]
</script>

<template>
  <UI.Form :state :schema @on-submit="$emit('on-submit')">
    <UI.Card title="Добавить пользователя">
      <div class="new-host">
        <div class="new-host__name">
          <UI.Group label="Имя" name="firstName" required>
            <UI.Input v-model="state.firstName" />
          </UI.Group>
          <UI.Group label="Фамилия" name="lastName" required>
            <UI.Input v-model="state.lastName" />
          </UI.Group>
        </div>
        <div class="new-host__group">
          <div class="new-host__group new-host__group--col">
            <UI.Group
              label="Почта"
              class="new-host__email"
              name="email"
              required
            >
              <UI.Input v-model="state.email" type="email" />
            </UI.Group>
            <UI.Group label="Роли" name="roles">
              <UI.Select
                v-model="state.roles"
                :options="rolesData"
                option-attr="option"
                key-attr="label"
                multiple
              />
            </UI.Group>
          </div>
          <div class="new-host__media">
            <img
              class="new-host__image"
              :src="state.avatar"
              v-if="state.avatar"
            />
            <div class="new-host__upload-buttons">
              <UI.UploadImage
                name="AVATAR"
                v-model="state.avatar"
                v-tooltip="{ label: 'загрузить изображение' }"
              />
            </div>
          </div>
        </div>
        <div class="new-host__password">
          <UI.Group label="Пароль" name="password">
            <UI.Input v-model="state.password" type="password" />
          </UI.Group>
          <UI.Group label="Повторите пароль" name="password_new">
            <UI.Input v-model="state.password_new" type="password" />
          </UI.Group>
        </div>
      </div>
      <template #footer>
        <UI.Button
          v-if="state.id"
          text="Удалить"
          color="danger"
          @click="$emit('on-delete')"
          :pending
        />
        <UI.Button v-if="state.id" text="Обновить" type="submit" />
        <UI.Button v-else text="Добавить" type="submit" />
      </template>
    </UI.Card>
  </UI.Form>
</template>

<style lang="scss" scoped src="./userForm.scss" />
