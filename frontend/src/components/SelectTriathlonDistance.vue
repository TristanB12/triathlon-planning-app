<template>
  <QSelect
    class="b-select"
    v-model="modelValue"
    outlined
    dense
    bg-color="grey-1"
    :options="distanceTypeConfigsArray"
    emit-value
  >
    <template #selected>
      <QChip
        size="sm"
        :color="getDistanceConfig(modelValue).color"
      >
        {{ getDistanceConfig(modelValue).label }}
      </QChip>

    </template>

    <template #option="scope">
      <QItem v-bind="scope.itemProps">
        <QChip
          :color="scope.opt.color"
        >
          {{ scope.opt.label }}
        </QChip>
      </QItem>
    </template>
  </QSelect>
</template>

<script setup lang="ts">
import { QChip, QItem, QSelect } from 'quasar';
import { distanceTypeConfigs, distanceTypeConfigsArray } from 'src/helpers/triathlon-distance';

const modelValue = defineModel<string>({
  required: true,
});

function getDistanceConfig(distanceType: string) {
  return distanceTypeConfigs[distanceType as keyof typeof distanceTypeConfigs];
}

</script>

<style lang="sass">
.b-select .q-field__control:before,
.b-select .q-field__control:after
  border: 1px solid $grey-3 !important

.b-select .q-field__control
  border-radius: $input-rounded-border-radius !important
</style>