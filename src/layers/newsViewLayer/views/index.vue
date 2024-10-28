<script setup lang="ts">
import { storeToRefs } from 'pinia'
import HdBadge from '@ui/hdBadge/hdBadge.vue'
import HdButton from '@ui/hdButton/hdButton.vue'
import { useNewsStore } from '@/store/useNewsStore'
import { toggleSort } from '@/shared/helpers/sort-articles'
import { getStatus } from '@/shared/helpers/set-status'
import { normalizeDate } from '@/shared/helpers/date'

const newsStore = useNewsStore()
const { articlesFilteredByTitle, pending } = storeToRefs(newsStore)
newsStore.fetchArticles()
</script>

<template>
  <div class="news">
    <div class="news__header">
      <h3 class="news__title">Новости</h3>
      <HdButton text="Создать" type="primary" />
    </div>
    <div class="news__body">
      <h3 v-if="pending"><span>Загрузка...</span></h3>
      <table class="hd-table" v-else>
        <thead>
          <tr>
            <th>N</th>
            <th>
              <HdButton
                text="Название новости"
                flip-icon="sort"
                class="sortable"
                @click="toggleSort('title')"
              />
            </th>
            <th>Категория</th>
            <th>
              <HdButton
                text="Дата создания"
                flip-icon="sort"
                class="sortable"
                @click="toggleSort('createdAt')"
              />
            </th>
            <th>Статус</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <RouterLink
            custom
            :to="`/news/${article.id}`"
            v-slot="{ navigate }"
            v-for="(article, i) in articlesFilteredByTitle"
            :key="article.id"
          >
            <tr @click="navigate">
              <td>{{ i + 1 }}</td>
              <td>{{ article.title }}</td>
              <td>{{ article.category.title }}</td>
              <td>
                {{ normalizeDate(article.createdAt) }}
              </td>
              <td>
                <HdBadge
                  :text="article.status"
                  :type="getStatus(article.status)"
                />
              </td>
              <td>...</td>
            </tr>
          </RouterLink>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./style.scss" />
