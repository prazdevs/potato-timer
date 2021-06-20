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
      <div>
        {{ t('footer.credits') }}
        <n-element
          tag="a"
          href="https://twitter.com/RFrauhn"
          rel="noreferrer noopener"
          target="_blank"
        >
          Robynn Frauhn
        </n-element>
        &
        <n-element
          tag="a"
          href="https://twitter.com/hels_draws"
          rel="noreferrer noopener"
          target="_blank"
        >
          HelS
        </n-element>
      </div>
      <div>
        {{ t('footer.made') }}
        <n-element
          tag="a"
          href="https://github.com/prazdevs"
          rel="noreferrer noopener"
          target="_blank"
        >
          PraZ
        </n-element>
      </div>
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
