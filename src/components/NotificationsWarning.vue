<script setup lang="ts">
import { usePermission } from '@vueuse/core'

import potatoCry from '~/assets/potatoCry.png'
import potatoNotif from '~/assets/potatoNotif.png'

const notificationAccess = usePermission('notifications')
const { t } = useI18n()

const apiUnavailable = computed(() => !window.Notification)

function requestPermission() {
  Notification.requestPermission()
}
</script>

<template>
  <NAlert
    v-if="apiUnavailable"
    class="alert-panel"
    :show-icon="false"
    title
    type="info"
  >
    <template #header>
      <div class="alert-header">
        <img alt="" :src="potatoCry">
        <span>{{ t('common.incompatibility') }}</span>
      </div>
    </template>
    <NSpace align="center" vertical>
      <div style="max-width: 400px">
        {{ t('notification.api-unavailable') }}
      </div>
    </NSpace>
  </NAlert>
  <NAlert
    v-else-if="notificationAccess !== 'granted'"
    class="alert-panel"
    :show-icon="false"
    title
    type="warning"
  >
    <template #header>
      <div class="alert-header">
        <img alt="" :src="potatoNotif">
        <span>{{ t('common.warning') }}</span>
      </div>
    </template>
    <NSpace align="center" vertical>
      <div style="max-width: 400px">
        {{ t('notification.permission-warning') }}
      </div>
      <n-button type="success" @click="requestPermission">
        {{ t('notification.request-permission') }}
      </n-button>
    </NSpace>
  </NAlert>
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
