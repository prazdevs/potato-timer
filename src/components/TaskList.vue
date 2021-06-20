<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Task } from '~/composables/useTasks'
import useTasks from '~/composables/useTasks'

const { t } = useI18n()
const tasks = useTasks()

const newTask = ref('')

const taskStyle = (task: Task) => ({
  maxWidth: '200px',
  textDecoration: task.done ? 'line-through' : 'none',
  fontStyle: task.done ? 'italic' : 'normal',
})

function addTask() {
  tasks.value.push({ text: newTask.value, done: false })
  newTask.value = ''
}
</script>

<template>
  <div class="tasks">
    <n-card class="tasks-list" size="small" :style="{ width: '320px' }">
      <n-empty v-if="!tasks.length" :description="t('tasks.empty')" />
      <n-list v-else>
        <n-list-item v-for="(task, idx) in tasks" :key="idx">
          <n-checkbox v-model:checked="task.done">
            <n-ellipsis :style="taskStyle(task)">
              {{ task.text }}
            </n-ellipsis>
          </n-checkbox>
          <template #suffix>
            <n-button circle ghost type="error" size="small" @click="() => tasks.splice(idx, 1)">
              <template #icon>
                <n-icon>
                  <carbon-delete />
                </n-icon>
              </template>
            </n-button>
          </template>
        </n-list-item>
      </n-list>
      <template #action>
        <label>
          <span class="sr-only">{{ t('tasks.add') }}</span>
        </label>
        <n-input-group>
          <n-input
            id="add-task"
            v-model:value="newTask"
            round
            placeholder
            @keypress.enter="addTask"
          />
          <n-button circle :aria-label="t('task.delete')" @click="addTask">
            <template #icon>
              <n-icon>
                <carbon-add />
              </n-icon>
            </template>
          </n-button>
        </n-input-group>
      </template>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
.tasks {
  display: flex;
  flex-direction: column;
  align-items: center;

  .tasks-title {
    font-size: 1.5rem;
  }

  .tasks-list {
    margin-top: 5px;

    .task-done {
      text-decoration: line-through;
      font-style: italic;
    }
  }
}
</style>
