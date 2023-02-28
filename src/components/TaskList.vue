<script setup lang="ts">
import useTasks, { type Task } from '~/composables/useTasks'

import potatoLost from '~/assets/potatoLost.png'

const { t } = useI18n()
const tasks = useTasks()

const newTask = ref('')

const taskStyle = (task: Task) => ({
  maxWidth: '190px',
  textDecoration: task.done ? 'line-through' : 'none',
  fontStyle: task.done ? 'italic' : 'normal',
  fontSize: '1rem',
})

function addTask() {
  tasks.value.push({ text: newTask.value, done: false })
  newTask.value = ''
}
</script>

<template>
  <div class="tasks">
    <NCard class="tasks-list" size="small">
      <div v-if="!tasks.length" class="tasks-empty">
        <img alt="" :src="potatoLost">
        <NElement tag="span">
          {{ t('tasks.empty') }}
        </NElement>
      </div>
      <NList v-else :style="{ margin: 0 }">
        <NListItem v-for="(task, idx) in tasks" :key="idx">
          <NCheckbox v-model:checked="task.done">
            <NEllipsis :style="taskStyle(task)">
              {{ task.text }}
            </NEllipsis>
          </NCheckbox>
          <template #suffix>
            <NButton
              :aria-label="t('tasks.delete', { task: task.text })"
              circle
              ghost
              size="small"
              text
              type="error"
              @click="() => tasks.splice(idx, 1)"
            >
              <template #icon>
                <NIcon>
                  <carbon-delete />
                </NIcon>
              </template>
            </NButton>
          </template>
        </NListItem>
      </NList>
      <template #action>
        <div class="tasks-actions">
          <NInputGroup>
            <label :style="{ width: '100%' }">
              <span class="sr-only">{{ t('tasks.add') }}</span>
              <NInput
                id="add-task"
                v-model:value="newTask"
                placeholder
                round
                @keypress.enter="addTask"
              />
            </label>
            <NButton
              :aria-label="t('tasks.add')"
              circle
              :disabled="!newTask"
              @click="addTask"
            >
              <template #icon>
                <NIcon size="large">
                  <carbon-add />
                </NIcon>
              </template>
            </NButton>
          </NInputGroup>
        </div>
      </template>
    </NCard>
  </div>
</template>

<style scoped lang="scss">
.n-list-item__suffix {
  margin-left: 0;
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
        color: var(--text-color-2);
      }
    }
  }
}
</style>
