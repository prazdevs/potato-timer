<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'
import { FocusTrap } from 'focus-trap-vue'

import potatoShy from '~/assets/potatoShy.png'

const { t } = useI18n()

const show = ref(false)
</script>

<template>
  <NButton
    id="info-button"
    :aria-label="t('options.info')"
    circle
    size="large"
    @click="show = true"
  >
    <template #icon>
      <NIcon>
        <carbon-help />
      </NIcon>
    </template>
  </NButton>
  <NModal :show="show">
    <OnClickOutside @trigger="show = false">
      <FocusTrap
        fallback-focus="#info-button"
        initial-focus="#close-button"
        :value="show"
        @deactivate="show = false"
      >
        <!-- container div needed for focus-trap -->
        <div>
          <NCard class="modal" :segmented="{ content: 'hard' }">
            <template #header>
              <div class="modal-header">
                <img alt="" :src="potatoShy">
                <span>
                  {{ t('info.title') }}
                </span>
              </div>
            </template>
            <template #header-extra>
              <NButton
                id="close-button"
                :aria-label="t('common.close')"
                size="large"
                text
                @click="show = false"
              >
                <template #icon>
                  <NIcon size="25">
                    <carbon-close />
                  </NIcon>
                </template>
              </NButton>
            </template>
            <template #default>
              <NLayout class="modal-body">
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
                <NDivider />
                <div class="content-title">
                  {{ t('info.origin.title') }}
                </div>
                <div class="content-body">
                  {{ t('info.origin.content') }}
                </div>
                <NDivider />
                <div class="content-title">
                  {{ t('info.developer.title') }}
                </div>

                <i18n-t
                  class="content-body"
                  keypath="info.developer.content"
                  tag="div"
                >
                  <template #contact>
                    <NElement
                      href="https://twitter.com/prazdevs"
                      rel="noreferrer noopener"
                      tag="a"
                      target="_blank"
                    >
                      {{ t('info.developer.contact') }}
                    </NElement>
                  </template>
                  <template #contribute>
                    <NElement
                      href="https://github.com/prazdevs/potato-timer"
                      rel="noreferrer noopener"
                      tag="a"
                      target="_blank"
                    >
                      {{ t('info.developer.contribute') }}
                    </NElement>
                  </template>
                  <template #kofi>
                    <NElement
                      href="https://ko-fi.com/prazdevs"
                      rel="noreferrer noopener"
                      tag="a"
                      target="_blank"
                    >
                      {{ t('info.developer.kofi') }}
                    </NElement>
                  </template>
                </i18n-t>
              </NLayout>
            </template>
          </NCard>
        </div>
      </FocusTrap>
    </OnClickOutside>
  </NModal>
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
