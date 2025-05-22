<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useSessionStore } from './stores/session.store';

const sessionStore = useSessionStore()

onBeforeMount(async() => {
  await sessionStore.load();
});
</script>
