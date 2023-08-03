<script setup lang="ts">
definePageMeta({
  title: "Locked Page",
  desc: "This is Description of Locked Page",
  middleware: "auth",
});


const { data } = await fetchMe();


</script>
<template>
  <div>
    this locked page
    <div>
      NAME: {{ data.name }} {{ data.email }}
    </div>
  </div>
</template>

<style scoped></style>
