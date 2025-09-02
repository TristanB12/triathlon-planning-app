<template>
  <div
    class="row items-center text-grey-7"
    :class="{ 'hoverable': hoverable }"
  >
    <QIcon name="eva-checkmark-circle-outline" />
    <span class="q-ml-xs">Planned</span>
  </div>
</template>

<script setup lang="ts">
import { QIcon } from 'quasar';

defineProps<{
  hoverable?: boolean
}>();

</script>

<style scoped lang="sass">
.hoverable
  &:hover
    transform: scale(1.05)
    transition: transform 0.2s
</style>