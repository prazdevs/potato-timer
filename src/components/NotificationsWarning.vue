<script setup lang="ts">
import { usePermission } from '@vueuse/core'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import potatoCry from '~/assets/potatoCry.png'
import potatoNotif from '~/assets/potatoNotif.png'

const notificationAccess = usePermission('notifications')
const { t } = useI18n()

const apiUnavailable = computed(() => !window.Notification)

function requestPermission () {
  Notification.requestPermission()
}
</script>

<template>
  <n-alert
    v-if="apiUnavailable"
    class="alert-panel"
    type="info"
    title
    :show-icon="false"
  >
    <template #header>
      <div class="alert-header">
        <img alt="" :src="potatoCry">
        <span>{{ t('common.incompatibility') }}</span>
      </div>
    </template>
    <n-space vertical align="center">
      <div style="max-width: 400px;">
        {{ t('notification.api-unavailable') }}
      </div>
    </n-space>
  </n-alert>
  <n-alert
    v-else-if="notificationAccess !== 'granted'"
    class="alert-panel"
    type="warning"
    title
    :show-icon="false"
  >
    <template #header>
      <div class="alert-header">
        <img alt="" :src="potatoNotif">
        <span>{{ t('common.warning') }}</span>
      </div>
    </template>
    <n-space vertical align="center">
      <div style="max-width: 400px;">
        {{ t('notification.permission-warning') }}
      </div>
      <n-button type="success" @click="requestPermission">
        {{ t('notification.request-permission') }}
      </n-button>
    </n-space>
  </n-alert>
</template>

<style scoped lang="scss">
.alert-panel {
  width: 95%;

  .alert-header {
    display: flex;
    align-items: center;
    font-size: 1.3rem;

    img {
      width: 30px;
      margin-right: 5px;
    }
  }
}
</style>
