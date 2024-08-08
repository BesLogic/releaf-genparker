<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <h1>
    <span> Hello there, 2 </span> Welcome {{ title }} 👋
  </h1>
</template>

<style scoped></style>
