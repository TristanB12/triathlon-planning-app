<template>
<div class="row items-center justify-between">
    <h2>{{ formatDate(currentDate, 'MMMM yyyy') }}</h2>

    <div>
      <QBtn
        icon="chevron_left"
        round
        dense
        flat
        @click="managePrevious"
      />
      <QBtn
        unelevated
        no-caps
        flat
        color="primary"
        label="Today"
        @click="manageGoToToday"
      />
      <QBtn
        icon="chevron_right"
        round
        dense
        flat
        @click="manageNext"
      />
    </div>
  </div>
  <div class="row">
    <ActivitiesWeeklyTrackerDay
      class="col"
      v-for="day in days"
      :key="day.date.toString()"
      :day="day.date"
      :activities="day.activities"
    />
  </div>
</template>

<script setup lang="ts">
import { addDays, formatDate, isSameDay, parseISO, startOfDay, subDays } from 'date-fns';
import { QBtn } from 'quasar';
import { ActivitiesClient } from 'src/api/clients/activities.client';
import type { ActivitiesFiltering, Activity } from 'src/api/types/activity.type';
import ActivitiesWeeklyTrackerDay from 'src/components/activities/ActivitiesWeeklyTrackerDay.vue';
import { getWeekRange } from 'src/components/calendar/utils/helpers';
import { computed, onBeforeMount, ref } from 'vue';

const currentDate = ref(new Date());
const activities = ref<Activity[]>([]);
const days = ref<{ date: Date, activities: Activity[] }[]>([]);

const weekRange = computed(() => {
  return getWeekRange(currentDate.value);
});

onBeforeMount(async () => {
  await refreshActivities();
});

async function fetchActivities() {
  const filters: ActivitiesFiltering = {
    planned_after: weekRange.value.start.toISOString(),
    planned_before: weekRange.value.end.toISOString()
  };

  activities.value = await ActivitiesClient.getAll(filters);
}

async function managePrevious() {
  currentDate.value = subDays(currentDate.value, 7);
  await refreshActivities();
};

async function manageNext() {
  currentDate.value = addDays(currentDate.value, 7);
  await refreshActivities();
};

async function manageGoToToday() {
  currentDate.value = new Date();
  await refreshActivities();
}

async function refreshActivities() {
  await fetchActivities();
  computeDays();
}

function computeDays() {
  days.value = [];
  const { start, end } = weekRange.value;

  for (let date = start; date <= end; date = addDays(date, 1)) {
    days.value.push({
      date: new Date(date),
      activities: getActivitiesForDay(date)
    });
  }
}

function getActivitiesForDay(day: Date) {
  const target = startOfDay(day);

  return activities.value.filter(activity =>
    isSameDay(startOfDay(parseISO(activity.planned_on)), target)
  );
}


</script>
