<template>
<div class="activity-distance-badge q-pa-xs rounded-borders-sm">
  {{ distanceString }}
</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  distance: number,
  unit?: 'km' | 'm'
}

const props = withDefaults(defineProps<Props>(), {
  unit: 'km'
})

const distanceInKilometers = computed(() => props.distance / 1000);

const distanceString = computed(() => {
  let convertedDistance = props.unit === 'km' ? distanceInKilometers.value : props.distance;

  convertedDistance = Math.round(convertedDistance);
  return `${convertedDistance} ${props.unit}`;
});
</script>

<style scoped lang="sass">
.activity-distance-badge
  border: 1px solid $grey-4
  width: fit-content
</style>