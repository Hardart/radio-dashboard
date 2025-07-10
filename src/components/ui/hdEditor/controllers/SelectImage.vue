<script lang="ts" setup>
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdSelectImage from '../../hdSelectImage/hdSelectImage.vue'

const src = defineModel<string>('src', { required: true })
</script>

<template>
  <HdSelectImage v-model="src" name="NEWS">
    <template v-slot="{ toggle }">
      <HdButton
        square
        icon="image-search"
        class="hd-editor__button"
        @click="toggle()"
        v-tooltip="{ label: 'выбрать фото' }"
      />
    </template>
  </HdSelectImage>
</template>
