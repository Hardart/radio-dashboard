<script lang="ts" setup>
import { watch } from 'vue'
import type { User } from '@schema/user-schema'
import type { EditorControls } from '@/shared/enums/editor-controls'
import * as UI from '@ui'
import { hslaColors } from '@/shared/helpers/program-colors'
import {
  type ProgramForm,
  programFormSchema,
} from '@schema/program-form-schema'
import { replaceOriginalImage } from '@/shared/helpers/utils'

const programFormData = defineModel<ProgramForm>({ required: true })
defineProps<{ hosts: User[] }>()

defineEmits(['onSave', 'onDelete', 'onAdd'])

watch(
  () => programFormData.value.isPublished,
  () => {
    if (!programFormData.value.isPublished)
      programFormData.value.showInMenu = false
  }
)

const controls: (keyof typeof EditorControls)[] = [
  'Heading',
  'Bold',
  'Italic',
  'Underline',
  'TextWrap',
]

const programTypes = ['программа', 'дайджест']
</script>

<template>
  <UI.Form
    class="program-form"
    :state="programFormData"
    :schema="programFormSchema"
    @on-submit="$emit('onSave')"
  >
    <div class="program-form__container">
      <div class="program-form__group">
        <div
          class="program-form__group program-form__group--col program-form__group--full"
        >
          <div class="program-form__group program-form__group--full">
            <UI.Group
              label="Название программы"
              name="title"
              required
              :style="{
                fullWidth: true,
              }"
            >
              <UI.Input v-model="programFormData.title" size="xl" />
            </UI.Group>
            <UI.Button
              v-if="programFormData.schedule?.length === 0"
              text="Добавить расписание"
              icon="add"
              @click="$emit('onAdd', programFormData.id)"
            />
          </div>
          <div class="program-form__group">
            <UI.Group label="Ведущие">
              <UI.Select
                class="program-form__select"
                v-model="programFormData.hosts"
                :options="hosts"
                key-attr="id"
                option-attr="fullName"
                multiple
              />
            </UI.Group>

            <UI.Group label="Выбрать цвет">
              <UI.Select
                class="program-form__select"
                v-model="programFormData.color"
                :options="hslaColors"
                key-attr="option"
              />
            </UI.Group>
            <UI.Group label="Опубликовать">
              <UI.Switch v-model="programFormData.isPublished" />
            </UI.Group>
            <UI.Group label="Показать в меню">
              <UI.Switch
                v-model="programFormData.showInMenu"
                :disabled="!programFormData.isPublished"
              />
            </UI.Group>
            <UI.Group label="Тип">
              <UI.Select
                class="program-form__select"
                v-model="programFormData.type"
                :options="programTypes"
              />
            </UI.Group>
          </div>
        </div>
        <div class="program-form__media">
          <div class="program-form__wrapper">
            <img
              class="program-form__image"
              :src="replaceOriginalImage(programFormData.image, 250)"
              v-if="programFormData.image"
            />
          </div>
          <div class="program-form__upload-buttons">
            <UI.UploadImage
              name="PROGRAMS"
              v-model="programFormData.image"
              v-tooltip="{ label: 'загрузить изображение' }"
            />
            <UI.SelectImage
              name="PROGRAMS"
              v-model="programFormData.image"
              tooltip-label="загрузить изображение"
            />
          </div>
        </div>
      </div>
      <div class="program-form__group">
        <UI.Editor
          label="Описание программы"
          v-model="programFormData.description"
          :controls
          :containerStyles="{ height: '250px' }"
        />
      </div>
      <div class="program-form__controls">
        <UI.Button
          v-if="programFormData.id"
          text="Удалить"
          @click="$emit('onDelete', programFormData.id)"
          color="danger"
        />
        <UI.Button
          :text="programFormData.id ? 'Обновить' : 'Создать'"
          color="success"
          type="submit"
        />
      </div>
    </div>
  </UI.Form>
</template>

<style lang="scss" scoped src="./styles.scss" />
