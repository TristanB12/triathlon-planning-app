<template>
  <div class="bg-white rounded-borders-sm cursor-pointer">
    <div class="activity-header row justify-between items-center q-pa-xs">
      <ActivityCompletedBadge v-if="isCompleted" />
      <ActivityPlannedBadge
        hoverable
        v-else
      />
    </div>

    <div class="q-pa-xs">
      <p class="col q-ma-none ellipsis">
        {{ activity.name }}
        <QTooltip> {{ activity.name }} </QTooltip>
      </p>
      <ActivitySportTypeChip
        class="q-ma-none q-mt-sm"
        :type="activity.sport_type"
      />
      <ActivityDurationBadge
        class="q-mt-sm"
        :duration="activity.estimated_duration"
      />
      <ActivityDistanceBadge
        class="q-my-sm"
        :distance="activity.distance"
        :unit="activity.sport_type === SportType.SWIMMING ? 'm' : 'km'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { QTooltip } from 'quasar';
import { SportType, type Activity } from 'src/api/types/activity.type';
import ActivityCompletedBadge from 'src/components/activities/ActivityCompletedBadge.vue';
import ActivityDistanceBadge from 'src/components/activities/ActivityDistanceBadge.vue';
import ActivityDurationBadge from 'src/components/activities/ActivityDurationBadge.vue';
import ActivityPlannedBadge from 'src/components/activities/ActivityPlannedBadge.vue';
import ActivitySportTypeChip from 'src/components/activities/ActivitySportTypeChip.vue';
import { computed } from 'vue';

const props = defineProps<{
  activity: Activity
}>()

const isCompleted = computed(() => props.activity.start_at)
</script>

<style scoped lang="sass">
.activity-header
  border-bottom: 1px solid $grey-2
</style>
