<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { isDark, toggleDark } from '~/logic'

const { t } = useI18n()
</script>

<template>
  <n-tooltip :delay="500">
    <template #trigger>
      <n-button circle @click="toggleDark">
        <template #icon>
          <n-icon>
            <carbon-moon v-if="isDark" />
            <carbon-sun v-else />
          </n-icon>
        </template>
      </n-button>
    </template>
    <span>
      {{ t('options.change-theme', { current: isDark ? t('theme.dark') : t('theme.light') }) }}
    </span>
  </n-tooltip>
</template>
