<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import * as UI from '@ui'
import * as ContentLayout from '@contentLayout'
import UserForm from '../../components/userForm/userForm.vue'
import HostList from '../../components/hostList/hostList.vue'
import { useHostsStore } from '../../store/useHostsStore'
import { hostFormSchema } from '@schema/host-schema'

const hostsStore = useHostsStore()
const { users, userFormData, pending, isOpen } = storeToRefs(hostsStore)
hostsStore.fetchUsers()
</script>

<template>
  <ContentLayout.Body>
    <div class="hosts">
      <div class="hosts-controls">
        <UI.Button text="Добавить" @click="hostsStore.toggleOpenState()" />

        <UI.Card>
          <HostList :users @on-edit="hostsStore.editUser" />
        </UI.Card>
      </div>
    </div>
  </ContentLayout.Body>
  <UI.Modal v-model="isOpen">
    <UserForm
      :pending
      :schema="hostFormSchema"
      :state="userFormData"
      @on-submit="hostsStore.setUser"
      @on-delete="hostsStore.deleteUser"
    />
  </UI.Modal>
</template>

<style lang="scss" scoped src="./styles.scss" />
