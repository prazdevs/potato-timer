<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { availableLocales, locale, t } = useI18n()
const language = useLocalStorage('language', 'en')

const label = computed(() => t(
  'options.change-language',
  { current: language.value.toUpperCase() }))

const changeLocale = () => {
  language.value = availableLocales[
    (availableLocales.indexOf(language.value) + 1) % availableLocales.length
  ]
  locale.value = language.value
  document.documentElement.lang = language.value
}
</script>

<template>
  <n-button
    circle
    :aria-label="label"
    size="large"
    @click="changeLocale"
  >
    <template #icon>
      <n-icon>
        <carbon-translate />
      </n-icon>
    </template>
  </n-button>
</template>
