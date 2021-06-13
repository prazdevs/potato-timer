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
} = usePotato()

useNotifier(currentStep)
</script>

<template>
  <n-space vertical size="large" align="center">
    <notifications-warning />
    <potato-progress
      :step="currentStep"
      :percentage="currentPercentage"
      :remaining="currentRemaining"
    />
    <n-space>
      <n-button circle size="large" :disabled="currentStep === 'done'" @click="toggle">
        <template #icon>
          <n-icon :alt="running ? t('common.pause') : t('common.resume')">
            <carbon-pause v-if="running" />
            <carbon-play v-else />
          </n-icon>
        </template>
      </n-button>
      <n-button circle size="large" :disabled="running" @click="reset">
        <template #icon>
          <n-icon>
            <carbon-reset />
          </n-icon>
        </template>
      </n-button>
    </n-space>
  </n-space>
</template>
