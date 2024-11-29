<script lang="ts" setup>
import type { ArticleForm } from '@/shared/schemes/article-form-schema'
import type { Category } from '@/shared/schemes/category-schema'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
import HdSwitch from '@/components/ui/hdSwitch/hdSwitch.vue'
import HdUploadImage from '@/components/ui/hdUploadImage/hdUploadImage.vue'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdEditor from '@/components/editor/HdEditor.vue'
import HdSelect from '@/components/ui/hdSelect/hdSelect.vue'
import HdFormGroup from '@/components/ui/hdFormGroup/HdFormGroup.vue'
import CalendarSelect from '../CalendarSelect/CalendarSelect.vue'
const articleForm = defineModel<ArticleForm>({ required: true })
defineProps<{
  categories: Category[]
  tags: string[]
}>()
defineEmits(['on-submit', 'on-delete'])
</script>

<template>
  <div class="news-item">
    <form class="news-item__details" @submit.prevent>
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

        <HdSwitch v-model="articleForm.isPublished" label="Опубликовано" />
      </div>

      <div class="news-item__group">
        <HdFormGroup label="Текст новости">
          <HdEditor v-model="articleForm.content" />
        </HdFormGroup>
      </div>
    </form>

    <div class="news-item__aside">
      <div class="news-item__media">
        <img class="news-item__image" :src="articleForm.image" />
        <div class="news-item__upload-buttons">
          <HdUploadImage
            name="NEWS"
            v-model="articleForm.image"
            v-tooltip="{ label: 'Загрузить главное изображение' }"
          />
        </div>
      </div>
      <div class="news-item__actions">
        <HdButton
          text="Отменить"
          type="outline-danger"
          @click="$router.push('/news')"
        />
        <HdButton
          v-if="articleForm.id"
          text="Удалить"
          type="outline-primary"
          @click="$emit('on-delete', articleForm.id)"
        />
        <HdButton
          text="Сохранить"
          type="outline-success"
          @click="$emit('on-submit', articleForm)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
