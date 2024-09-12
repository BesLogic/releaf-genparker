<template>
  <h1>
    <span> Hello there, 3 </span> Welcome {{ title }} 👋
  </h1>
  <qrcode-vue :value="value" :level="level" :render-as="renderAs" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QrcodeVue from 'qrcode.vue'
import type { Level, RenderAs } from 'qrcode.vue'

defineProps<{
  title: string;
}>();

const value = 'hey hey heeeeeeeeeeeeey, hey hey heeeeeeeeeeeeey, hey hey heeeeeeeeeeeeey'
const level = ref<Level>('L')
const renderAs = ref<RenderAs>('svg')

</script>

<style scoped></style>
