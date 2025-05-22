<template>
  <QDrawer
    :model-value="props.modelValue"
    @update:model-value="emit('update:model-value', $event)"
    show-if-above
    bordered
  >
    <QList>
      <QItem header>
        <QItemSection avatar>
          <QImg src="~assets/logo.svg" width="32px" height="32px" />
        </QItemSection>
        <QItemSection>
          <h2>Adminify</h2>  
        </QItemSection>
      </QItem>

      
    </QList>
  </QDrawer>
</template>

<script setup lang="ts">
import { QDrawer, QImg } from 'quasar';

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(['update:model-value']);
</script>
