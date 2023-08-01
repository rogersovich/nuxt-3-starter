<script setup lang="ts">
definePageMeta({
  title: "Locked Page",
  desc: "This is Description of Locked Page",
});

const { data } = useAuth();
</script>
<template>
  <div>
    <ClientOnly>
      {{ data }}
    </ClientOnly>
  </div>
</template>

<style scoped></style>
