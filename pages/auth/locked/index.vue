<script setup lang="ts">

definePageMeta({
  title: "Locked Page",
  desc: "This is Description of Locked Page",
  middleware: "auth",
})
</script>
<template>
  <div class="p-6">
    <NuxtLink to="/auth"> Back </NuxtLink>
    <CardSession/>
  </div>
</template>

<style scoped></style>
