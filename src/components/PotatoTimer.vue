<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import useNotifier from '~/composables/useNotifier'
import usePotato, { Step } from '~/composables/usePotato'

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
  <div class="potato-timer">
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
        :disabled="currentStep === Step.done"
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
        :disabled="running || currentStep === Step.ready"
        :confirm="(currentStep === Step.work) || (currentStep === Step.pause)"
        @click="reset"
      />
      <potato-settings
        :disabled="currentStep !== Step.ready"
        @change-times="changeTimes"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.controls {
  display: flex;
  justify-content: center !important;
  margin-top: 10px;
}
</style>
