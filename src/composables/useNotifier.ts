import { usePermission } from '@vueuse/core'
import { type ComputedRef } from 'vue'

import potatoNap from '~/assets/potatoNap.png'
import potatoNote from '~/assets/potatoNote.png'
import potatoParty from '~/assets/potatoParty.png'
import { Step } from '~/composables/usePotato'

export default function useNotifier(step: ComputedRef<Step>): void {
  const notificationAccess = usePermission('notifications')
  const { t } = useI18n()

  watch(step, (next, prev) => {
    if (
      !window.Notification
      || notificationAccess.value !== 'granted'
      || prev === Step.ready
    )
      return
    switch (next) {
      case Step.work:
        return new Notification(t('steps.work'), { icon: potatoNote })
      case Step.pause:
        return new Notification(t('steps.pause'), { icon: potatoNap })
      case Step.done:
        return new Notification(t('steps.done'), { icon: potatoParty })
    }
  })
}
