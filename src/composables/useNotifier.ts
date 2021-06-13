import { ComputedRef, watch } from 'vue'
import { usePermission } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

import potatoNote from '~/assets/potatoNote.png'
import potatoParty from '~/assets/potatoParty.png'
import potatoNap from '~/assets/potatoNap.png'

export default function useNotifier(
  step: ComputedRef<'ready' | 'done' | 'work' | 'pause'>,
) {
  const notificationAccess = usePermission('notifications')
  const { t } = useI18n()

  watch(step, (next, prev) => {
    if (
      !window.Notification
      || notificationAccess.value !== 'granted'
      || prev === 'ready'
    )
      return
    switch (next) {
      case 'work':
        return new Notification(t('steps.work'), { icon: potatoNote })
      case 'pause':
        return new Notification(t('steps.pause'), { icon: potatoNap })
      case 'done':
        return new Notification(t('steps.done'), { icon: potatoParty })
    }
  })
}
