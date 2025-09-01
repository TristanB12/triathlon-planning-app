<template>
  <router-view />

  <div v-if="currentModal">
    <component
      :is="currentModal.component"
      v-bind="currentModal.options.props"
      v-on="currentModal.options.events"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useSessionStore } from './stores/session.store';
import { storeToRefs } from 'pinia';
import { useModalsStore } from 'src/stores/modals.store';

const sessionStore = useSessionStore();
const modalsStore = useModalsStore();

const { currentModal } = storeToRefs(modalsStore);

onBeforeMount(async() => {
  await sessionStore.load();
});
</script>
