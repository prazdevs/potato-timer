<script setup lang="ts">
import { computed, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import { format } from 'date-fns'

import { isDark } from '~/logic'

import potatoNote from '~/assets/potatoNote.png'
import potatoNap from '~/assets/potatoNap.png'
import potatoParty from '~/assets/potatoParty.png'
import potatoHappy from '~/assets/potatoHappy.png'

const { t } = useI18n()

const props = defineProps({
  step: { type: String, required: true },
  percentage: { type: Number, required: true },
  remaining: { type: Number, required: true },
})

const potatoImage = computed(() => {
  switch (props.step) {
    case 'work': return potatoNote
    case 'pause': return potatoNap
    case 'done': return potatoParty
    case 'ready': return potatoHappy
    default: return ''
  }
})

const remainingTime = computed(() => format(props.remaining * 1000, 'm:ss'))

</script>

<template>
  <n-space vertical align="center">
    <n-progress
      type="circle"
      style="width: 250px;"
      processing
      :color="isDark ? 'white' : 'black'"
      :percentage="percentage"
    >
      <div>
        <img alt="" style="width: 128px;" :src="potatoImage" />
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
