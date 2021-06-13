<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { availableLocales } = useI18n()

</script>

<template>
  <nav class="text-xl mt-6">
    {{ availableLocales }}
  </nav>
</template>
