<template>
  <QPage>
    <div
      v-if="!goalsStore.hasAnyCurrentGoal"
      class="row items-center justify-evenly"
    >
      <NoCurrentGoalCard class="q-mt-xl" />
    </div>

    <div>
      <ActivitiesWeeklyTracker />
    </div>
  </QPage>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import ActivitiesWeeklyTracker from 'src/components/activities/ActivitiesWeeklyTracker.vue';
import NoCurrentGoalCard from 'src/components/goals/NoCurrentGoalCard.vue';
import { useGoalsStore } from 'src/stores/goals.store';

const goalsStore = useGoalsStore();

</script>
