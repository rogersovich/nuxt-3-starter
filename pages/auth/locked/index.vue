<script setup lang="ts">
definePageMeta({
  title: "Locked Page",
  desc: "This is Description of Locked Page",
  middleware: "auth",
})

const cookie_encrypted = ref(null)

const onEncryptCookie = () => {
  const cookie = EncryptCookie({
    cookie: {
      hehehe: "heelloo",
    },
    secret: 'kucing',
  })
  console.log(cookie)
  cookie_encrypted.value = cookie
}
const onDecryptCookie = () => {
  const cookie = DecryptCookie({
    cookie: cookie_encrypted.value,
    secret: 'kucing-loncat'
  })
  console.log(cookie)
}
</script>
<template>
  <div class="p-6">
    <NuxtLink to="/auth"> Back </NuxtLink>
    <CardSession />
    <br />
    <UButton @click="onEncryptCookie"> Encrypt Cookie </UButton>
    <UButton @click="onDecryptCookie" :disabled="cookie_encrypted == null">
      Decrypt Cookie
    </UButton>
  </div>
</template>

<style scoped></style>
