<template>
  <div class="calendar">
    <MCalendarHeader
      :date="currentDate"
      @previous="managePrevious"
      @next="manageNext"
      @today="currentDate = new Date()"
    />

    <component
      :is="calendarViewComponent"
      :options="options"
      :events="modelValue"
      :current-date="currentDate"
      class="calendar-view"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import MCalendarHeader from './MCalendarHeader.vue';
import type { CalendarEvent, CalendarOptions } from './utils/types';
import { CalendarView } from './utils/types';
import MCalendarWeekView from './views/week/MCalendarWeekView.vue';
import { addDays, subDays } from 'date-fns';
import MCalendarWeekTasksView from 'src/components/calendar/views/week-tasks/MCalendarWeekTasksView.vue';

const props = defineProps<{
  options: CalendarOptions
  modelValue: CalendarEvent[]
}>();

const currentDate = ref(new Date());

const calendarViewComponent = computed(() => {
  switch (props.options.view) {
    case CalendarView.WEEK:
      return MCalendarWeekView;
    case CalendarView.WEEK_TASKS:
      return MCalendarWeekTasksView;
    default:
      return MCalendarWeekView;
  }
});

const managePrevious = () => {
  switch (props.options.view) {
    case CalendarView.WEEK:
      console.log('sub 7 days');
      currentDate.value = subDays(currentDate.value, 7);
      console.log(currentDate.value);
      break;
    default:
      currentDate.value = subDays(currentDate.value, 7);
      break;
  }
};
const manageNext = () => {
  switch (props.options.view) {
    case CalendarView.WEEK:
      currentDate.value = addDays(currentDate.value, 7);
      break;
    default:
      currentDate.value = addDays(currentDate.value, 7);
      break;
  }
};
</script>
