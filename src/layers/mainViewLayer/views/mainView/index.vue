<script setup lang="ts">
import SettingsContactsForm from '@/components/settings/SettingsContactsForm.vue'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdFormGroup from '@/components/ui/hdFormGroup/HdFormGroup.vue'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
import HdModal from '@/components/ui/hdModal/HdModal.vue'
import Addresses from '@/layers/settingsViewLayer/components/addresses/Addresses.vue'
import Mails from '@/layers/settingsViewLayer/components/mails/Mails.vue'
import DashboardContentFooterLayout from '@/layouts/dashboardContentFooterLayout.vue'
import DashboardContentHeaderLayout from '@/layouts/dashboardContentHeaderLayout.vue'
import DashboardContentLayout from '@/layouts/dashboardContentLayout.vue'
</script>

<template>
  <DashboardContentLayout>
    <DashboardContentHeaderLayout>
      <div class="dashboard__header--left">
        <h3 class="dashboard__header-title">Главная</h3>
      </div>
    </DashboardContentHeaderLayout>

    <DashboardContentFooterLayout> </DashboardContentFooterLayout>
  </DashboardContentLayout>
</template>

<style lang="scss" src="./style.scss" />
