<template>
  <q-page class="row items-center justify-evenly">
    {{ sessionStore.user?.email }}
  </q-page>
</template>

<script setup lang="ts">
import { useSessionStore } from 'src/stores/session.store';

const sessionStore = useSessionStore();
</script>
