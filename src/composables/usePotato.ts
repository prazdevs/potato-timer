import usePersistentStopwatch from 'use-persistent-stopwatch'
import { computed, ref, watch } from 'vue'

function usePotato() {
  const { elapsed, pause, resume, reset, running }
    = usePersistentStopwatch('potato')

  // TODO change to minutes + configurable ?
  const workTime = ref(25)
  const pauseTime = ref(5)
  const longPause = ref(15)

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
      ? 'ready'
      : currentIndex.value === -1
        ? 'done'
        : currentIndex.value % 2 === 0
          ? 'work'
          : 'pause',

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
    if (running.value) pause()
    else if (currentIndex.value >= 0) resume()
  }

  watch(currentIndex, (v) => {
    if (v < 0) pause()
  })

  return {
    running,
    reset,
    currentStep,
    currentDuration,
    currentRemaining,
    currentPercentage,
    toggle,
  }
}

export default usePotato
