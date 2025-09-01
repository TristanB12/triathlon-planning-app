<template>
  <div class="row">
    <MCalendarWeekViewDay
      class="col text-center"
      v-for="day in days"
      :key="day.toISOString"
      :day="day"
      :events="getEventsForDay(day)"
      @create-event="manageEventCreation"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { CalendarEvent, CalendarOptions } from '../../utils/types';
import { getWeekRange } from '../../utils/helpers';
import { addDays, isSameDay } from 'date-fns';
import MCalendarWeekViewDay from './MCalendarWeekViewDay.vue';

const props = defineProps<{
  options: CalendarOptions,
  currentDate: Date;
  events: CalendarEvent[];
}>();


const days = computed(() => {
  const { start, end } = getWeekRange(props.currentDate);
  const value: Date[] = [];

  for (let date = start; date <= end; date = addDays(date, 1)) {
    value.push(new Date(date));
  }
  return value;
});

function getEventsForDay(day: Date) {
  return props.events.filter(event => isSameDay(event.start, day));
}

function manageEventCreation(eventData: { start: Date; end: Date }) {
  props.options.callbacks?.onCreateEvent?.(eventData.start, eventData.end);
}
</script>
