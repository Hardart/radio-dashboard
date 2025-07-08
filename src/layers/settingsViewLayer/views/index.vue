<script lang="ts" setup>
import { useDefaultStore } from '@/store/useDefaultStore'
import DashboardContentLayout from '@/layouts/Content/dashboardContentLayout.vue'
import HeaderBar from '../components/headerBar/HeaderBar.vue'

const store = useDefaultStore()
store.fetchBaseData()
store.fetchBaseContacts()
const userNavigationList = [
  { label: 'Контакты', to: '/settings/contacts' },
  { label: 'Сотрудники', to: '/settings/hosts' },
]
</script>

<template>
  <DashboardContentLayout>
    <HeaderBar
      :is-footer-contacts-on="store.isFooterContactsOn"
      @toggle-address="store.toggleAddressModalState"
      @toggle-mail="store.toggleMailModalState"
      @toggle-phone="store.togglePhoneModalState"
      @toggle-contacts-mode="store.toggleBaseAndFooterContacts"
    />
    <ul class="settings-nav">
      <RouterLink
        v-for="navigationItem in userNavigationList"
        :to="navigationItem.to"
        v-slot="{ navigate, isExactActive }"
        custom
      >
        <li
          class="settings-nav__item"
          :class="{ 'settings-nav__item--active': isExactActive }"
          @click="navigate"
        >
          {{ navigationItem.label }}
        </li>
      </RouterLink>
    </ul>
    <RouterView />
  </DashboardContentLayout>
</template>

<style lang="scss" scoped src="./styles.scss" />
