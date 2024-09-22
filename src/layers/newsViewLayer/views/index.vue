<script setup lang="ts">
import HdBadge from '@ui/hdBadge/hdBadge.vue'
import HdButton from '@ui/hdButton/hdButton.vue'
</script>

<template>
  <div class="news">
    <div class="news__header">
      <h3 class="news__title">Новости</h3>
      <HdButton text="Создать" type="primary" />
    </div>
    <div class="news__body">
      <table class="hd-table">
        <thead>
          <tr>
            <th>N</th>
            <th>Название новости</th>
            <th>Категория</th>
            <th>Дата создания</th>
            <th>Статус</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>какое-то название новости</td>
            <td>Штаны</td>
            <td>20.03.2024</td>
            <td><HdBadge text="не опубликовано" type="danger" /></td>
            <td>...</td>
          </tr>
          <tr>
            <td>2</td>
            <td>другая новость</td>
            <td>Штаны</td>
            <td>20.03.2024</td>
            <td><HdBadge text="опубликовано" type="success" /></td>
            <td>...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped src="./style.scss" />
