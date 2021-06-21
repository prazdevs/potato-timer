<script setup lang="ts">
import { watch, defineProps, ref, computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { FocusTrap } from 'focus-trap-vue'
import { OnClickOutside } from '@vueuse/components'

import {
  POTATO_WORK_TIME,
  POTATO_PAUSE_TIME,
  POTATO_LONG_PAUSE,
} from '~/composables/usePotato'

import potatoDetect from '~/assets/potatoDetect.png'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const { t } = useI18n()

const storedWorkTime = useLocalStorage(POTATO_WORK_TIME, 25 * 60)
const storedPauseTime = useLocalStorage(POTATO_PAUSE_TIME, 5 * 60)
const storedLongPause = useLocalStorage(POTATO_LONG_PAUSE, 15 * 60)

const workTime = ref<number>(storedWorkTime.value)
const pauseTime = ref<number>(storedPauseTime.value)
const longPause = ref<number>(storedLongPause.value)
const active = ref(false)

const show = computed(() => active.value && !props.disabled)

function save() {
  if (workTime.value > 0 && pauseTime.value > 0 && longPause.value > 0) {
    storedWorkTime.value = workTime.value * 60
    storedPauseTime.value = pauseTime.value * 60
    storedLongPause.value = longPause.value * 60
    active.value = false
  }
}

function reset() {
  workTime.value = 25
  pauseTime.value = 5
  longPause.value = 15
}

function validator(v: number) {
  return v > 0
}

watch(show, (show) => {
  if (show) {
    workTime.value = storedWorkTime.value / 60
    pauseTime.value = storedPauseTime.value / 60
    longPause.value = storedLongPause.value / 60
  }
})
</script>

<template>
  <n-button
    id="settings-button"
    circle
    size="large"
    :aria-label="t('settings.title')"
    :disabled="props.disabled"
    :style="{ marginLeft: '12px' }"
    @click="active = true"
  >
    <template #icon circle>
      <n-icon>
        <carbon-settings />
      </n-icon>
    </template>
  </n-button>
  <n-modal :show="show">
    <on-click-outside @trigger="active = false">
      <focus-trap
        :value="show"
        initial-focus="#cancel-button"
        fallback-focus="#settings-button"
        @deactivate="active = false"
      >
        <div>
          <n-card class="modal" size="small" :segmented="{ content: 'hard' }">
            <template #header>
              <div class="modal-header">
                <img :src="potatoDetect" alt="" />
                <span>{{ t('settings.title') }}</span>
              </div>
            </template>
            <template #default>
              <div class="modal-body">
                <label class="modal-input">
                  {{ t('settings.work-time') }}
                  <n-input-number v-model:value="workTime" :step="5" :validator="validator" />
                </label>
                <label class="modal-input">
                  {{ t('settings.pause-time') }}
                  <n-input-number v-model:value="pauseTime" :step="5" :validator="validator" />
                </label>
                <label class="modal-input">
                  {{ t('settings.long-pause') }}
                  <n-input-number v-model:value="longPause" :step="5" :validator="validator" />
                </label>
                <n-button class="modal-reset" @click="reset">
                  {{ t('settings.reset') }}
                </n-button>
              </div>
            </template>
            <template #action>
              <div class="modal-actions">
                <n-button
                  id="cancel-button"
                  type="default"
                  size="small"
                  @click="active = false"
                >
                  {{ t('settings.cancel') }}
                </n-button>
                <n-button type="success" size="small" @click="save">
                  {{ t('settings.save') }}
                </n-button>
              </div>
            </template>
          </n-card>
        </div>
      </focus-trap>
    </on-click-outside>
  </n-modal>
</template>

<style scoped lang="scss">
.modal {
  max-width: 320px;
  font-family: Quicksand, sans-serif;

  .modal-header {
    display: flex;
    align-items: center;
    font-size: 1.3rem;

    img {
      width: 30px;
      margin-right: 5px;
    }
  }

  .modal-body {
    display: flex;
    flex-direction: column;

    .modal-reset {
      margin-top: 5px;
    }

    .modal-input {
      display: inline-block;
      margin-bottom: 10px;
    }
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;

    button:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>
