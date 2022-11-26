<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="layout">
    <h1 class="header">
      POTATO TIMER
    </h1>
    <div class="view">
      <slot />
    </div>

    <div class="footer">
      <option-controls />
      <i18n-t keypath="footer.credits" tag="div">
        <template #robynn>
          <n-element
            href="https://twitter.com/RFrauhn"
            rel="noreferrer noopener"
            tag="a"
            target="_blank"
          >
            {{ t('footer.robynn') }}
          </n-element>
        </template>
        <template #hels>
          <n-element
            href="https://twitter.com/hels_draws"
            rel="noreferrer noopener"
            tag="a"
            target="_blank"
          >
            {{ t('footer.hels') }}
          </n-element>
        </template>
      </i18n-t>
      <i18n-t keypath="footer.made" tag="div">
        <template #praz>
          <n-element
            href="https://github.com/prazdevs"
            rel="noreferrer noopener"
            tag="a"
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
    margin: 0;
  }

  .view {
    width: 100%;
    max-width: 450px;
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
