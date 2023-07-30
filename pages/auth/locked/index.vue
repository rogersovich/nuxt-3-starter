<script setup lang="ts">
definePageMeta({
  title: "Locked Page",
  desc: "This is Description of Locked Page",
})

const { getSession, data } = useAuth()

console.log(await getSession())
console.log(data.value)
</script>
<template>
  <div>this is page locked must login first</div>
</template>

<style scoped></style>
