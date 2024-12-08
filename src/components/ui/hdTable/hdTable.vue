<script lang="ts" setup>
import { computed } from 'vue'
import SortableButton from './components/SortableButton/SortableButton.vue'

const { page = 1, perPage = 20 } = defineProps<{
  columns: any[]
  data: any[]
  link?: {
    basePath: string
    itemKey: string
  }
  page?: number
  perPage?: number
  size?: 's' | 'l'
  pending?: boolean
}>()
defineEmits(['on-context', 'on-item'])

const pageNumber = computed(() => (page === 1 ? 0 : (page - 1) * perPage))
</script>

<template>
  <table
    class="hd-table"
    :class="[size && `hd-table--${size}`, link && 'hd-table--link']"
  >
    <thead>
      <tr>
        <th class="hd-table--width-shrink hd-table--center">N</th>
        <th
          v-for="column in columns"
          :key="column.key"
          :class="column.class && `hd-table--${column.class}`"
        >
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
    <tbody v-if="pending">
      <tr v-for="_ in 20">
        <td class="hd-table--center">
          <span class="hd-table__placeholder"></span>
        </td>
        <td v-for="_ in columns">
          <span class="hd-table__placeholder"></span>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <RouterLink
        v-if="link"
        custom
        :to="`${link.basePath}/${item[link.itemKey]}`"
        v-slot="{ navigate }"
        v-for="(item, i) in data"
        :key="item.id"
      >
        <tr @click="navigate">
          <td class="hd-table--center">{{ (i + 1) * (page || 1) }}</td>
          <td
            v-for="column in columns"
            @contextmenu="$emit('on-context', item)"
          >
            <slot :name="`${column.key}-column`" :item></slot>
          </td>
        </tr>
      </RouterLink>
      <template v-else>
        <tr
          v-for="(item, i) in data"
          :key="item.id"
          @click="$emit('on-item', item)"
          @contextmenu.prevent="$emit('on-context', item)"
        >
          <td class="hd-table--center">{{ i + pageNumber + 1 }}</td>
          <td v-for="column in columns">
            <slot :name="`${column.key}-column`" :item>
              {{ item[column.key] }}
            </slot>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style lang="scss" scoped src="./hdTable.scss" />
