<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import UserMenu from '../UserMenu/UserMenu.vue'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
</script>

<template>
  <div class="header-left">
    <HdInput
      icon="search"
      class="header-left__search"
      icon-class="search-icon"
    />
    <div class="notifications">
      <SvgIcon icon="bell" class="notifications__icon" />
    </div>
    <div class="user">
      <div class="user__logo">
        <img src="@/assets/images/user.png" alt="" />
      </div>
      <UserMenu />
    </div>
  </div>
</template>

<style lang="scss" scoped src="./HeaderLeft.scss" />
