<template>
  <QPage>
    <div class="row q-col-gutter-md">
      <GoalCard
        class="col-3"
        v-for="goal in goalsStore.goals"
        :key="goal.id"
        :goal="goal"
      />
    </div>
  </QPage>
</template>

<script setup lang="ts">
import { QPage } from 'quasar';
import GoalCard from 'src/components/goals/GoalCard.vue';
import { useGoalsStore } from 'src/stores/goals.store';
import { useModalsStore } from 'src/stores/modals.store';
import { ModalType } from 'src/stores/models';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const goalsStore = useGoalsStore();
const modalsStore = useModalsStore();

watch(() => route.params.goalId, newGoalId => {
  if (newGoalId) {
    openGoalEditModal(Number(newGoalId));
  }
})

onMounted(() => {
  if (route.params.goalId) {
    openGoalEditModal(Number(route.params.goalId));
  }
});

function openGoalEditModal(goalId: number) {
  modalsStore.open(ModalType.GoalEditModal, {
      props: {
        goalId
      }
    })
}

</script>
