<template>
  <MCalendar
    :options="options"
    v-model="events"
  />
</template>

<script setup lang="ts">
import MCalendar from 'src/components/calendar/MCalendar.vue';
import type { CalendarEvent, CalendarOptions} from 'src/components/calendar/utils/types';
import { CalendarView } from 'src/components/calendar/utils/types';
import { ref } from 'vue';

const options = ref<CalendarOptions>({
  view: CalendarView.WEEK,
  callbacks: {
    onCreateEvent: (start, end) => {
      events.value.push({
        id: String(events.value.length + 1),
        title: `New Event ${events.value.length + 1}`,
        start,
        end,
      });
    },
  },
})

const events = ref<CalendarEvent[]>([
  {
    id: '1',
    title: 'Event 1',
    start: new Date('2025-05-24T10:00:00'),
    end: new Date('2025-05-24T12:00:00'),
  },
  {
    id: '2',
    title: 'Event 2',
    start: new Date('2025-05-20T14:00:00'),
    end: new Date('2025-05-20T16:00:00'),
  },
]);

</script>

<style lang="sass" scoped>

</style>