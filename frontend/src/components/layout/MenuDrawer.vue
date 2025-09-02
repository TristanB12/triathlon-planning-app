<template>
  <QDrawer
    :model-value="props.modelValue"
    @update:model-value="emit('update:model-value', $event)"
    show-if-above
    bordered
    :width="220"
  >
    <QList>
      <QItem
        class="q-mb-lg"
        header
      >
        <QItemSection>
          <h1 class="q-ma-none text-weight-medium">Tripl.</h1>  
        </QItemSection>
      </QItem>

      <QItemLabel header>MENU</QItemLabel>

      <QItem
        v-for="option in menuOptions"
        :key="option.label"
        clickable
        :to="option.to"
        class="menu-option q-mx-md"
        active-class="active-menu-option text-primary"
      >
        <QItemSection>
          <div class="row items-center justify-start">
            <QIcon
              class="q-pr-sm"
              :name="getIconName(option)"
              size="sm"
              color="grey-7"
            />
            <div class="row items-center justify-between col">
              <QItemLabel class="text-subtitle1 text-grey-7">{{ option.label }}</QItemLabel>
              <!-- <QBadge
                v-if="option.notifications"
                :label="option.notifications"
                color="grey-7"
              /> -->
            </div>
          </div>
        </QItemSection>
      </QItem>
    </QList>
  </QDrawer>
</template>

<script setup lang="ts">
import { QDrawer } from 'quasar';
import { menuOptions, type MenuOptions } from 'src/config/menu';
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(['update:model-value']);

function getIconName(option: MenuOptions): string {
  const isMatchedRoute = route.matched.find(record => record.name === option.to.name);
  return isMatchedRoute ? option.iconSelected : option.icon;
}

</script>

<style lang="sass" scoped>
.menu-option
  border-radius: 8px

.active-menu-option
  background: $main-gradient
  border-left: 4px solid $primary

  *:not(.q-badge)
    color: $primary !important

  .q-badge
    background-color: $primary !important
</style>