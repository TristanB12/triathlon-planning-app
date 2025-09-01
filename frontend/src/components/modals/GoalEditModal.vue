<template>
  <QDialog
    v-model="showModal"
    @update:model-value="closeModal"
    position="right"
    full-height
    class="position-relative"
  >
    <QCard style="min-width: 500px;">
      <div class="q-ma-md row justify-between items-center">
        <QIcon
          class="cursor-pointer"
          size="sm"
          name="eva-close-outline"
          @click="closeModal"
        />
        <div>
          <GoalActiveChip
            v-if="goal?.current"
          />
          <QIcon
            class="cursor-pointer"
            size="xs"
            name="eva-more-vertical-outline"
          />
        </div>
      </div>
      <QSeparator />
      <QCardSection>
        <GoalEditForm
          v-if="goal"
          v-model="goal"
        />
      </QCardSection>

      <QCardActions
        class="absolute"
        style="bottom: 8px; right: 8px;"
      >
        <BButtonSecondary
          label="Set As Current Goal"
        />
        <BButtonPrimary
          label="Save"
          @click="submit"
        />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<script setup lang="ts">
import { QCard, QCardActions, QCardSection, QDialog, QIcon, QSeparator, useQuasar } from 'quasar';
import { GoalsClient } from 'src/api/clients/goals.client';
import type { Goal } from 'src/api/types/goal.type';
import BButtonPrimary from 'src/components/core/BButtonPrimary.vue';
import BButtonSecondary from 'src/components/core/BButtonSecondary.vue';
import GoalActiveChip from 'src/components/goals/GoalActiveChip.vue';
import GoalEditForm from 'src/components/goals/GoalEditForm.vue';
import { useGoalsStore } from 'src/stores/goals.store';
import { useModalsStore } from 'src/stores/modals.store';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const modalsStore = useModalsStore();
const goalsStore = useGoalsStore();
const router = useRouter();
const q = useQuasar();

const props = defineProps<{
  goalId: number;
}>();

const showModal = ref(true);
const loading = ref(false);
const goal = ref<Goal | null>(null);

onMounted(async () => {
  await fetchGoal();
});

function closeModal() {
  modalsStore.closeCurrent();
  showModal.value = false;
  void router.push({ name: 'Goals' });
}

async function fetchGoal() {
  try {
    goal.value = await GoalsClient.getOne(props.goalId);
  } catch (error) {
    q.notify({
      type: 'negative',
      message: 'Failed to load goal data.',
      position: 'top',
    });
    void error;
    closeModal();
  }
}

async function submit() {
  if (!goal.value) return;

  loading.value = true;

  try {
    await goalsStore.updateGoal(goal.value);
    q.notify({
      type: 'positive',
      message: 'Goal updated successfully.',
      position: 'top',
    });

    loading.value = false;
    closeModal();
  } catch (error) {
    q.notify({
      type: 'negative',
      message: 'Failed to update goal.',
      position: 'top',
    });
    loading.value = false;
    void error;
  }
}

</script>