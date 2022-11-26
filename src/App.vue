<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { useHead } from '@vueuse/head'
import { type GlobalThemeOverrides, darkTheme } from 'naive-ui'

import { isDark } from '~/logic'

useHead({
  title: 'Potato Timer 🥔',
  meta: [
    {
      name: 'description',
      content: 'A pomodoro timer, but with potatoes.',
    },
  ],
})

const language = useLocalStorage('language', 'en')
const { locale } = useI18n()

const overrides: GlobalThemeOverrides = {
  common: {
    fontFamily: 'Quicksand',
  },
}

onMounted(() => {
  locale.value = language.value
  document.documentElement.setAttribute('lang', language.value)
})
</script>

<template>
  <n-config-provider
    :theme="isDark ? darkTheme : undefined"
    :theme-overrides="overrides"
  >
    <n-global-style />
    <router-view />
  </n-config-provider>
</template>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap; /* added line */
  border: 0;
}

a:focus-visible {
  outline: var(--primary-color-hover) solid 1px;
}
</style>
