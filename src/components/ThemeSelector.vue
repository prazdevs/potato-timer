<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { isDark, toggleDark } from '~/logic'

const { t } = useI18n()

const label = computed(() => t(
  'options.change-theme',
  { current: isDark ? t('theme.dark') : t('theme.light') }))
</script>

<template>
  <n-button circle :aria-label="label" @click="toggleDark">
    <template #icon>
      <n-icon>
        <carbon-moon v-if="isDark" />
        <carbon-sun v-else />
      </n-icon>
    </template>
  </n-button>
</template>
