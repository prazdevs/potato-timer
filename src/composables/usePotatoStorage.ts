import { useLocalStorage } from '@vueuse/core'

import type { Ref } from 'vue'

export const STORAGE_WORK_TIME = 'potato-work-time'
export const STORAGE_PAUSE_TIME = 'potato-pause-time'
export const STORAGE_LONG_PAUSE = 'potato-long-pause'
export const DEFAULT_WORK_TIME = 25 * 60
export const DEFAULT_PAUSE_TIME = 5 * 60
export const DEFAULT_LONG_PAUSE = 15 * 60

export interface PotatoStorage {
  workTime: Ref<number>
  pauseTime: Ref<number>
  longPause: Ref<number>
}

function usePotatoStorage(): PotatoStorage {
  const workTime = useLocalStorage(STORAGE_WORK_TIME, DEFAULT_WORK_TIME)
  const pauseTime = useLocalStorage(STORAGE_PAUSE_TIME, DEFAULT_PAUSE_TIME)
  const longPause = useLocalStorage(STORAGE_LONG_PAUSE, DEFAULT_LONG_PAUSE)

  return {
    workTime,
    pauseTime,
    longPause,
  }
}

export default usePotatoStorage
