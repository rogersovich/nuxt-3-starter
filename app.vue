<script setup lang="ts">
const layout = "default";
</script>

<template>
  <NuxtLayout :name="layout">
    <NuxtLoadingIndicator />
    <NuxtPage />
    <UNotifications />
  </NuxtLayout>
</template>
