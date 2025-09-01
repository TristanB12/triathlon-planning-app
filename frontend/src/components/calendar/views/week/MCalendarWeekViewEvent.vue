<template>
  <div
    class=" absolute relative text-white rounded-borders"
    :style="{
      ...positionning,
      backgroundColor: bgColor,
    }"
  >
    <div
      class="event-block resize-handle top absolute"
      :style="{
        backgroundColor: 'transparent',
        cursor: 'ns-resize',
        width: '100%',
        height: '5px',
        top: 0,
        left: 0,
      }"
      @mousedown.stop="startResize('start', event)"
    />
    <div
      class="event-block resize-handle top absolute"
      :style="{
        backgroundColor: 'transparent',
        cursor: 'ns-resize',
        width: '100%',
        height: '5px',
        bottom: 0,
        left: 0,
      }"
      @mousedown.stop="startResize('end', event)"
    />

    {{ event.title }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CalendarEvent } from '../../utils/types';

const props = defineProps<{
  event: CalendarEvent
}>();


const positionning = computed(() => {
  const { start, end } = props.event;
  return{
      top: `${start.getHours() * 60 + start.getMinutes()}px`,
      height: `${(end.getTime() - start.getTime()) / 60000}px`,
      left: '0',
      right: '0'
    }
});

const bgColor = computed(() => {
  return props.event.color || '#007bff';
})


function startResize(edge: 'start' | 'end', event: CalendarEvent) {
  emits('resizeStart', { eventId: event.id, edge });
}

const emits = defineEmits<{
  (e: 'resizeStart', payload: { eventId: string; edge: 'start' | 'end' }): void;
}>();
</script>
