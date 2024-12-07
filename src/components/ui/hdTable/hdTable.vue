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
}>()
defineEmits(['on-context', 'on-item'])

const pageNumber = computed(() => (page === 1 ? 0 : (page - 1) * perPage))
</script>

<template>
  <table class="hd-table hd-table__small">
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
        <tr @click="navigate" class="hd-table__link">
          <td>{{ (i + 1) * (page || 1) }}</td>
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
          <td>{{ i + pageNumber + 1 }}</td>
          <td
            v-for="column in columns"
            :class="column.class && `hd-table__${column.class}`"
          >
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
