<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>
<template>
  <div class="layout">
    <h1 class="header">
      POTATO TIMER
    </h1>
    <div>
      <router-view></router-view>
    </div>
    <div class="options">
      <span class="options-title">{{ t('options.title') }}</span>
      <n-space class="options-buttons">
        <language-selector></language-selector>
        <theme-selector></theme-selector>
      </n-space>
    </div>
    <div class="footer">
      <i18n-t keypath="footer.credits" tag="div">
        <template #robynn>
          <n-element
            tag="a"
            href="https://twitter.com/RFrauhn"
            rel="noreferrer noopener"
            target="_blank"
          >
            {{ t('footer.robynn') }}
          </n-element>
        </template>
        <template #hels>
          <n-element
            tag="a"
            href="https://twitter.com/hels_draws"
            rel="noreferrer noopener"
            target="_blank"
          >
            {{ t('footer.hels') }}
          </n-element>
        </template>
      </i18n-t>
      <i18n-t keypath="footer.made" tag="div">
        <template #praz>
          <n-element
            tag="a"
            href="https://github.com/prazdevs"
            rel="noreferrer noopener"
            target="_blank"
          >
            {{ t('footer.praz') }}
          </n-element>
        </template>
      </i18n-t>
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  .header {
    font-size: 3rem;
    margin-bottom: 20px;
    text-align: center;
    margin-top: 0;
  }

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

  .footer {
    margin-top: auto;
    padding: 20px 0;
    text-align: center;

    a {
      color: var(--text-color-base);

      &:hover,
      &:focus {
        color: var(--primary-color-hover);
      }
    }
  }
}
</style>
