<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'
import { FocusTrap } from 'focus-trap-vue'
import { watch, ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

import potatoDetect from '~/assets/potatoDetect.png'
import usePotatoStorage, {
  DEFAULT_WORK_TIME,
  DEFAULT_PAUSE_TIME,
  DEFAULT_LONG_PAUSE,
} from '~/composables/usePotatoStorage'

interface Props {
  disabled: boolean
}
const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const emit = defineEmits<{
  (
    event: 'change-times',
    payload: { workTime: number; pauseTime: number; longPause: number }
  ): void
}>()

const { t } = useI18n()

const {
  workTime: storedWorkTime,
  pauseTime: storedPauseTime,
  longPause: storedLongPause,
} = usePotatoStorage()

const workTime = ref<number>(storedWorkTime.value / 60)
const pauseTime = ref<number>(storedPauseTime.value / 60)
const longPause = ref<number>(storedLongPause.value / 60)
const active = ref(false)

const show = computed(() => active.value && !props.disabled)

function save() {
  if (workTime.value > 0 && pauseTime.value > 0 && longPause.value > 0) {
    emit('change-times', {
      workTime: workTime.value * 60,
      pauseTime: pauseTime.value * 60,
      longPause: longPause.value * 60,
    })

    active.value = false
  }
}

function reset() {
  workTime.value = DEFAULT_WORK_TIME / 60
  pauseTime.value = DEFAULT_PAUSE_TIME / 60
  longPause.value = DEFAULT_LONG_PAUSE / 60
}

function validator(v: number) {
  return v > 0
}

watch(show, show => {
  if (show) {
    // workTime.value = storedWorkTime.value
    // pauseTime.value = storedPauseTime.value
    // longPause.value = storedLongPause.value
  }
})
</script>

<template>
  <n-button
    id="settings-button"
    :aria-label="t('settings.title')"
    circle
    :disabled="props.disabled"
    size="large"
    :style="{ marginLeft: '12px' }"
    @click="active = true"
  >
    <template #icon>
      <n-icon>
        <carbon-settings />
      </n-icon>
    </template>
  </n-button>
  <n-modal :show="show">
    <on-click-outside @trigger="active = false">
      <focus-trap
        fallback-focus="#settings-button"
        initial-focus="#work-time-input > div > div > div > input"
        :value="show"
        @deactivate="active = false"
      >
        <!-- container div needed for focus-trap -->
        <div>
          <n-card class="modal" :segmented="{ content: 'hard' }" size="small">
            <template #header>
              <div class="modal-header">
                <img alt="" :src="potatoDetect" />
                <span>{{ t('settings.title') }}</span>
              </div>
            </template>
            <template #default>
              <div class="modal-body">
                <label class="modal-input">
                  {{ t('settings.work-time') }}
                  <n-input-number
                    id="work-time-input"
                    v-model:value="workTime"
                    :step="5"
                    :validator="validator"
                  />
                </label>
                <label class="modal-input">
                  {{ t('settings.pause-time') }}
                  <n-input-number
                    v-model:value="pauseTime"
                    :step="5"
                    :validator="validator"
                  />
                </label>
                <label class="modal-input">
                  {{ t('settings.long-pause') }}
                  <n-input-number
                    v-model:value="longPause"
                    :step="5"
                    :validator="validator"
                  />
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
                  size="small"
                  type="default"
                  @click="active = false"
                >
                  {{ t('settings.cancel') }}
                </n-button>
                <n-button size="small" type="success" @click="save">
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
