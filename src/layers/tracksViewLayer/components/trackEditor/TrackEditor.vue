<script lang="ts" setup>
import { ref } from 'vue'
import { trackAPI } from '@/api/track-api'
import type { ITunesTrack } from '@/shared/types/itunes'
import { trackSchema, type Track } from '@/shared/schemes/track-schema'
import HdForm from '@/components/ui/hdForm/HdForm.vue'
import HdInput from '@/components/ui/hdInput/hdInput.vue'
import HdButton from '@/components/ui/hdButton/hdButton.vue'
import HdFormGroup from '@/components/ui/hdFormGroup/HdFormGroup.vue'
import ITunesTrackList from '../iTunesTrackList/iTunesTrackList.vue'

const { track } = defineProps<{ track: Track }>()
defineEmits(['on-apply', 'on-cancel'])
const iTunesTracks = ref<ITunesTrack[] | null>(null)
const pending = ref(false)

const findInITunes = async () => {
  pending.value = true
  const res = await trackAPI.getITunesMetadata(
    `${track.artistName}-${track.trackTitle}`
  )
  iTunesTracks.value = res
  pending.value = false
}
</script>

<template>
  <div class="track-editor">
    <HdForm
      :state="track"
      :schema="trackSchema"
      class="track-editor__content"
      @on-submit="$emit('on-apply')"
    >
      <div class="track-editor__props">
        <div class="track-editor__media">
          <img
            :src="track.cover"
            v-if="track.cover"
            class="track-editor__image"
          />
          />
        </div>
        <div class="track-editor__info">
          <HdFormGroup name="artistName" label="Артист">
            <HdInput v-model="track.artistName" />
          </HdFormGroup>
          <HdFormGroup name="trackTitle" label="Название трека">
            <HdInput v-model="track.trackTitle" />
          </HdFormGroup>
        </div>
        <div class="track-editor__preview" v-if="track.preview">
          <audio :src="track.preview" controls></audio>
        </div>
      </div>
      <div class="track-editor__controllers">
        <HdButton @click="findInITunes" text="Найти в iTunes" color="primary" />
        <HdButton @click="$emit('on-cancel')" text="Отменить" color="danger" />
        <HdButton type="submit" text="Сохранить" color="success" />
      </div>
      <div class="track-editor__itunes-tracks">
        <ITunesTrackList :track-list="iTunesTracks" :pending />
      </div>
    </HdForm>
  </div>
</template>

<style lang="scss" scoped src="./styles.scss" />
