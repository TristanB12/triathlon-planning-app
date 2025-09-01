<template>
  <div class="row q-col-gutter-sm q-mb-md">
      <BFormField
        label="Name"
        class="col-12"
      >
        <BInput
          v-model="goal.name"
          outlined
          dense
        />
      </BFormField>
  </div>

  <div class="row q-col-gutter-sm">
    <BFormField
      label="End date"
      class="col-6"
    >
      <BDatePicker
        v-model="goal.end_at"
      />
    </BFormField>
     <BFormField
        label="Distance"
        class="col-6"
      >
      <SelectTriathlonDistance v-model="goal.distance_type" />
    </BFormField>
  </div>
</template>

<script setup lang="ts">
import { TriathlonDistance, type Goal } from 'src/api/types/goal.type';
import BDatePicker from 'src/components/core/BDatePicker.vue';
import BFormField from 'src/components/core/BFormField.vue';
import BInput from 'src/components/core/BInput.vue';
import SelectTriathlonDistance from 'src/components/SelectTriathlonDistance.vue';


const goal = defineModel<Goal>({
  default: () => ({
    name: '',
    distance_type: TriathlonDistance.OLYMPIC,
    end_at: new Date(),
    current: false,
  })
});

</script>