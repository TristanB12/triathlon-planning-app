<template>
<div class="activity-duration-badge q-pa-xs rounded-borders-sm">
  {{ durationInMinutes }} min
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  duration: number
}>()

const durationInMinutes = computed(() => Math.round(props.duration / 60))
</script>

<style scoped lang="sass">
.activity-duration-badge
  border: 1px solid $grey-4
  width: fit-content
</style>