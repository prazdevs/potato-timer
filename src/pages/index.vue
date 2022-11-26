<template>
  <div class="index-container">
    <NotificationsWarning />
    <PotatoTimer />
    <TaskList />
  </div>
</template>

<style scoped lang="scss">
.index-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > * {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}
</style>
