<template>
  <BInput
    v-model="date"
    mask="##/##/####"
    outlined
    dense
  >
    <template #append>
      <QIcon class="cursor-pointer" name="eva-calendar-outline">
        <QPopupProxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
          cover
        >
          <QDate
            v-model="date"
            color="primary"
            mask="DD/MM/YYYY"
            minimal
            @update:model-value="onDateInput"
          >
            <div class="row items-center justify-end">
              <QBtn
                flat
                v-close-popup
                round
                dense
                color="primary"
                label="Fermer"
              />
            </div>
          </QDate>
        </QPopupProxy>
      </QIcon>
    </template>
  </BInput>
</template>

<script setup lang="ts">
import { QBtn, QDate, QIcon, QPopupProxy } from 'quasar';
import BInput from 'src/components/core/BInput.vue';
import { formatISODate } from 'src/helpers/date';
import { computed, useTemplateRef } from 'vue';

const dateProxyRef = useTemplateRef<InstanceType<typeof QPopupProxy>>('qDateProxy');
const modelValue = defineModel<string>({
  required: true,
});

const date = computed({
  get() {
    if (!modelValue.value) return '';
    return formatISODate(modelValue.value);
  },
  set(value: string) {
    const [day = 1, month = 1, year = 1970] = value.split('/').map(Number);
    emits('update:modelValue', new Date(year, month - 1, day, 12));
  }
});

function onDateInput() {
  dateProxyRef.value?.hide();
}

const emits = defineEmits<{
  (e: 'update:modelValue', value: Date): void;
}>();
</script>