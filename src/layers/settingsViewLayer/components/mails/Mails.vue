<script lang="ts" setup>
import { useToggle } from '@vueuse/core'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdFormGroup from '@/components/ui/hdFormGroup/HdFormGroup.vue'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
import HdModal from '@/components/ui/hdModal/HdModal.vue'
import type { Mail } from '@type/contact'
import { coords, initCoords } from '@/components/ui/hdContextMenu/hdContextMenu'
import HdContextMenu from '@/components/ui/hdContextMenu/hdContextMenu.vue'
import HdTable from '@/components/ui/hdTable/hdTable.vue'
import HdCard from '@/components/ui/hdCard/HdCard.vue'

let mailModel: Mail
const isOpen = defineModel({ required: true })

defineProps<{ mail: Mail; emails: Mail[] }>()
defineEmits(['cancel', 'add', 'delete'])
const [isOpenContext, toggleContext] = useToggle()

const onContext = (item: Mail) => {
  initCoords()
  toggleContext(true)
  mailModel = item
}
</script>

<template>
  <HdModal v-model="isOpen">
    <div class="contact-add-form">
      <HdTable
        :data="emails"
        :columns="[{ label: 'Почтовые ящики', key: 'address' }]"
        @on-context="onContext"
      />
      <HdCard title="Добавить контактный E-mail">
        <template #default>
          <HdFormGroup label="Почтовый ящик">
            <HdInput placeholder="eugeniy@larin.ru" v-model="mail.address" />
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
      @on-delete="$emit('delete', mailModel.id, toggleContext)"
    />
  </Teleport>
</template>

<style lang="scss" scoped src="./styles.scss" />
