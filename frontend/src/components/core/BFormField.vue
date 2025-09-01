<template>
<div class="column">
  <label class="text-weight-medium">{{ label }}</label>
  <slot></slot>
</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps({
  label: String
});
</script>