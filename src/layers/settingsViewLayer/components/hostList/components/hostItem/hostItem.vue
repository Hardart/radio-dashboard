<script lang="ts" setup>
import { correctImageUrl } from '@/shared/helpers/utils'
import type { User } from '@schema/user-schema'

defineProps<{ user: User }>()
</script>

<template>
  <li class="host">
    <div class="host__media">
      <img
        :src="correctImageUrl(user.avatar)"
        v-if="user.avatar"
        class="host__avatar"
        alt=""
      />
    </div>
    <div class="host__name">{{ user.fullName }}</div>
    <div class="host__roles">Роли - {{ user.roles.join(', ') }}</div>
  </li>
</template>

<style lang="scss" scoped src="./styles.scss" />
