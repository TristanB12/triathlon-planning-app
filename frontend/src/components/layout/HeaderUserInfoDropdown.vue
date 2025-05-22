<template>
  <div class="user-info q-pl-sm row items-center">
    <QBtnDropdown
      flat
      unelevated
      no-caps
      dense
      color="secondary"
      class="q-mr-sm"
      :menu-offset="[0, 10]"
      content-class="shadow-1"
    >
    <template #label>
      <QAvatar size="md" color="primary" text-color="white">
        {{ userInitials }}
      </QAvatar>
      <div class="column q-mx-md items-start text-secondary">
        <span class="text-subtitle2">{{ userName }}</span>
        <span class="text-caption text-grey-6">{{ sessionStore.user?.email }}</span>
      </div>
    </template>

    <template #default>
      <QList>
        <QItem
          v-for="option in listOptions"
          clickable
          @click="option.action()"
          :key="option.label"
        >
          <QItemSection avatar>
            <QIcon
              color="secondary"
              size="xs"
              :name="option.icon"
            />
          </QItemSection>
          <QItemSection>
            <QItemLabel>
              {{ option.label }}
            </QItemLabel>
          </QItemSection>
        </QItem>
      </QList>
    </template>
    </QBtnDropdown>
  </div>
</template>
<script setup lang="ts">
import { QAvatar, QBtnDropdown } from 'quasar';
import { useSessionStore } from 'src/stores/session.store';
import { capitalize, computed } from 'vue';
import { useRouter } from 'vue-router';

const sessionStore = useSessionStore();
const router = useRouter();

type DropdownListOption = {
  icon: string;
  label: string;
  action: () => void;
};

const listOptions: DropdownListOption[] = [
  {
    icon: 'eva-settings-outline',
    label: 'Settings',
    action: () => {},
  },
  {
    icon: 'eva-log-out-outline',
    label: 'Log out',
    action: () => {
      sessionStore.logout();
      void router.push({ name: 'Login' });
    },
  },
];

const userInitials = computed(() => {
  const user = sessionStore.user;
  if (!user) return '';
  const { first_name, last_name } = user;

  return `${first_name[0]}${last_name[0]}`.toUpperCase();
});

const userName = computed(() => {
  const user = sessionStore.user;
  if (!user) return '';
  const { first_name, last_name } = user;

  return `${capitalize(first_name)} ${capitalize(last_name)}`;
});
</script>

<style lang="sass" scoped>
.user-info
  border-left: 1px solid $grey-3
</style>