<script setup lang="ts">
import * as yup from "yup"
import { useForm } from "vee-validate"

definePageMeta({
  title: "Auth",
  desc: "This is Description of Auth",
  middleware: "auth",
})

// Handle Login from use auth

// const authStore = useAuthStore();
const authStore = useAuthCookieStore()
const toast = useToast()

const { handleSubmit } = useForm({
  validationSchema: yup.object(schemaValidationlogin),
})

const form = reactive<TLoginScheme>({
  username: "ichsan",
  password: "P@ssw0rd",
})

const onSubmit = handleSubmit(async (values: TLoginScheme) => {
  const { data: responseLogin, error } = await useAsyncData("login", () => login(values))
  if (error.value) {
    return toast.add({
      title: "Error",
      description: error.value.message,
      icon: "i-heroicons-x-mark-20-solid",
      color: "red",
      timeout: 5000,
    })
  }

  const {
    pending,
    error: errorSetCookie,
  } = await useFetch("/api/set-cookie", {
    method: "POST",
    body: {
      token: responseLogin.value.data.token,
      refresh_token: responseLogin.value.data.refresh_token,
    },
    server: false,
  })

  if (!pending.value && !errorSetCookie.value) {
    authStore.setUser({
      name: "Super Admin",
      username: values.username,
    })
    authStore.setToken(responseLogin.value.data)

    toast.add({
      title: "Success",
      description: "Success Login",
      icon: "i-heroicons-check-circle",
      color: "green",
      timeout: 3000,
    })
    navigateTo("/auth/locked")
  }
})
</script>
<template>
  <div class="p-6">
    <div class="grid-12 gap-4">
      <div class="col-span-6">
        <UCard>
          <template #header>
            <b> Login With Credential </b>
          </template>
          <div>
            <form @submit="onSubmit">
              <div class="grid-1 gap-4">
                <div class="col-span-1">
                  <FieldText
                    v-model="form.username"
                    label="Username"
                    name="username"
                  />
                </div>
                <div class="col-span-1">
                  <FieldText
                    v-model="form.password"
                    type="password"
                    label="Password"
                    name="password"
                  />
                </div>
                <div class="col-span-1 text-right">
                  <UButton
                    block
                    type="submit"
                    size="md"
                    variant="soft"
                    :ui="{
                      font: 'font-bold',
                      base: '!text-white',
                    }"
                  >
                    Login Credential
                  </UButton>
                </div>
              </div>
            </form>
          </div>
        </UCard>
      </div>
      <div class="col-span-6">
        <NuxtLink to="/auth/locked" no-prefetch> No Prefetch </NuxtLink>
        <NuxtLink to="/auth/locked" prefetch> Prefetch </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
