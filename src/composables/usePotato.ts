import usePersistentStopwatch from 'use-persistent-stopwatch'
import { type ComputedRef, type Ref } from 'vue'

import usePotatoStorage from '~/composables/usePotatoStorage'

export interface TimeSettings {
  workTime: number
  pauseTime: number
  longPause: number
}

export enum Step {
  ready = 'ready',
  done = 'done',
  work = 'work',
  pause = 'pause',
}

export interface Potato {
  running: ComputedRef<boolean>
  currentStep: ComputedRef<Step>
  currentDuration: ComputedRef<number>
  currentRemaining: ComputedRef<number>
  currentPercentage: ComputedRef<number>
  workTime: Ref<number>
  reset: () => void
  toggle: () => void
  changeTimes: (ts: TimeSettings) => void
}

function usePotato(): Potato {
  const { elapsed, pause, resume, reset, running } = usePersistentStopwatch(
    'potato',
    { interval: 1 },
  )

  const { workTime, pauseTime, longPause } = usePotatoStorage()

  const elapsedSeconds = computed(() => Math.floor(elapsed.value / 1000))

  const timestamps = computed(() =>
    [0, 1, 2, 3]
      .map(val => val * (workTime.value + pauseTime.value) + workTime.value)
      .reduce(
        (acc: number[], cur: number, idx: number) => [
          ...acc,
          cur,
          idx === 3 ? cur + longPause.value : cur + pauseTime.value,
        ],
        [],
      ),
  )

  const durations = computed(() =>
    timestamps.value.map((val: number, idx: number, arr: number[]) =>
      idx ? val - arr[idx - 1] : val,
    ),
  )

  const currentIndex = computed(() =>
    timestamps.value.findIndex((val: number) => {
      return elapsedSeconds.value < val
    }),
  )

  const currentStep = computed(() =>
    elapsed.value === 0
      ? Step.ready
      : currentIndex.value === -1
        ? Step.done
        : currentIndex.value % 2 === 0
          ? Step.work
          : Step.pause,
  )

  const potatoRunning = computed(
    () => running.value && [Step.work, Step.pause].includes(currentStep.value),
  )

  const currentDuration = computed(() =>
    currentIndex.value < 0
      ? durations.value[durations.value.length - 1]
      : durations.value[currentIndex.value],
  )

  const currentRemaining = computed(() =>
    currentIndex.value < 0
      ? 0
      : timestamps.value[currentIndex.value] - elapsedSeconds.value,
  )

  const currentPercentage = computed(
    () => 100 - (currentRemaining.value / currentDuration.value) * 100,
  )

  function toggle() {
    if (running.value)
      pause()
    else if (currentIndex.value >= 0)
      resume()
  }

  function changeTimes(settings: TimeSettings) {
    workTime.value = settings.workTime
    pauseTime.value = settings.pauseTime
    longPause.value = settings.longPause
    reset()
  }

  onMounted(() => {
    if (currentIndex.value < 0)
      pause()
  })

  watch(currentIndex, (v) => {
    if (v < 0)
      pause()
  })

  return {
    running: potatoRunning,
    reset,
    currentStep,
    currentDuration,
    currentRemaining,
    currentPercentage,
    toggle,
    workTime,
    changeTimes,
  }
}

export default usePotato
