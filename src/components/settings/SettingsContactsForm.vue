<script setup lang="ts">
import type {
  Address,
  BaseContactModel,
  Mail,
  Phone,
} from '@/shared/types/contact'
import HdInput from '../ui/hdInput/hdInput.vue'
import HdSelect from '../ui/hdSelect/hdSelect.vue'

defineProps<{
  contact: BaseContactModel
  options: Phone[] | Address[] | Mail[]
  placeholder?: string
  optionAttribute: 'fullAddress' | 'address' | 'number'
}>()
</script>

<template>
  <div class="contacts-group">
    <div class="contacts-group__fields">
      <HdInput
        v-model="contact.label"
        class="contacts-group__item"
        placeholder="Заголовок"
      />
      <HdInput
        v-model="contact.description"
        class="contacts-group__item"
        placeholder="Описание"
      />
      <HdSelect
        v-model="contact.id"
        :options
        :option-attr="optionAttribute"
        class="contacts-group__item contacts-group__item--full"
        key-attr="id"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
