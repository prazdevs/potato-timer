<script setup lang="ts">
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
      :percentage="currentPercentage"
      :remaining="currentRemaining"
      :step="currentStep"
    />
    <div class="controls">
      <n-button
        :aria-label="running ? t('common.pause') : t('common.resume')"
        circle
        :disabled="currentStep === Step.done"
        size="large"
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
        :confirm="currentStep === Step.work || currentStep === Step.pause"
        :disabled="running || currentStep === Step.ready"
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
