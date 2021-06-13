<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <n-layout style="height: 100vh">
    <n-space vertical align="center">
      <div class="header">
        POTATO TIMER
      </div>
      <div>
        <router-view />
      </div>
      <div class="options">
        <span class="options__title">{{ t('options.title') }}</span>
        <n-space class="options__buttons">
          <language-selector />
          <theme-selector />
        </n-space>
      </div>
    </n-space>
  </n-layout>
</template>

<style>
.header {
  font-size: 3rem;
  margin-bottom: 20px;
}

.options {
  margin-top: 25px;
}

.options__title {
  font-size: 1.5rem;
}

.options__buttons {
  margin-top: 5px !important;
  justify-content: center !important;
}
</style>
