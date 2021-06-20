<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="options">
    <span class="options-title">{{ t('options.title') }}</span>
    <n-space class="options-buttons">
      <language-selector></language-selector>
      <theme-selector></theme-selector>
    </n-space>
  </div>
</template>

<style scoped lang="scss">
.options {
  margin-top: 25px;

  .options-title {
    font-size: 1.5rem;
  }

  .options-buttons {
    margin-top: 5px !important;
    justify-content: center !important;
  }
}
</style>
