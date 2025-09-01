<template>
  <div class="register-form">
    <h5 class="q-my-sm">Create a new account</h5>
    <p>Register to access your admin dashboard!</p>

    <QForm
      class="column q-gutter-y-md"
      @submit="submit"
    >
      <div class="row q-col-gutter-x-sm">
        <BInput
          v-model="form.first_name"
          placeholder="First name"
          :rules="[
            (v: string) => isRequired(v) || 'First name is required',
          ]"
        />
        <BInput
          v-model="form.last_name"
          placeholder="Last name"
          :rules="[
            (v: string) => isRequired(v) || 'Last name is required',
          ]"
        />
      </div>
      <BInput
        v-model="form.email"
        placeholder="Email"
        type="email"
        icon-left="eva-email-outline"
        :rules="[
          (v: string) => isRequired(v) || 'Email is required',
          (v: string) => isEmail(v) || 'Invalid email'
        ]"
      />
      <BInput
        v-model="form.password"
        placeholder="Password"
        icon-left="eva-lock-outline"
        :icon-right="isPasswordVisible ? 'eva-eye-outline' : 'eva-eye-off-outline'"
        :type="isPasswordVisible ? 'text' : 'password'"
        icon-right-clickable
        @icon-right-click="isPasswordVisible = !isPasswordVisible"
        :rules="[(v: string) => isRequired(v) || 'Password is required']"
      />
      <BButtonPrimary
        type="submit"
        label="Create my account"
        rounded
        :loading="loading"
      />
    </QForm>
    <p class="text-center q-mt-lg">
      Already have an account?
      <router-link :to="{ name: 'Login' }" class="text-primary">Log in.</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { QForm, useQuasar } from 'quasar';
import BButtonPrimary from 'src/components/core/BButtonPrimary.vue';
import BInput from 'src/components/core/BInput.vue';
import { reactive, ref } from 'vue';
import { isEmail, isRequired } from 'src/helpers/validation';
import type  { RegisterBody } from 'src/api/types/auth.type';
import { useRouter } from 'vue-router';
import { useSessionStore } from 'src/stores/session.store';

const sessionStore = useSessionStore();
const $q = useQuasar();
const router = useRouter();

const form: RegisterBody = reactive({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
});

const isPasswordVisible = ref(false);
const loading = ref(false);

const submit = async () => {
  loading.value = true;

  try {
    await sessionStore.register(form);
    void router.push('/');
  } catch {
    form.password = '';
    form.email = '';
    $q.notify({
      message: 'Email already taken',
      color: 'negative',
    });
  }

  loading.value = false;
};
</script>

<style lang="sass" scoped>
.register-form
  min-width: 350px

a
  text-decoration: none
</style>