<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import DashboardContentHeaderLayout from '@/layouts/dashboardContentHeaderLayout.vue'
defineProps<{
  isFooterContactsOn: unknown
}>()
defineEmits([
  'toggle-phone',
  'toggle-mail',
  'toggle-address',
  'toggle-contacts-mode',
])
</script>

<template>
  <DashboardContentHeaderLayout>
    <div class="dashboard__header--left">
      <h3 class="dashboard__header-title">Настройки</h3>
    </div>
    <div
      class="dashboard__header--right"
      v-if="$route.fullPath.includes('contacts')"
    >
      <HdButton
        :text="isFooterContactsOn ? 'Контакты футера' : 'Страница `Контакты`'"
        @click="$emit('toggle-contacts-mode')"
        variant="solid"
      />
      <HdButton
        icon="phone-add"
        square
        @click="$emit('toggle-phone')"
        v-tooltip="{ label: 'добавить телефон' }"
      />
      <HdButton
        icon="mail"
        square
        @click="$emit('toggle-mail')"
        v-tooltip="{ label: 'добавить почту' }"
      />
      <HdButton
        icon="address-add"
        square
        @click="$emit('toggle-address')"
        v-tooltip="{ label: 'добавить адрес' }"
      />
    </div>
  </DashboardContentHeaderLayout>
</template>

<style lang="scss" scoped src="" />
