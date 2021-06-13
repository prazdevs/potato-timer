<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePermission } from '@vueuse/core'

import potatoNotif from '~/assets/potatoNotif.png'
import potatoCry from '~/assets/potatoCry.png'

const notificationAccess = usePermission('notifications')
const { t } = useI18n()

const apiUnavailable = computed(() => !window.Notification)

function requestPermission() {
  Notification.requestPermission()
}
</script>

<template>
  <n-alert v-if="apiUnavailable" type="info" :title="t('common.incompatibility')">
    <template #icon>
      <n-icon>
        <img style="width:30px;" :src="potatoCry" />
      </n-icon>
    </template>
    <n-space vertical align="center">
      <div style="max-width: 400px;">
        {{ t('notification.api-unavailable') }}
      </div>
    </n-space>
  </n-alert>
  <n-alert v-else-if="notificationAccess !== 'granted'" type="warning" :title="t('common.warning')">
    <template #icon>
      <n-icon>
        <img style="width:30px;" :src="potatoNotif" />
      </n-icon>
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
