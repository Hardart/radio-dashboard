<script setup lang="ts">
const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
</script>

<template>
  <div class="calendar-weekdays">
    <div class="first-letter:uppercase" v-for="day in weekdays">{{ day }}</div>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
