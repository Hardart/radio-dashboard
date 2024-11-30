<script lang="ts" setup>
import type { ArticleForm } from '@/shared/schemes/article-form-schema'
import type { Category } from '@/shared/schemes/category-schema'
import { articleFormSchema } from '@/shared/schemes/article-form-schema'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
import HdSwitch from '@/components/ui/hdSwitch/hdSwitch.vue'
import HdUploadImage from '@/components/ui/hdUploadImage/hdUploadImage.vue'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdEditor from '@/components/editor/HdEditor.vue'
import HdSelect from '@/components/ui/hdSelect/hdSelect.vue'
import HdFormGroup from '@/components/ui/hdFormGroup/HdFormGroup.vue'
import { useFormValidation } from '@/composables/useFormValidation'
import CalendarSelect from '../CalendarSelect/CalendarSelect.vue'
import { provide } from 'vue'
const { errors, getZodErrors } = useFormValidation()
const articleForm = defineModel<ArticleForm>({ required: true })
defineProps<{
  categories: Category[]
  tags: string[]
}>()
const emits = defineEmits(['on-submit', 'on-delete'])

provide('form-errors', errors)

const onFormSubmit = async () => {
  await getZodErrors(articleForm.value, articleFormSchema)

  if (errors.value.length) return
  emits('on-submit')
}
</script>

<template>
  <form class="news-item" @submit.prevent="onFormSubmit">
    <div class="news-item__details">
      <HdFormGroup label="Название новости" name="title" required>
        <HdInput v-model="articleForm.title" />
      </HdFormGroup>

      <div class="news-item__group">
        <HdFormGroup label="Выбери категорию" name="categoryId" required>
          <HdSelect
            :options="categories"
            v-model="articleForm.categoryId"
            label="Категория"
            key-attr="id"
            option-attr="title"
          />
        </HdFormGroup>

        <HdFormGroup label="Выбери теги" name="tags">
          <HdSelect :options="tags" v-model="articleForm.tags" label="Теги" />
        </HdFormGroup>

        <HdFormGroup label="Дата публикации" name="publishAt">
          <CalendarSelect
            v-model="articleForm.publishAt"
            :min-date="articleForm.publishAt"
            label="Дата публикации"
          />
        </HdFormGroup>

        <HdFormGroup label="Опубликовано" name="isPublished">
          <HdSwitch v-model="articleForm.isPublished" />
        </HdFormGroup>
      </div>

      <HdFormGroup label="Текст новости" name="content" required>
        <div class="news-item__group">
          <HdEditor v-model="articleForm.content" />
        </div>
      </HdFormGroup>
    </div>

    <div class="news-item__aside">
      <div class="news-item__media">
        <img
          class="news-item__image"
          :src="articleForm.image"
          v-if="articleForm.image"
        />
        <div class="news-item__upload-buttons">
          <HdUploadImage
            name="NEWS"
            v-model="articleForm.image"
            v-tooltip="{ label: 'Загрузить главное изображение' }"
          />
        </div>
      </div>
      <div class="news-item__actions">
        <HdButton text="Назад" color="danger" @click="$router.push('/news')" />
        <HdButton
          v-if="articleForm.id"
          text="Удалить"
          color="primary"
          @click="$emit('on-delete', articleForm.id)"
        />
        <HdButton
          submit
          :text="articleForm.id ? 'Обновить' : 'Сохранить'"
          variant="outline"
          color="success"
        />
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped src="./styles.scss" />
