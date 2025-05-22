<template>
  <QHeader class="header bg-white text-primary">
    <QToolbar
      class="row q-pa-sm items-center"
      :class="hideCloseDrawer ? 'justify-end' : 'justify-between'"
    >
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
      <HeaderUserInfoDropdown />
    </QToolbar>   
  </QHeader>
</template>
<script setup lang="ts">
import { QBtn, QHeader, QToolbar } from 'quasar';
import HeaderUserInfoDropdown from './HeaderUserInfoDropdown.vue';

defineProps({
  hideCloseDrawer: Boolean,
});

const emit = defineEmits(['open-drawer']);

</script>

<style lang="sass" scoped>
.header
  border-bottom: 1px solid $grey-3

</style>