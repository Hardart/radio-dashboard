<script setup lang="ts">
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdSwitch from '@/components/ui/hdSwitch/hdSwitch.vue'
</script>

<template>
  <div class="test">
    <div>
      <HdButton
        text="Пример кнопки"
        color="primary"
        variant="link"
        icon="dashboard"
      />
      <HdButton text="Пример кнопки" color="primary" variant="soft" />
      <HdButton text="Пример кнопки" color="primary" variant="outline" />
      <HdButton text="Пример кнопки" color="primary" />
    </div>
    <div>
      <HdButton
        text="Пример кнопки"
        color="gray"
        variant="link"
        icon="dashboard"
      />
      <HdButton text="Пример кнопки" color="gray" variant="soft" />
      <HdButton text="Пример кнопки" color="gray" variant="outline" />
      <HdButton text="Пример кнопки" color="gray" />
    </div>
    <div>
      <HdButton
        text="Пример кнопки"
        color="success"
        variant="link"
        icon="dashboard"
      />
      <HdButton text="Пример кнопки" color="success" variant="soft" />
      <HdButton text="Пример кнопки" color="success" variant="outline" />
      <HdButton text="Пример кнопки" color="success" />
    </div>
    <div>
      <HdButton
        text="Пример кнопки"
        color="danger"
        variant="link"
        icon="dashboard"
      />
      <HdButton text="Пример кнопки" color="danger" variant="soft" />
      <HdButton text="Пример кнопки" color="danger" variant="outline" />
      <HdButton text="Пример кнопки" color="danger" />
    </div>
  </div>
</template>

<style lang="scss" scoped src="./style.scss" />
