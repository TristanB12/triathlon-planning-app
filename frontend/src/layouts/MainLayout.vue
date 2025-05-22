<template>
  <QLayout view="lHh Lpr lFf">
    <HeaderBar
      @open-drawer="leftDrawerOpen = !leftDrawerOpen"
      hide-close-drawer
    />

    <MenuDrawer v-model="leftDrawerOpen" />

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </QLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { QLayout } from 'quasar';
import HeaderBar from 'src/components/layout/HeaderBar.vue';
import MenuDrawer from 'src/components/layout/MenuDrawer.vue';


const leftDrawerOpen = ref(false);

</script>
