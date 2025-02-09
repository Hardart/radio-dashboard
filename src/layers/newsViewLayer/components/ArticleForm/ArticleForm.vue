<script lang="ts" setup>
import type { ArticleForm } from '@/shared/schemes/article-form-schema'
import type { EditorControls } from '@/shared/enums/editor-controls'
import type { Category } from '@/shared/schemes/category-schema'
import { articleFormSchema } from '@/shared/schemes/article-form-schema'
import HdUploadImage from '@/components/ui/hdUploadImage/hdUploadImage.vue'
import HdFormGroup from '@/components/ui/hdFormGroup/HdFormGroup.vue'
import CalendarSelect from '../CalendarSelect/CalendarSelect.vue'
import HdSwitch from '@/components/ui/hdSwitch/hdSwitch.vue'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdSelect from '@/components/ui/hdSelect/hdSelect.vue'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
import HdEditor from '@/components/editor/HdEditor.vue'
import HdForm from '@/components/ui/hdForm/HdForm.vue'

const articleForm = defineModel<ArticleForm>({ required: true })

defineProps<{
  categories: Category[]
  tags: string[]
  loading?: boolean
  isSame?: boolean
}>()

defineEmits(['on-submit', 'on-delete'])

const controls: (keyof typeof EditorControls)[] = [
  'bold',
  'italic',
  'heading',
  'blockquote',
  'floatLeft',
  'floatRight',
  'textWrap',
  'underline',
  'uploadImage',
]
</script>

<template>
  <HdForm
    class="news-item"
    :state="articleForm"
    :schema="articleFormSchema"
    @on-submit="$emit('on-submit')"
  >
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

      <div class="news-item__group">
        <HdEditor
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
          <HdUploadImage
            name="NEWS"
            v-model="articleForm.image"
            v-tooltip="{ label: 'загрузить главное изображение' }"
          />
        </div>
      </div>
      <div class="news-item__actions">
        <HdButton text="Назад" @click="$router.push('/news')" />
        <HdButton
          text="Удалить"
          color="danger"
          @click="$emit('on-delete', articleForm.id)"
          v-if="articleForm.id"
        />
        <HdButton
          :disabled="loading || isSame"
          :text="articleForm.id ? 'Обновить' : 'Сохранить'"
          color="success"
          type="submit"
        />
      </div>
    </div>
  </HdForm>
</template>

<style lang="scss" scoped src="./styles.scss" />
