<template>
  <div class="col">
    <span
      :class="{ 'badge-blue' : isToday(day) }"
      class="q-pa-xs q-px-sm"
    >
      {{ format(day, 'EEE d').toUpperCase() }}
    </span>

    <div
      class="day col relative-position q-mt-md"
      ref="dayRef"
      @mousedown.left="onMouseDown"
      @mouseup.left="onMouseUp"
      @mousemove="onMouseMove"
    >
      <div
        class="time-slot"
        :class="{ 'hour-start' : slot.minutes === 0 }"
        v-for="slot in timeSlots"
        :key="slot.hour"
      />

      <MCalendarWeekViewEvent
        v-for="event in events"
        :key="event.id"
        :event="event"
      />

      <div
        v-if="isDrawing"
        class="ghost-event absolute rounded-borders"
        @mousemove.stop="onMouseMove"
        :style="
          {
            top: `${Math.min(drawStart, drawEnd)}px`,
            height: `${Math.max(drawStart, drawEnd) - Math.min(drawStart, drawEnd)}px`
          }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { format, isToday } from 'date-fns';
import type { CalendarEvent } from '../../utils/types';
import MCalendarWeekViewEvent from './MCalendarWeekViewEvent.vue';
import { ref } from 'vue';
import { snapToNearestQuarterHour } from '../../utils/helpers';

const SLOT_TIME = 15; // minutes
const NUMBER_OF_SLOTS = 24 * (60 / SLOT_TIME); // 24 hours * 15 minutes

interface TimeSlot {
  hour: number;
  minutes: number;
}

const props = defineProps<{
  day: Date;
  events: CalendarEvent[];
}>();

const dayRef = ref<HTMLElement | null>(null);
const isDrawing = ref(false);

const drawStart = ref(0);
const drawEnd = ref(0);

const timeSlots: TimeSlot[] = Array.from({ length: NUMBER_OF_SLOTS }, (_, i) => {
  const hour = Math.floor(i / 4);
  const minutes = (i % 4) * 15;
  return { hour, minutes }
})

function onMouseDown(event: MouseEvent) {
  isDrawing.value = true;

  const rect = dayRef.value?.getBoundingClientRect();
  if (!rect) return;

  const relativeY = event.clientY - rect.top;
  const nearestQuarterHour = snapToNearestQuarterHour(relativeY);

  drawStart.value = nearestQuarterHour;
  drawEnd.value = nearestQuarterHour;
}

function onMouseMove(event: MouseEvent) {
  if (!isDrawing.value || !drawStart.value) return;

  const rect = dayRef.value?.getBoundingClientRect();
  if (!rect) return;

  const relativeY = event.clientY - rect.top;

  drawEnd.value = snapToNearestQuarterHour(relativeY);
}


function onMouseUp() {
  if (!drawStart.value) return;
  if (drawStart.value === drawEnd.value) {
    drawEnd.value += SLOT_TIME * 2;
    drawStart.value -= SLOT_TIME * 2;
  }

  const start = new Date(props.day);
  const end = new Date(props.day);

  start.setHours(Math.floor(Math.min(drawStart.value, drawEnd.value) / 60));
  start.setMinutes(Math.min(drawStart.value, drawEnd.value) % 60);
  
  end.setHours(Math.floor(Math.max(drawStart.value, drawEnd.value) / 60));
  end.setMinutes(Math.max(drawStart.value, drawEnd.value) % 60);
  emits('createEvent', { start, end });

  isDrawing.value = false;
  drawStart.value = 0;
  drawEnd.value = 0;
}

const emits = defineEmits<{
  (e: 'createEvent', payload: { start: Date; end: Date }): void;
  (e: 'updateEvent', event: CalendarEvent): void;
}>();
</script>

<style lang="sass" scoped>
.badge-blue
  background-color: #007bff
  color: white
  border-radius: 0.25em

.day
  border-left: 1px solid #e0e0e0

.time-slot
  height: 15px
  display: flex
  align-items: center
  justify-content: center
  font-size: 0.8em
  color: #666

.hour-start
  border-top: 1px solid #e0e0e0

.ghost-event
  background-color: #999999A0
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3)
  left: 0
  right: 0
</style>