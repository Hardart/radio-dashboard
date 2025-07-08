<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useDefaultStore } from '@/store/useDefaultStore'
import DashboardContentFooterLayout from '@/layouts/Content/dashboardContentFooterLayout.vue'
import DashboardContentBodyLayout from '@/layouts/Content/dashboardContentBodyLayout.vue'
import SettingsContactsForm from '@/components/settings/SettingsContactsForm.vue'
import Addresses from '../../components/addresses/Addresses.vue'
import Phones from '../../components/phones/Phones.vue'
import Mails from '../../components/mails/Mails.vue'
import HdButton from '@hd/hdButton/hdButton.vue'

const store = useDefaultStore()
const {
  contacts,
  emails,
  phones,
  addresses,
  isOpenAddressModal,
  isOpenMailModal,
  isOpenPhoneModal,
  address,
  mail,
  phone,
} = storeToRefs(store)
</script>

<template>
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
  <Phones
    v-model="isOpenPhoneModal"
    :phone
    :phones
    @add="store.addPhone"
    @cancel="store.togglePhoneModalState(false)"
    @delete="store.deletePhone"
  />
</template>

<style lang="scss" scoped src="./styles.scss" />
