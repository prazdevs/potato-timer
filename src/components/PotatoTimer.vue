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
    <PotatoProgress
      :percentage="currentPercentage"
      :remaining="currentRemaining"
      :step="currentStep"
    />
    <div class="controls">
      <NButton
        :aria-label="running ? t('common.pause') : t('common.resume')"
        circle
        :disabled="currentStep === Step.done"
        size="large"
        @click="toggle"
      >
        <template #icon>
          <NIcon>
            <carbon-pause v-if="running" />
            <carbon-play v-else />
          </NIcon>
        </template>
      </NButton>
      <ResetButton
        :confirm="currentStep === Step.work || currentStep === Step.pause"
        :disabled="running || currentStep === Step.ready"
        @click="reset"
      />
      <PotatoSettings
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
