<template>
  <RouterLink :to="{ name: 'GoalsEdit', params: { goalId: goal.id } }">
    <QCard
      class="rounded-borders-md cursor-pointer"
      flat
    >
      <QImg
        :src="getDistanceConfig(goal.distance_type).illustration"
      >
        <GoalActiveChip
          v-if="goal.current"
          class="absolute all-pointer-events"
          style="top: 8px; right: 8px"
        />
      </QImg>
  
      <QCardSection>
        <div class="text-subtitle1 text-weight-medium q-mb-sm">{{ goal.name }}</div>
        <div>
          <QIcon name="eva-calendar-outline" />
          <span class="q-ml-md">{{ formatISODate(goal.end_at) }}</span>
        </div>
        <div>
          <QIcon name="eva-bar-chart" />
          <QChip
            class="q-ml-md"
            :color="getDistanceConfig(goal.distance_type).color"
          >
            {{ getDistanceConfig(goal.distance_type).label }}
          </QChip>
        </div>
      </QCardSection>
    </QCard>
  </RouterLink>
</template>

<script setup lang="ts">
import { QCard, QCardSection, QChip, QIcon, QImg } from 'quasar';
import type { Goal } from 'src/api/types/goal.type';
import GoalActiveChip from 'src/components/goals/GoalActiveChip.vue';
import { formatISODate } from 'src/helpers/date';
import { distanceTypeConfigs } from 'src/helpers/triathlon-distance';

defineProps<{
  goal: Goal
}>();

function getDistanceConfig(distanceType: string) {
  return distanceTypeConfigs[distanceType as keyof typeof distanceTypeConfigs];
}

</script>