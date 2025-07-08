<script lang="ts" setup>
import * as UI from '@ui'
import * as ContentLayout from '@contentLayout'
import HdBadge from '@/components/ui/hdBadge/hdBadge.vue'
import { useProgramsStore } from '../store/useProgramsStore'

const programsStore = useProgramsStore()
programsStore.fetchPrograms()
</script>

<template>
  <ContentLayout.Root>
    <ContentLayout.Header>
      <div class="dashboard__header--left">
        <h3 class="dashboard__header-title">Программы</h3>
        <HdBadge :label="programsStore.programsCount" type="warning" />
      </div>
      <div
        class="dashboard__header--right"
        v-if="programsStore.isShowTypeFilter"
      >
        <div class="fx fx--aic fx--g16">
          <UI.Radio
            v-model="programsStore.programType"
            label="все"
            value="все"
          />
          <UI.Radio
            v-for="optionItem in programsStore.programTypes"
            v-model="programsStore.programType"
            :label="optionItem"
            :value="optionItem"
          />
        </div>
      </div>
    </ContentLayout.Header>
    <ContentLayout.Body>
      <RouterView />
    </ContentLayout.Body>
  </ContentLayout.Root>
</template>

<style lang="scss" src="./styles.scss" />
