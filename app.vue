<script setup lang="ts">
const layout = "default";
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtLoadingIndicator :duration="7000" />
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>
