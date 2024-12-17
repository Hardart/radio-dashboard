<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import DashboardContentBodyLayout from '@/layouts/dashboardContentBodyLayout.vue'
import DashboardContentHeaderLayout from '@/layouts/dashboardContentHeaderLayout.vue'
import DashboardContentLayout from '@/layouts/dashboardContentLayout.vue'
import { useDefaultStore } from '@/store/useDefaultStore'
import { storeToRefs } from 'pinia'
import Addresses from '../../components/addresses/Addresses.vue'
import Mails from '../../components/mails/Mails.vue'
import SettingsContactsForm from '@/components/settings/SettingsContactsForm.vue'
import DashboardContentFooterLayout from '@/layouts/dashboardContentFooterLayout.vue'
import ControllersBar from '../../components/controllersBar/ControllersBar.vue'
import HeaderBar from '../../components/headerBar/HeaderBar.vue'

const store = useDefaultStore()
const {
  contacts,
  emails,
  phones,
  addresses,
  isOpenAddressModal,
  isOpenMailModal,
  address,
  mail,
} = storeToRefs(store)
store.fetchBaseData()
store.fetchBaseContacts()
</script>

<template>
  <DashboardContentLayout>
    <HeaderBar
      @toggle-address="store.toggleAddressModalState"
      @toggle-mail="store.toggleMailModalState"
      @toggle-phone="store.togglePhoneModalState"
    />
    <ControllersBar
      @toggle-base="store.toggleBaseAndFooterContacts(false)"
      @toggle-footer="store.toggleBaseAndFooterContacts(true)"
    />
    <DashboardContentBodyLayout column>
      <div class="contacts">
        <div v-if="phones.length" class="contacts-form">
          <label class="contacts-form__label">Телефоны</label>
          <SettingsContactsForm
            v-for="phone in contacts?.phones"
            :contact="phone"
            :options="phones"
            option-attribute="number"
          />
          <div class="contacts-form__controls">
            <HdButton
              text="добавить"
              variant="solid"
              size="xs"
              @click="store.addPhoneModel"
            />
          </div>
        </div>

        <div v-if="emails.length" class="contacts-form">
          <label class="contacts-form__label">Почтовые ящики</label>
          <SettingsContactsForm
            v-for="mail in contacts?.emails"
            :contact="mail"
            :options="emails"
            option-attribute="address"
          />
          <div class="contacts-form__controls">
            <HdButton
              text="добавить"
              variant="solid"
              size="xs"
              @click="store.addMailModel"
            />
          </div>
        </div>

        <div
          v-if="addresses.length"
          class="contacts-form contacts-form--full-width"
        >
          <label class="contacts-form__label">Адреса</label>
          <SettingsContactsForm
            v-for="address in contacts?.addresses"
            :contact="address"
            :options="addresses"
            option-attribute="fullAddress"
          />
          <div class="contacts-form__controls">
            <HdButton
              text="добавить"
              variant="solid"
              size="xs"
              @click="store.addAddressModel"
            />
          </div>
        </div>
      </div>
    </DashboardContentBodyLayout>
    <DashboardContentFooterLayout>
      <HdButton
        text="Сохранить изменения"
        color="success"
        @click="store.saveChanges"
      />
    </DashboardContentFooterLayout>
  </DashboardContentLayout>
  <Addresses
    v-model="isOpenAddressModal"
    :address
    :addresses
    @add="store.addAddress"
    @cancel="store.toggleAddressModalState(false)"
    @delete="store.deleteAddress"
  />
  <Mails
    v-model="isOpenMailModal"
    :mail
    :emails
    @add="store.addMail"
    @cancel="store.toggleMailModalState(false)"
    @delete="store.deleteMail"
  />
</template>

<style lang="scss" scoped src="./styles.scss" />
