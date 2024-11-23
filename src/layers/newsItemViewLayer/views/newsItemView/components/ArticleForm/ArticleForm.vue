<script lang="ts" setup>
import type { ArticleForm } from '@/shared/schemes/article-form-schema'
import type { Category } from '@/shared/schemes/category-schema'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
import HdSwitch from '@/components/ui/hdSwitch/hdSwitch.vue'
import HdCalendar from '@/components/ui/hdCalendar/hdCalendar.vue'
import HdUploadImage from '@/components/ui/hdUploadImage/hdUploadImage.vue'
import HdCategorySelect from '@/components/ui/hdCategorySelect/hdCategorySelect.vue'
import HdTagsSelect from '@/components/ui/hdTagsSelect/hdTagsSelect.vue'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdEditor from '@/components/editor/HdEditor.vue'
const articleForm = defineModel<ArticleForm>({ required: true })
defineProps<{
  categories: Category[]
  tags: string[]
}>()
defineEmits(['on-submit'])
</script>

<template>
  <div class="news-item">
    <div class="news-item__details">
      <HdInput
        v-model="articleForm.title"
        label="Название новости"
        name="title"
      />

      <div class="news-item__group">
        <HdCategorySelect
          :options="categories"
          v-model="articleForm.categoryId"
          label="Категория"
        />
        <HdTagsSelect :options="tags" v-model="articleForm.tags" label="Теги" />
        <HdSwitch v-model="articleForm.isPublished" />
        <HdCalendar
          v-model="articleForm.publishAt"
          :min-date="articleForm.publishAt"
          label="Дата публикации"
        />
      </div>

      <div>
        <HdEditor v-model="articleForm.content" />
      </div>
    </div>

    <div class="news-item__aside">
      <div class="news-item__media">
        <img
          class="news-item__image"
          :src="`http://localhost:3068/images/home/images/news/20241118/af1de16b7b6cb33c_orig.webp`"
          alt=""
        />
        <div class="news-item__upload-buttons">
          <HdUploadImage
            name="news"
            v-model="articleForm.image"
            v-tooltip="{ label: 'Загрузить' }"
          />
        </div>
      </div>
      <div class="news-item__actions">
        <HdButton
          text="Отменить"
          type="outline-danger"
          @click="$router.go(-1)"
        />
        <HdButton
          text="Сохранить"
          type="outline-primary"
          @click="$emit('on-submit', articleForm)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
