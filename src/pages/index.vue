<template>
  <div class="index-container">
    <notifications-warning />
    <potato-timer />
    <task-list />
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
