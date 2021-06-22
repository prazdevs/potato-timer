<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import usePotato from '~/composables/usePotato'
import useNotifier from '~/composables/useNotifier'

const { t } = useI18n()
const {
  toggle,
  reset,
  currentStep,
  currentRemaining,
  currentPercentage,
  running,
  changeTimes,
} = usePotato()

useNotifier(currentStep)
</script>

<template>
  <potato-progress
    :step="currentStep"
    :percentage="currentPercentage"
    :remaining="currentRemaining"
  />
  <div class="controls">
    <n-button
      circle
      size="large"
      :aria-label="running ? t('common.pause') : t('common.resume')"
      :disabled="currentStep === 'done'"
      @click="toggle"
    >
      <template #icon>
        <n-icon>
          <carbon-pause v-if="running" />
          <carbon-play v-else />
        </n-icon>
      </template>
    </n-button>
    <reset-button
      :disabled="running || currentStep === 'ready'"
      :confirm="(currentStep === 'work') || (currentStep === 'pause')"
      @click="reset"
    />
    <potato-settings :disabled="currentStep !== 'ready'" @change-times="changeTimes" />
  </div>
</template>

<style scoped lang="scss">
.controls {
  display: flex;
  justify-content: center !important;
  margin-top: 10px;
}
</style>
