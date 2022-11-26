<script setup lang="ts">
import { isDark, toggleDark } from '~/logic'

const { t } = useI18n()

const label = computed(() =>
  t('options.change-theme', {
    current: isDark.value ? t('theme.dark') : t('theme.light'),
  }),
)
</script>

<template>
  <NButton :aria-label="label" circle size="large" @click="() => toggleDark()">
    <template #icon>
      <NIcon>
        <carbon-moon v-if="isDark" />
        <carbon-sun v-else />
      </NIcon>
    </template>
  </NButton>
</template>
