<template>
  <div class="row items-center justify-between">
    <h2>{{ dateString }}</h2>

    <div>
      <QBtn
        icon="chevron_left"
        round
        dense
        flat
        @click="() => $emit('previous')"
      />
      <QBtn
        unelevated
        no-caps
        flat
        color="primary"
        label="Today"
        @click="() => $emit('today')"
      />
      <QBtn
        icon="chevron_right"
        round
        dense
        flat
        @click="() => $emit('next')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { QBtn } from 'quasar';
import { computed } from 'vue';

const props = defineProps<{
  date: Date;
}>();

const dateString = computed(() => {
  return props.date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
});

defineEmits<{
  (e: 'previous'): void;
  (e: 'next'): void;
  (e: 'today'): void;
}>();
</script>
