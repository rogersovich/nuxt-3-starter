<script setup lang="ts">
definePageMeta({
  title: "Locked Page",
  desc: "This is Description of Locked Page",
  middleware: "auth",
});

const { data, error, pending } = await fetchSession();

</script>
<template>
  <div>
    <NuxtLink to="/auth"> Back </NuxtLink>
    <div>this locked page</div>
    <div v-if="pending">Is Loading</div>
    <div v-else-if="error">got erorr</div>
    <div v-else>Login As : {{ data.data.full_name }}</div>
  </div>
</template>

<style scoped></style>
