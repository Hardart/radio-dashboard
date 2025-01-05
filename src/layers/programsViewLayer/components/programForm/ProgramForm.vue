<script lang="ts" setup>
import type { User } from '@/shared/schemes/user-schema'
import HdForm from '@ui/hdForm/HdForm.vue'
import HdInput from '@ui/hdInput/hdInput.vue'
import HdButton from '@ui/hdButton/hdButton.vue'
import HdSelect from '@ui/hdSelect/hdSelect.vue'
import HdSwitch from '@ui/hdSwitch/HdSwitch.vue'
import HdFormGroup from '@ui/hdFormGroup/HdFormGroup.vue'
import HdUploadImage from '@ui/hdUploadImage/hdUploadImage.vue'
import { colors } from '@/shared/helpers/program-colors'
import {
  scheduleTimeToString,
  selectedIdsToWeekday,
} from '@/shared/helpers/schedule'

import {
  type ProgramForm,
  programFormSchema,
} from '@/shared/schemes/program-form-schema'

const programFormData = defineModel<ProgramForm>({ required: true })

defineProps<{ hosts: User[] }>()
defineEmits([
  'onAddSchedule',
  'onEditSchedule',
  'onDeleteSchedule',
  'onSaveProgram',
  'onDeleteProgram',
])
</script>

<template>
  <HdForm
    class="program-form"
    :state="programFormData"
    :schema="programFormSchema"
    @on-submit="$emit('onSaveProgram')"
  >
    <div class="program-form__group">
      <div>
        <HdFormGroup label="Название программы" name="title" required>
          <HdInput v-model="programFormData.title" />
        </HdFormGroup>
        <div class="program-form__group">
          <HdFormGroup label="Ведущие" name="hosts" required>
            <HdSelect
              class="program-form__select"
              v-model="programFormData.hosts"
              :options="hosts"
              key-attr="id"
              option-attr="fullName"
              multiple
            />
          </HdFormGroup>
          <HdFormGroup label="Выбрать цвет">
            <HdSelect
              class="program-form__select"
              v-model="programFormData.color"
              :options="colors"
              key-attr="option"
            />
          </HdFormGroup>
          <HdFormGroup label="Опубликовано">
            <HdSwitch v-model="programFormData.isPublished" />
          </HdFormGroup>
          <div class="program-form__button">
            <HdButton
              text="Добавить расписание"
              @click="$emit('onAddSchedule')"
              size="s"
            />
          </div>
        </div>
      </div>
      <div class="program-form__media">
        <img
          class="program-form__image"
          :src="programFormData.image"
          v-if="programFormData.image"
        />
        <div class="program-form__upload-buttons">
          <HdUploadImage
            name="PROGRAMS"
            v-model="programFormData.image"
            v-tooltip="{ label: 'загрузить изображение' }"
          />
        </div>
      </div>
    </div>
    <ul
      class="program-form-schedule-list"
      v-if="programFormData.schedule.length"
    >
      <li
        class="program-form-schedule"
        v-for="(schedule, idx) in programFormData.schedule"
      >
        <h4 class="program-form-schedule__title">
          {{ selectedIdsToWeekday(schedule.weekdayIds) }}
        </h4>
        <ul class="program-form-schedule__time-list">
          <li
            v-for="props in schedule.properties"
            class="program-form-schedule__time"
          >
            <p class="program-form-schedule__time-text">
              {{ scheduleTimeToString(props) }}
            </p>
            <div v-if="props.isReplay" class="program-form-schedule__replay">
              повтор
            </div>
          </li>
        </ul>
        <div class="program-form-schedule__controls">
          <HdButton
            size="s"
            icon="edit"
            @click="$emit('onEditSchedule', idx)"
          />
          <HdButton
            size="s"
            icon="delete"
            color="danger"
            @click="$emit('onDeleteSchedule', idx)"
          />
        </div>
      </li>
    </ul>
    <div class="program-form__controls">
      <HdButton text="Назад" @click="$router.go(-1)" />
      <HdButton
        v-if="programFormData.id"
        text="Удалить"
        @click="$emit('onDeleteProgram', programFormData.id)"
        color="danger"
      />
      <HdButton
        :text="programFormData.id ? 'Обновить' : 'Сохранить'"
        color="success"
        type="submit"
      />
    </div>
  </HdForm>
</template>

<style lang="scss" scoped src="./styles.scss" />
