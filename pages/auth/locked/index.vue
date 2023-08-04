<script setup lang="ts">
definePageMeta({
  title: "Locked Page",
  desc: "This is Description of Locked Page",
  middleware: "auth",
})

// const { data, error, pending, refresh } = await fetchSession()
const { data, error, pending, refresh } = await fetchSessionServer()

const fetchAgain = () => {
  refresh()
}
</script>
<template>
  <div class="p-6">
    <NuxtLink to="/auth"> Back </NuxtLink>
    <div>this locked page</div>
    <div v-if="pending">Is Loading</div>
    <div v-else-if="error">got erorr</div>
    <div v-else>Login As : {{ data }}</div>
    <br />
    <UButton @click="fetchAgain"> Fetch Again </UButton>
  </div>
</template>

<style scoped></style>
