<template>
  <div class="q-pb-sm">
    <span
      :class="{ 'badge-pink' : isToday(day) }"
      class="q-pa-xs q-px-sm rounded-borders"
    >
      {{ formatDate(day, 'EEE d') }}
    </span>

    <div class="day col q-pt-sm q-mt-md">
      <ActivitiesWeeklyTrackerActivity
        class="q-ma-xs"
        v-for="activity in props.activities"
        :key="activity.id"
        :activity="activity"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate, isToday } from 'date-fns';
import type { Activity } from 'src/api/types/activity.type';
import ActivitiesWeeklyTrackerActivity from 'src/components/activities/ActivitiesWeeklyTrackerActivity.vue';

const props = defineProps<{
  day: Date,
  activities: Activity[]
}>()

</script>

<style lang="sass" scoped>
.day
  border-top: 1px solid #DCDCDC
.badge-pink
  background-color: #E4CFF8
  border-radius: 0.5em

</style>