<script lang="ts" setup>
import { useToggle } from '@vueuse/core'
import type { Address } from '@type/contact'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdFormGroup from '@/components/ui/hdFormGroup/HdFormGroup.vue'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
import HdModal from '@/components/ui/hdModal/HdModal.vue'
import HdTable from '@/components/ui/hdTable/hdTable.vue'
import HdContextMenu from '@/components/ui/hdContextMenu/hdContextMenu.vue'
import { coords, initCoords } from '@/components/ui/hdContextMenu/hdContextMenu'
import HdCard from '@/components/ui/hdCard/HdCard.vue'

let addressModel: Address
const isOpen = defineModel({ required: true })
defineProps<{ address: Address; addresses: Address[] }>()
defineEmits(['cancel', 'add', 'delete'])
const [isOpenContext, toggleContext] = useToggle()

const onContext = (item: Address) => {
  initCoords()
  toggleContext(true)
  addressModel = item
}
</script>

<template>
  <HdModal v-model="isOpen">
    <div class="contact-add-form">
      <HdTable
        :data="addresses"
        :columns="[{ label: 'Адреса', key: 'fullAddress' }]"
        @on-context="onContext"
      />
      <HdCard title="Добавить адрес компании">
        <div class="hd-card__group hd-card__group--column">
          <div class="hd-card__group">
            <HdFormGroup label="Область">
              <HdInput placeholder="Пензенская обл." v-model="address.region" />
            </HdFormGroup>
            <HdFormGroup label="Район">
              <HdInput
                placeholder="Бессоновский район"
                v-model="address.district"
              />
            </HdFormGroup>
          </div>
          <div class="hd-card__group">
            <HdFormGroup label="Город">
              <HdInput placeholder="г. Пенза" v-model="address.city" />
            </HdFormGroup>
            <HdFormGroup label="Село/Деревня">
              <HdInput
                placeholder="село Чемодановка"
                v-model="address.locality"
              />
            </HdFormGroup>
          </div>
          <div class="hd-card__group">
            <HdFormGroup label="Улица" class="hd-card__item--full">
              <HdInput
                placeholder="ул. Новотамбовская"
                v-model="address.street"
              />
            </HdFormGroup>
            <HdFormGroup label="Дом">
              <HdInput placeholder="3" v-model="address.houseNumber" size="s" />
            </HdFormGroup>
            <HdFormGroup label="Индекс">
              <HdInput placeholder="440000" v-model="address.zip" size="l" />
            </HdFormGroup>
          </div>
          <div class="hd-card__group">
            <HdFormGroup
              label="Ссылка Яндекс карты"
              class="hd-card__item--full"
            >
              <HdInput v-model="address.yaMapUrl" />
            </HdFormGroup>
          </div>
        </div>
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
      @on-delete="$emit('delete', addressModel.id, toggleContext)"
    />
  </Teleport>
</template>

<style lang="scss" src="./styles.scss" />
