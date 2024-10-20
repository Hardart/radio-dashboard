<script setup lang="ts">
import HdBadge from '@ui/hdBadge/hdBadge.vue'
import HdButton from '@ui/hdButton/hdButton.vue'
import { useNewsStore } from '@/store/useNewsStore'
import { storeToRefs } from 'pinia'
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
        <thead class="hd-table__head">
          <tr>
            <th class="hd-table__title">N</th>
            <th class="hd-table__title">
              <HdButton
                text="Название новости"
                flip-icon="sort"
                class="hd-table__filter"
                @click="toggleSort('title')"
              />
            </th>
            <th class="hd-table__title">Категория</th>
            <th class="hd-table__title">
              <HdButton
                text="Дата создания"
                flip-icon="sort"
                class="hd-table__filter"
                @click="toggleSort('createdAt')"
              />
            </th>
            <th class="hd-table__title">Статус</th>
            <th class="hd-table__title"></th>
          </tr>
        </thead>
        <tbody class="hd-table__body">
          <tr
            class="hd-table__row"
            v-for="(article, i) in articlesFilteredByTitle"
            :key="article.id"
          >
            <td class="hd-table__cell">{{ i + 1 }}</td>
            <td class="hd-table__cell">{{ article.title }}</td>
            <td class="hd-table__cell">{{ article.category.title }}</td>
            <td class="hd-table__cell">
              {{ normalizeDate(article.createdAt) }}
            </td>
            <td class="hd-table__cell">
              <HdBadge
                :text="article.status"
                :type="getStatus(article.status)"
              />
            </td>
            <td class="hd-table__cell">...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./style.scss" />
