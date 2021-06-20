import { Ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'

export interface Task {
  text: string
  done: boolean
}

export default function useTasks() {
  const tasks: Ref<Task[]> = useLocalStorage('potato-tasks', [])

  return tasks
}
