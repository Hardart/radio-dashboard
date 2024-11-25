<script lang="ts" setup>
import SortableButton from './components/SortableButton/SortableButton.vue'

defineProps<{
  columns: any[]
  data: any[]
  link?: {
    basePath: string
    itemKey: string
  }
}>()
</script>

<template>
  <table class="hd-table">
    <thead>
      <tr>
        <th>N</th>
        <th v-for="column in columns" :key="column.key">
          <SortableButton
            v-if="column.sortable"
            :text="column.label ?? column.key"
            :sort-key="column.key"
          />
          <span v-else>
            {{ column.label ?? column.key }}
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <RouterLink
        v-if="link"
        custom
        :to="`${link.basePath}/${item[link.itemKey]}`"
        v-slot="{ navigate }"
        v-for="(item, i) in data"
        :key="item.id"
      >
        <tr @click="navigate">
          <td>{{ i + 1 }}</td>
          <td v-for="column in columns">
            <slot :name="`${column.key}-column`" :item></slot>
          </td>
        </tr>
      </RouterLink>
      <template v-else>
        <tr v-for="(item, i) in data" :key="item.id">
          <td>{{ i + 1 }}</td>
          <td v-for="column in columns">
            <slot :name="`${column.key}-column`" :item></slot>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style lang="scss" scoped src="./hdTable.scss" />
