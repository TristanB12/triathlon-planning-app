<template>
  <QLayout view="lHh Lpr lFf">
    <HeaderBar
      @open-drawer="leftDrawerOpen = !leftDrawerOpen"
      hide-close-drawer
      :title="title"
    />

    <MenuDrawer v-model="leftDrawerOpen" />

    <q-page-container class="bg-grey-1">
      <router-view class="q-pa-md" />
    </q-page-container>
  </QLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { QLayout } from 'quasar';
import HeaderBar from 'src/components/layout/HeaderBar.vue';
import MenuDrawer from 'src/components/layout/MenuDrawer.vue';
import { useRoute } from 'vue-router';
import { menuOptions } from 'src/config/menu';

const route = useRoute();
const leftDrawerOpen = ref(false);

const title = computed(() => {
  const currentOption = menuOptions.find(option => option.to.name === route.name)

  return currentOption?.label;
});

</script>
