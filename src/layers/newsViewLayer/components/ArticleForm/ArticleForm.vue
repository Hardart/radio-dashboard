<script lang="ts" setup>
import type { ArticleForm } from '@schema/article-form-schema'
import type { EditorControls } from '@/shared/enums/editor-controls'
import type { Category } from '@schema/category-schema'
import * as UI from '@ui'
import { articleFormSchema } from '@schema/article-form-schema'
import CalendarSelect from '../CalendarSelect/CalendarSelect.vue'
import HdSelectImage from '@/components/ui/hdSelectImage/hdSelectImage.vue'

const articleForm = defineModel<ArticleForm>({ required: true })

defineProps<{
  categories: Category[]
  tags: string[]
  loading?: boolean
  isSame?: boolean
}>()

defineEmits(['on-submit', 'on-delete'])

const controls: (keyof typeof EditorControls)[] = [
  'Heading',
  'Bold',
  'Italic',
  'Underline',
  'Blockquote',
  'FloatLeft',
  'FloatRight',
  'TextWrap',
  'UploadImage',
  'SelectImage',
]
</script>

<template>
  <UI.Form
    class="news-item"
    :state="articleForm"
    :schema="articleFormSchema"
    @on-submit="$emit('on-submit')"
  >
    <div class="news-item__details">
      <UI.Group label="Название новости" name="title" required>
        <UI.Input v-model="articleForm.title" />
      </UI.Group>

      <div class="news-item__group">
        <UI.Group label="Выбери категорию" name="categoryId" required>
          <UI.Select
            :options="categories"
            v-model="articleForm.categoryId"
            label="Категория"
            key-attr="id"
            option-attr="title"
          />
        </UI.Group>

        <UI.Group label="Выбери теги" name="tags">
          <UI.Select :options="tags" v-model="articleForm.tags" label="Теги" />
        </UI.Group>

        <UI.Group label="Дата публикации" name="publishAt">
          <CalendarSelect
            v-model="articleForm.publishAt"
            :min-date="articleForm.publishAt"
            label="Дата публикации"
          />
        </UI.Group>

        <UI.Group label="Опубликовано" name="isPublished">
          <UI.Switch v-model="articleForm.isPublished" />
        </UI.Group>
      </div>

      <div class="news-item__group">
        <UI.Editor
          v-model="articleForm.content"
          :controls
          label="Текст новости"
        />
      </div>
    </div>

    <div class="news-item__aside">
      <div class="news-item__media">
        <img
          class="news-item__image"
          :src="articleForm.image"
          v-if="articleForm.image"
        />
        <div class="news-item__upload-buttons">
          <UI.UploadImage
            name="NEWS"
            v-model="articleForm.image"
            v-tooltip="{ label: 'загрузить главное изображение' }"
          />
          <HdSelectImage
            name="NEWS"
            v-model="articleForm.image"
            tooltip-label="выбрать главное изображение"
          />
        </div>
      </div>
      <div class="news-item__actions">
        <UI.Button text="Назад" @click="$router.push('/news')" />
        <UI.Button
          text="Удалить"
          color="danger"
          @click="$emit('on-delete', articleForm.id)"
          v-if="articleForm.id"
        />
        <UI.Button
          :disabled="loading || isSame"
          :text="articleForm.id ? 'Обновить' : 'Сохранить'"
          color="success"
          type="submit"
        />
      </div>
    </div>
  </UI.Form>
</template>

<style lang="scss" scoped src="./styles.scss" />
