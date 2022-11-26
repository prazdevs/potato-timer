<script setup lang="ts">
import { format } from 'date-fns'

import potatoHappy from '~/assets/potatoHappy.png'
import potatoNap from '~/assets/potatoNap.png'
import potatoNote from '~/assets/potatoNote.png'
import potatoParty from '~/assets/potatoParty.png'
import { Step } from '~/composables/usePotato'
import { isDark } from '~/logic'

const props = defineProps<{
  step: string
  percentage: number
  remaining: number
}>()

const { t } = useI18n()

const potatoImage = computed(() => {
  switch (props.step) {
    case Step.work:
      return potatoNote
    case Step.pause:
      return potatoNap
    case Step.done:
      return potatoParty
    case Step.ready:
      return potatoHappy
    default:
      return ''
  }
})

const remainingTime = computed(() => format(props.remaining * 1000, 'm:ss'))
</script>

<template>
  <n-space align="center" vertical>
    <n-progress
      :color="isDark ? 'white' : 'black'"
      :percentage="percentage"
      processing
      style="width: 250px"
      type="circle"
    >
      <div>
        <img alt="" :src="potatoImage" style="width: 128px">
        <div class="remaining-time">
          {{ remainingTime }}
        </div>
      </div>
    </n-progress>
    <div class="step">
      {{ t(`steps.${step}`) }}
    </div>
  </n-space>
</template>

<style scoped>
.remaining-time {
  font-size: 1.8rem;
  text-align: center;
  border-top: 1px solid var(--text-color);
}

.step {
  font-size: 1.8rem;
}
</style>
