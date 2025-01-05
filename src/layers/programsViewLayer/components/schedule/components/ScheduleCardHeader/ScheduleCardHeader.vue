<script setup lang="ts">
import HdFormGroup from '@/components/ui/hdFormGroup/HdFormGroup.vue'
import HdSwitch from '@/components/ui/hdSwitch/HdSwitch.vue'
import ScheduleCardDays from '../ScheduleCardDays/ScheduleCardDays.vue'
import ScheduleCardHelpButtons from '../ScheduleCardHelpButtons/ScheduleCardHelpButtons.vue'
import { useScheduleStore } from '@/layers/programsViewLayer/store/useScheduleStore'
import { storeToRefs } from 'pinia'
const { ids, isTimeEqual } = storeToRefs(useScheduleStore())
</script>

<template>
  <div class="hd-schedule__header">
    <div class="hd-schedule__group">
      <ScheduleCardDays />
      <ScheduleCardHelpButtons v-model="ids" />
    </div>
    <HdFormGroup label="Единое время">
      <HdSwitch v-model="isTimeEqual" />
    </HdFormGroup>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
