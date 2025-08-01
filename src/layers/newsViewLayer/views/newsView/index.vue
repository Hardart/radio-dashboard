<script setup lang="ts">
import * as UI from '@ui'
import * as ContentLayout from '@contentLayout'
import { useNewsStore } from '@/layers/newsViewLayer/store/useNewsStore'
import { storeToRefs } from 'pinia'

const newsStore = useNewsStore()
newsStore.fetchArticles()
newsStore.fetchBaseData()
const { articlesCount } = storeToRefs(newsStore)
</script>

<template>
  <ContentLayout.Root>
    <ContentLayout.Header title="Новости">
      <template #header>
        <UI.Badge :label="articlesCount" type="warning" />
      </template>
      <UI.Button
        icon="news"
        text="Создать"
        color="primary"
        variant="link"
        @click="$router.push('/news/create')"
      />
    </ContentLayout.Header>
    <ContentLayout.Body no-padding>
      <RouterView />
    </ContentLayout.Body>
  </ContentLayout.Root>
</template>

<style lang="scss" scoped src="./style.scss" />
