<template>
  <div class="card q-pa-lg rounded-borders text-center">
    <h2>No Current Goal</h2>
    <p>You don't have any current goals. Start by creating one!</p>
    <BButtonPrimary
      :to="{ name: 'Goals' }"
      label="Create Goal"
      icon-right="eva-arrow-ios-forward-outline"
    />
  </div>
</template>

<script setup lang="ts">
import BButtonPrimary from 'src/components/core/BButtonPrimary.vue';


</script>

<style lang="sass">
.card
  background: $main-gradient
</style>