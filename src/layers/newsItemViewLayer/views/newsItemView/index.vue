<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useNewsStore } from '@/store/useNewsStore'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
import HdSelect from '@/components/ui/hdSelect/hdSelect.vue'
import HdSwitch from '@/components/ui/hdSwitch/hdSwitch.vue'
import HdCalendar from '@/components/ui/hdCalendar/hdCalendar.vue'
import HdUploadImage from '@/components/ui/hdUploadImage/hdUploadImage.vue'
const route = useRoute()
const newsStore = useNewsStore()
const { pending, article, articleForm } = storeToRefs(newsStore)
const id = `${route.params.id}`
newsStore.fetchArticle(id)
const options = ref([
  {
    id: 'r47826fv232fhgfuy23',
    title: 'Региональные новости',
  },
  {
    id: 'r478vvf26fhgf5323',
    title: 'Горячие новости',
  },
  {
    id: 'r478aqr26fh6gf7uy23',
    title: 'Гаджеты',
  },
  {
    id: 'r2rfvsfy647826fhgfuy23',
    title: 'Курьёзы',
  },
  {
    id: 'r78vgfg6fh7gu6i5fuy23',
    title: 'Мемы',
  },
])

const options2 = ref([
  'Региональные новости',
  'Горячие новости',
  'Гаджеты',
  'Курьёзы',
  'Мемы',
])
</script>

<template>
  <h3 v-if="pending">Загрузка....</h3>
  <div class="news-item" v-else-if="article">
    <div class="news-item__details">
      <HdInput
        v-model="articleForm.title"
        label="Название новости"
        name="title"
      />
      <div class="news-item__group">
        <HdSelect :options="options2" v-model="articleForm.categoryId" />
        <HdSelect :options v-model="articleForm.tags" searchable multiple />
        <HdSwitch v-model="articleForm.isPublished" />
        <HdCalendar
          v-model="articleForm.publishAt"
          :min-date="articleForm.publishAt"
        />
      </div>
      <p>
        {{ articleForm }}
      </p>
    </div>
    <div class="news-item__media">
      <img
        class="news-item__image"
        :src="`http://localhost:3068/images/home${articleForm.image}`"
        alt=""
      />

      <div class="news-item__buttons">
        <HdUploadImage name="news" v-model="articleForm.image" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
