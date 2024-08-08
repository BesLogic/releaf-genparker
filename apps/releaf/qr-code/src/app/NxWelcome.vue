<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <h1>
    <span> Hello there, 3 </span> Welcome {{ title }} 👋
  </h1>
</template>

<style scoped></style>
