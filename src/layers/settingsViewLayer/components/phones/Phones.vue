<script lang="ts" setup>
import { useToggle } from '@vueuse/core'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdFormGroup from '@/components/ui/hdFormGroup/HdFormGroup.vue'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
import HdModal from '@/components/ui/hdModal/HdModal.vue'
import type { Phone } from '@/shared/types/contact'
import { coords, initCoords } from '@/components/ui/hdContextMenu/hdContextMenu'
import HdContextMenu from '@/components/ui/hdContextMenu/hdContextMenu.vue'
import HdTable from '@/components/ui/hdTable/hdTable.vue'
import HdCard from '@/components/ui/hdCard/HdCard.vue'

let phoneModel: Phone
const isOpen = defineModel({ required: true })

defineProps<{ phone: Phone; phones: Phone[] }>()
defineEmits(['cancel', 'add', 'delete'])
const [isOpenContext, toggleContext] = useToggle()

const onContext = (item: Phone) => {
  initCoords()
  toggleContext(true)
  phoneModel = item
}
</script>

<template>
  <HdModal v-model="isOpen">
    <div class="contact-add-form">
      <HdTable
        :data="phones"
        :columns="[{ label: 'Номера телефонов', key: 'number' }]"
        @on-context="onContext"
      />
      <HdCard title="Добавить контактный телефон">
        <template #default>
          <HdFormGroup label="Номер телефона">
            <HdInput placeholder="+7 (999) 999 99 99" v-model="phone.number" />
          </HdFormGroup>
        </template>
        <template #footer>
          <HdButton text="Закрыть" @click="$emit('cancel')" color="primary" />
          <HdButton text="Добавить" @click="$emit('add')" color="success" />
        </template>
      </HdCard>
    </div>
  </HdModal>
  <Teleport to=".dashboard__content" defer>
    <HdContextMenu
      v-model="isOpenContext"
      :coords
      @on-delete="$emit('delete', phoneModel.id, toggleContext)"
    />
  </Teleport>
</template>

<style lang="scss" scoped src="./styles.scss" />
