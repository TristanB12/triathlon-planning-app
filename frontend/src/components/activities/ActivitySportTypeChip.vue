<template>
  <QChip
   :color="sportConfig.color"
  >
    <QIcon
      class="q-mr-xs"
      :name="sportConfig.icon_name"
    />
    {{ sportConfig.label }}
  </QChip>
</template>

<script setup lang="ts">
import { QChip } from 'quasar';
import type { SportType } from 'src/api/types/activity.type';

const sportStyleConfigs = {
  'CYCLING': {
    color: 'green-1',
    icon_name: 'img:icons/person-biking.png',
    label: 'Bike'
  },
  'RUNNING': {
    color: 'yellow-1',
    icon_name: 'img:icons/person-running.png',
    label: 'Run'
  },
  'SWIMMING': {  
    color: 'blue-1',
    icon_name: 'img:icons/person-swimming.png',
    label: 'Swim'
  }
}

const props = defineProps<{
  type: SportType
}>()

const sportConfig = sportStyleConfigs[props.type as keyof typeof sportStyleConfigs];

</script>
