<script setup lang="ts">
import NotifcationItem from './NotifcationItem/NotifcationItem.vue'
import { useNotifications } from './useNotifications'
const { isShowContainer, notifications } = useNotifications()
</script>

<template>
  <div class="hd-notifications" v-if="isShowContainer">
    <TransitionGroup class="hd-notifications__list" tag="ul" name="fade">
      <NotifcationItem
        v-for="item in notifications"
        :key="item.id"
        v-bind="item"
      />
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped src="./hdNotifications.scss" />
