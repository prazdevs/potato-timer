<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'

const { availableLocales, locale, t } = useI18n()
const language = useLocalStorage('language', 'en')

const label = computed(() =>
  t('options.change-language', { current: language.value.toUpperCase() }),
)

const changeLocale = () => {
  language.value
    = availableLocales[
      (availableLocales.indexOf(language.value) + 1) % availableLocales.length
    ]
  locale.value = language.value
  document.documentElement.setAttribute('lang', language.value)
}
</script>

<template>
  <NButton :aria-label="label" circle size="large" @click="changeLocale">
    <template #icon>
      <NIcon>
        <carbon-translate />
      </NIcon>
    </template>
  </NButton>
</template>
