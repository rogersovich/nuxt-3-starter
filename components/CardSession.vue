<script setup lang="ts">
const { data, error, pending, refresh } = await fetchSession()

const fetchAgain = () => {
  console.log('test')
  refresh()
}
</script>
<template>
  <div>
    <div v-if="pending">Is Loading</div>
    <div v-else-if="error">got erorr</div>
    <div v-else>Login As : {{ data.data.email }}</div>
    <br />
    <UButton @click="fetchAgain"> Fetch Again </UButton>
  </div>
</template>

<style scoped></style>
