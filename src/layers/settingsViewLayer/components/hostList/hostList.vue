<script lang="ts" setup>
import type { User } from '@schema/user-schema'
import HostItem from './components/hostItem/hostItem.vue'
defineProps<{ users: User[] }>()
defineEmits(['on-edit'])
</script>

<template>
  <ul class="host-list">
    <HostItem
      v-for="user in users"
      :user
      :key="user.id"
      @click="$emit('on-edit', user)"
    />
  </ul>
</template>

<style lang="scss" scoped src="./styles.scss" />
