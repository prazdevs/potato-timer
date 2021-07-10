<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'
import { FocusTrap } from 'focus-trap-vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import potatoShy from '~/assets/potatoShy.png'

const { t } = useI18n()

const show = ref(false)
</script>

<template>
  <n-button
    id="info-button"
    circle
    size="large"
    :aria-label="t('options.info')"
    @click="show = true"
  >
    <template #icon>
      <n-icon>
        <carbon-help />
      </n-icon>
    </template>
  </n-button>
  <n-modal :show="show">
    <on-click-outside @trigger="show = false">
      <focus-trap
        :value="show"
        initial-focus="#close-button"
        fallback-focus="#info-button"
        @deactivate="show = false"
      >
        <!-- container div needed for focus-trap -->
        <div>
          <n-card class="modal" :segmented="{ content: 'hard' }">
            <template #header>
              <div class="modal-header">
                <img :src="potatoShy" alt="" />
                <span>
                  {{ t('info.title') }}
                </span>
              </div>
            </template>
            <template #header-extra>
              <n-button
                id="close-button"
                :aria-label="t('common.close')"
                size="large"
                text
                @click="show = false"
              >
                <template #icon>
                  <n-icon size="25">
                    <carbon-close />
                  </n-icon>
                </template>
              </n-button>
            </template>
            <template #default>
              <n-layout class="modal-body">
                <div class="content-title">
                  {{ t('info.technique.title') }}
                </div>
                <div class="content-body">
                  <div>{{ t('info.technique.content') }}</div>
                  <ol>
                    <li>{{ t('info.technique.steps[0]') }}</li>
                    <li>{{ t('info.technique.steps[1]') }}</li>
                    <li>{{ t('info.technique.steps[2]') }}</li>
                    <li>{{ t('info.technique.steps[3]') }}</li>
                    <li>{{ t('info.technique.steps[4]') }}</li>
                  </ol>
                </div>
                <n-divider />
                <div class="content-title">
                  {{ t('info.origin.title') }}
                </div>
                <div class="content-body">
                  {{ t('info.origin.content') }}
                </div>
                <n-divider />
                <div class="content-title">
                  {{ t('info.developer.title') }}
                </div>

                <i18n-t
                  class="content-body"
                  keypath="info.developer.content"
                  tag="div"
                >
                  <template #contact>
                    <n-element
                      tag="a"
                      href="https://twitter.com/prazdevs"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {{ t('info.developer.contact') }}
                    </n-element>
                  </template>
                  <template #contribute>
                    <n-element
                      tag="a"
                      href="https://github.com/prazdevs/potato-timer"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {{ t('info.developer.contribute') }}
                    </n-element>
                  </template>
                  <template #kofi>
                    <n-element
                      tag="a"
                      href="https://ko-fi.com/prazdevs"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      {{ t('info.developer.kofi') }}
                    </n-element>
                  </template>
                </i18n-t>
              </n-layout>
            </template>
          </n-card>
        </div>
      </focus-trap>
    </on-click-outside>
  </n-modal>
</template>

<style scoped lang="scss">
.modal {
  max-width: 700px;

  .modal-header {
    display: flex;
    align-items: center;
    font-size: 1.2rem;

    img {
      width: 30px;
      margin-right: 5px;
    }
  }

  .modal-body {
    background-color: var(--color-modal);

    .content-title {
      font-size: 1.1rem;
      margin-bottom: 5px;
    }

    .content-body {
      a {
        color: var(--text-color-base);

        &:hover,
        &:focus {
          color: var(--primary-color-hover);
        }
      }
    }
  }
}
</style>
