<template>
  <QHeader class="header bg-grey-1 text-primary">
    <QToolbar
      class="row q-pa-sm items-center"
      :class="hideCloseDrawer && !title ? 'justify-end' : 'justify-between'"
    >
      <div class="row">
        <QBtn
          v-if="!hideCloseDrawer"
          flat
          unelevated
          no-caps
          dense
          color="secondary"
          icon="eva-menu-outline"
          @click="emit('open-drawer')"
        />
        <h2
          v-if="title"
          class="q-ma-none q-ml-sm text-weight-bold"
        >
          {{ title }}
        </h2>
      </div>
      <HeaderUserInfoDropdown />
    </QToolbar>   
  </QHeader>
</template>
<script setup lang="ts">
import { QBtn, QHeader, QToolbar } from 'quasar';
import HeaderUserInfoDropdown from './HeaderUserInfoDropdown.vue';

defineProps<{
  hideCloseDrawer?: boolean,
  title?: string | undefined
}>();

const emit = defineEmits(['open-drawer']);

</script>
