<script setup lang="ts">
import { defineEmit, defineProps, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { FocusTrap } from 'focus-trap-vue'
import { OnClickOutside } from '@vueuse/components'

const emit = defineEmit(['click'])
const props = defineProps({
  confirm: {
    type: Boolean,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const { t } = useI18n()

const show = ref(false)

const click = () => {
  if (props.confirm) show.value = !show.value
  else emit('click')
}

const reset = () => {
  emit('click')
  show.value = false
}
</script>

<template>
  <n-popover trigger="manual" :show="show" :style="{ padding: 0 }" width="260">
    <template #trigger>
      <n-button
        id="trigger-button"
        circle
        size="large"
        :aria-label="t('common.reset')"
        :disabled="props.disabled"
        @click="click"
      >
        <template #icon>
          <n-icon>
            <carbon-reset />
          </n-icon>
        </template>
      </n-button>
    </template>
    <on-click-outside @trigger="show = false">
      <focus-trap
        v-model="show"
        initial-focus="#cancel-button"
        fallback-focus="#trigger-button"
        @deactivate="show = false"
      >
        <div class="reset-popover">
          <div
            role="alert"
            class="popover-body"
          >
            {{ t('reset.message') }}
          </div>
          <div class="popover-actions">
            <n-button id="cancel-button" type="default" size="small" @click="show = false">
              {{ t('reset.cancel') }}
            </n-button>
            <n-button type="error" size="small" @click="reset">
              {{ t('reset.confirm') }}
            </n-button>
          </div>
        </div>
      </focus-trap>
    </on-click-outside>
  </n-popover>
</template>

<style scoped lang="scss">
.reset-popover {
  padding: var(--padding);
  display: flex;
  flex-direction: column;

  .popover-body {
    display: flex;
  }

  .popover-actions {
    display: flex;
    align-self: flex-end;
    margin-top: 8px;

    button:not(:last-child) {
      margin-right: 8px;
    }
  }
}
</style>