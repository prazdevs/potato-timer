import { useLocalStorage } from '@vueuse/core'
import { type Ref } from 'vue'

export interface Task {
  text: string
  done: boolean
}

export default function useTasks(): Ref<Task[]> {
  const tasks: Ref<Task[]> = useLocalStorage('potato-tasks', [])

  return tasks
}
