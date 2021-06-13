<script setup lang="ts">
import { onMounted } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useHead } from '@vueuse/head'
import { darkTheme } from 'naive-ui'
import { useI18n } from 'vue-i18n'

import { isDark } from '~/logic'

useHead({
  title: 'Potato Timer 🥔',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template' },
  ],
})

const language = useLocalStorage('language', 'en')
const { locale } = useI18n()

onMounted(() => locale.value = language.value)
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : undefined">
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
</style>
