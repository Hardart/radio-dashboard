<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import HdBadge from '@ui/hdBadge/hdBadge.vue'
import HdButton from '@ui/hdButton/hdButton.vue'
import { computed, ref } from 'vue'

const news = ref([
  {
    id: '66d38c942c356e9ba95dfb66',
    title: 'Выпустили духи с ароматом майонеза. Их раскупили за день',
    category: 'Курьёзы',
    date: '01.09.2024, 00:35:16',
    status: 'в ожидании',
  },
  {
    id: '66d38c942c321e9ba95dfb43',
    title: 'Выпустили духи с ароматом майонеза. Их раскупили за день',
    category: 'Мемы и Тренды',
    date: '10.07.2024, 00:25:39',
    status: 'опубликовано',
  },
  {
    id: '66d38c942c356e7ba95dfb56',
    title: 'Дуа Липу заметили на свидании с популярным комиком',
    category: 'Горячие Новости',
    date: '20.03.2024, 17:37:26',
    status: 'опубликовано',
  },
  {
    id: '66d38c942c356e7ba95dfb56',
    title: 'Вместе веселей: ChatGPT появится в iOS 18',
    category: 'Гаджеты',
    date: '18.05.2024, 14:27:23',
    status: 'не опубликовано',
  },
])
const sortBy = ref<'asc' | 'desc'>('desc')
const sorting = () => {
  sortBy.value = sortBy.value == 'desc' ? 'asc' : 'desc'
}
const sortedNews = computed(() =>
  news.value.sort((a, b) => {
    if (a.title < b.title) return sortBy.value === 'asc' ? -1 : 1
    if (a.title > b.title) return sortBy.value === 'asc' ? 1 : -1
    return 0
  })
)
</script>

<template>
  <div class="news">
    <div class="news__header">
      <h3 class="news__title">Новости</h3>
      <HdButton text="Создать" type="primary" />
    </div>
    <div class="news__body">
      <table class="hd-table">
        <thead class="hd-table__head">
          <tr>
            <th class="hd-table__title">N</th>
            <th class="hd-table__title">
              <HdButton
                text="Название новости"
                flip-icon="sort"
                class="hd-table__filter"
                @click="sorting"
              />
            </th>
            <th class="hd-table__title">Категория</th>
            <th class="hd-table__title">
              <HdButton
                text="Дата создания"
                flip-icon="sort"
                class="hd-table__filter"
                @click="sorting"
              />
            </th>
            <th class="hd-table__title">Статус</th>
            <th class="hd-table__title"></th>
          </tr>
        </thead>
        <tbody class="hd-table__body">
          <tr
            class="hd-table__row"
            v-for="(article, i) in sortedNews"
            :key="article.id"
          >
            <td class="hd-table__cell">{{ i + 1 }}</td>
            <td class="hd-table__cell">{{ article.title }}</td>
            <td class="hd-table__cell">{{ article.category }}</td>
            <td class="hd-table__cell">{{ article.date }}</td>
            <td class="hd-table__cell">
              <HdBadge :text="article.status" type="success" />
            </td>
            <td class="hd-table__cell">...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./style.scss" />
