<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { Task } from '~/composables/useTasks'

import potatoLost from '~/assets/potatoLost.png'
import useTasks from '~/composables/useTasks'

const { t } = useI18n()
const tasks = useTasks()

const newTask = ref('')

const taskStyle = (task: Task) => ({
  maxWidth: '190px',
  textDecoration: task.done ? 'line-through' : 'none',
  fontStyle: task.done ? 'italic' : 'normal',
  fontSize: '1rem',
  height: '18px',
})

function addTask () {
  tasks.value.push({ text: newTask.value, done: false })
  newTask.value = ''
}
</script>

<template>
  <div class="tasks">
    <n-card class="tasks-list" size="small">
      <div v-if="!tasks.length" class="tasks-empty">
        <img :src="potatoLost" alt="">
        <n-element tag="span">
          {{ t('tasks.empty') }}
        </n-element>
      </div>
      <n-list v-else :style="{ margin: 0 }">
        <n-list-item v-for="(task, idx) in tasks" :key="idx">
          <n-checkbox v-model:checked="task.done">
            <n-ellipsis :style="taskStyle(task)">
              {{ task.text }}
            </n-ellipsis>
          </n-checkbox>
          <template #suffix>
            <n-button
              :aria-label="t('tasks.delete', { task: task.text })"
              circle
              ghost
              text
              type="error"
              size="small"
              @click="() => tasks.splice(idx, 1)"
            >
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
        <div class="tasks-actions">
          <n-input-group>
            <label :style="{ width: '100%' }">
              <span class="sr-only">{{ t('tasks.add') }}</span>
              <n-input
                id="add-task"
                v-model:value="newTask"
                round
                placeholder
                @keypress.enter="addTask"
              />
            </label>
            <n-button
              circle
              :aria-label="t('tasks.add')"
              @click="addTask"
            >
              <template #icon>
                <n-icon size="large">
                  <carbon-add />
                </n-icon>
              </template>
            </n-button>
          </n-input-group>
        </div>
      </template>
    </n-card>
  </div>
</template>

<style scoped lang="scss">
.n-list-item__suffix {
  margin-left:0;
}
.tasks {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;

  .tasks-list {
    margin-top: 5px;

    .tasks-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      img {
        width: 50px;
        margin-bottom: 5px;
      }

      span {
        color: var(--text-color-3)
      }
    }
  }
}
</style>
