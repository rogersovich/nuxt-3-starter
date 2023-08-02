<script setup lang="ts">
definePageMeta({
  title: "Locked Page",
  desc: "This is Description of Locked Page",
});

// const { data } = useAuth();
// console.log(data.value);

const {data} = await fetchMe();

console.log(data);

// const headers = useRequestHeaders(['cookie']) as HeadersInit
// const { data: token } = await useFetch('/api/token', { headers })
// console.log(token.value)
</script>
<template>
  <div>
    {{ data }}
  </div>
</template>

<style scoped></style>
