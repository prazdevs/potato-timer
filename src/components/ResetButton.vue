<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components'
import { FocusTrap } from 'focus-trap-vue'

const props = withDefaults(defineProps<{
  confirm: boolean
  disabled: boolean
}>(), {
  disabled: false,
})

const emit = defineEmits<{
  (event: 'click'): void
}>()

const { t } = useI18n()

const show = ref(false)

const click = () => {
  if (props.confirm)
    show.value = !show.value
  else emit('click')
}

const reset = () => {
  emit('click')
  show.value = false
}
</script>

<template>
  <NPopover :show="show" :style="{ padding: 0 }" trigger="manual" width="260">
    <template #trigger>
      <NButton
        id="trigger-button"
        :aria-label="t('common.reset')"
        circle
        :disabled="props.disabled"
        size="large"
        :style="{ marginLeft: '12px' }"
        @click="click"
      >
        <template #icon>
          <NIcon>
            <carbon-reset />
          </NIcon>
        </template>
      </NButton>
    </template>
    <OnClickOutside @trigger="show = false">
      <FocusTrap
        v-model="show"
        fallback-focus="#trigger-button"
        initial-focus="#cancel-button"
        @deactivate="show = false"
      >
        <div class="reset-popover">
          <div class="popover-body" role="alert">
            {{ t('reset.message') }}
          </div>
          <div class="popover-actions">
            <NButton
              id="cancel-button"
              size="small"
              type="default"
              @click="show = false"
            >
              {{ t('reset.cancel') }}
            </NButton>
            <NButton size="small" type="error" @click="reset">
              {{ t('reset.confirm') }}
            </NButton>
          </div>
        </div>
      </FocusTrap>
    </OnClickOutside>
  </NPopover>
</template>

<style scoped lang="scss">
.reset-popover {
  padding: 8px;
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
