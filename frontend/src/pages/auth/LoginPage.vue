<template>
  <div class="login-form">
    <h5 class="q-my-sm">Log in to your account</h5>
    <p>Welcome back!</p>

    <QForm
      class="column q-gutter-md"
      @submit="submit"
    >
      <BInput
        v-model="email"
        placeholder="Email"
        type="email"
        icon-left="eva-email-outline"
        :rules="[
          (v: string) => isRequired(v) || 'Email is required',
          (v: string) => isEmail(v) || 'Invalid email'
        ]"
      />
      <BInput
        v-model="password"
        placeholder="Password"
        icon-left="eva-lock-outline"
        :icon-right="isPasswordVisible ? 'eva-eye-outline' : 'eva-eye-off-outline'"
        :type="isPasswordVisible ? 'text' : 'password'"
        icon-right-clickable
        @icon-right-click="isPasswordVisible = !isPasswordVisible"
        :rules="[(v: string) => isRequired(v) || 'Password is required']"
      />
      <div class="row justify-between items-center">
        <QCheckbox
          label="Remember me"
          v-model="rememberMe"
        />
        <a href="#" class="text-primary">Forgot password?</a>
      </div>
      <BButtonPrimary
        type="submit"
        label="Log in"
        rounded
        :loading="loading"
      />
    </QForm>
    <p class="text-center q-mt-lg">
      Don't have an account?
      <router-link :to="{ name: 'Register' }" class="text-primary">Create an account</router-link>
    </p>
  </div>
</template>

<script setup lang="ts">
import { QCheckbox, QForm, useQuasar } from 'quasar';
import BButtonPrimary from 'src/components/core/BButtonPrimary.vue';
import BInput from 'src/components/core/BInput.vue';
import { ref } from 'vue';
import { isEmail, isRequired } from 'src/helpers/validation';
import { useSessionStore } from '../../stores/session.store';
import { useRouter } from 'vue-router';

const sessionStore = useSessionStore();
const $q = useQuasar()
const router = useRouter();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);

const isPasswordVisible = ref(false);
const loading = ref(false);

const submit = async () => {
  loading.value = true;

  try {
    await sessionStore.login({
      email: email.value,
      password: password.value,
    });
    void router.push('/');
  } catch {
    password.value = '';
    $q.notify({
      message: 'Wrong email or password',
      color: 'negative',
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="sass" scoped>
.login-form
  min-width: 350px

a
  text-decoration: none
</style>