<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { availableLocales, locale, t } = useI18n()
const language = useLocalStorage('language', 'en')

const changeLocale = () => {
  language.value = availableLocales[(availableLocales.indexOf(language.value) + 1) % availableLocales.length]
  locale.value = language.value
}
</script>

<template>
  <n-tooltip :delay="500">
    <template #trigger>
      <n-button circle @click="changeLocale">
        <template #icon>
          <n-icon>
            <carbon-translate />
          </n-icon>
        </template>
      </n-button>
    </template>
    <span>
      {{ t('options.change-language', { current: language.toUpperCase() }) }}
    </span>
  </n-tooltip>
</template>
