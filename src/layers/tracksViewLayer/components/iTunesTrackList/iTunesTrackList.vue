<script lang="ts" setup>
import type { ITunesTrack } from '@/shared/types/itunes'
import { inject } from 'vue'

defineProps<{
  trackList: ITunesTrack[] | null
  pending?: boolean
}>()
defineEmits(['on-set-from-iTunes'])
const onSetITunesTrack = inject<(track: ITunesTrack) => void>('iTunesTrack')
</script>

<template>
  <div v-if="pending" class="pending">
    <span class="pending__title">Загружаем данные</span>
  </div>
  <ul
    class="itunes-track-list"
    v-else-if="trackList !== null && trackList.length"
  >
    <li
      v-for="track in trackList"
      :key="track.trackId"
      class="itunes-track"
      @click.prevent="onSetITunesTrack!(track)"
    >
      <div class="itunes-track__media">
        <img :src="track.artworkUrl30" class="itunes-track__image" alt="" />
      </div>
      <div class="itunes-track__info">
        <div class="itunes-track__artist">{{ track.artistName }}</div>
        <div class="itunes-track__title">{{ track.trackName }}</div>
        <audio
          v-if="track.previewUrl"
          :src="track.previewUrl"
          controls
          @click.stop
        ></audio>
      </div>
    </li>
  </ul>
  <div v-else-if="trackList !== null && trackList.length == 0" class="pending">
    <span class="pending__title">Не найдено</span>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
