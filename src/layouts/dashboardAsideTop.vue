<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const logo = defineAsyncComponent(() => import(`@/assets/images/logo.svg`))
const logoText = defineAsyncComponent(
  () => import(`@/assets/images/logo-text.svg`)
)
</script>

<template>
  <div class="dashboard__aside--top">
    <div class="logo">
      <div class="logo__main">
        <component :is="logo"></component>
      </div>
      <div class="logo__text">
        <component :is="logoText"></component>
      </div>
    </div>
  </div>
</template>
