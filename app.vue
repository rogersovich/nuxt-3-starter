<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
console.log("🚀 ~ file: app.vue:3 ~ runtimeConfig:", runtimeConfig.API_SECRET)


</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
