<template>
  <QLayout>
    <QPageContainer>
      <QPage class="login-page row items-center justify-center">
        <div class="section column items-center justify-center">
          <div>
            <span class="row items-center">
              <QImg src="~assets/logo.svg" width="32px" height="32px" />
              <h1 class="q-ma-none q-pl-md text-weight-medium">Tripl.</h1>
            </span>
  
            <RouterView />
          </div>
        </div>

        <div class="section column bg-primary">
          
        </div>
      </QPage>
    </QPageContainer>
  </QLayout>
</template>

<script lang="ts">
import { QImg, QLayout, QPage, QPageContainer } from 'quasar';
import { RouterView } from 'vue-router';

export default {
  name: 'AuthLayout',
  components: {
    QLayout,
    QPage,
    QPageContainer,
    QImg,
    RouterView,
  },
}
</script>
<style lang="sass" scoped>
.login-page
  height: 100vh

.section
  flex: 1
  height: 100%
</style>