<script setup lang="ts">
definePageMeta({
  title: "Locked Page",
  desc: "This is Description of Locked Page",
  middleware: "auth",
});

// const { data } = useAuth();
// console.log(data.value);

// const {data} = await fetchMe();

// console.log(data);

// const headers = useRequestHeaders(["cookie"]) as HeadersInit;
// const { data } = await useFetch("/api/session", { headers });
// console.log(data);
</script>
<template>
  <div>
    this locked page
  </div>
</template>

<style scoped></style>
