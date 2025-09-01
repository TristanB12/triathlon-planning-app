<template>
  <QInput
    class="b-input"
    v-bind="props"
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    outlined
    dense
    bg-color="grey-1"
  >
    <template v-if="iconLeft" v-slot:prepend>
      <QIcon :name="iconLeft" />
    </template>

    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
    <template v-else-if="iconRight" v-slot:append>
      <QIcon
        :name="iconRight"
        @click="manageEmitIconRightClick"
        :class="iconRightClickable ? 'cursor-pointer' : ''"
      />
    </template>
  </QInput>
</template>

<script setup lang="ts">
import { QIcon, QInput } from 'quasar';

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  iconLeft: {
    type: String,
    default: undefined,
  },
  iconRight: {
    type: String,
    default: undefined,
  },
  iconRightClickable: {
    type: Boolean,
    default: false,
  },
  props: {
    type: Object,
    default: () => ({}),
  },
});


const manageEmitIconRightClick = () => {
  if (props.iconRightClickable) {
    emit('icon-right-click');
  }
};

const emit = defineEmits(['update:modelValue', 'icon-right-click']);
</script>

<style lang="sass">
.b-input .q-field__control:before,
.b-input .q-field__control:after
  border: 1px solid $grey-3 !important

.b-input .q-field__control
  border-radius: $input-rounded-border-radius !important
</style>