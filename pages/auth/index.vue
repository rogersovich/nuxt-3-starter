<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";

definePageMeta({
  title: "Auth",
  desc: "This is Description of Auth",
  middleware: "auth",
});

// Handle Login from use auth

const authStore = useAuthStore();
const toast = useToast();

const { handleSubmit } = useForm({
  validationSchema: yup.object(schemaValidationlogin),
});

const form = reactive<TLoginScheme>({
  email: "john@mail.com",
  password: "changeme",
});

const onSubmit = handleSubmit(async (values: TLoginScheme) => {
  const { data, error } = await useAsyncData("login", () => login(values));

  if (error.value) {
    return toast.add({
      title: "Error",
      description: error.value.message,
      icon: "i-heroicons-x-mark-20-solid",
      color: "red",
      timeout: 5000,
    });
  }

  authStore.setToken(data.value);
  authStore.setUser({
    name: "Super Admin",
    email: values.email,
  });

  toast.add({
    title: "Success",
    description: "Success Login",
    icon: "i-heroicons-check-circle",
    color: "green",
    timeout: 3000,
  });
  navigateTo("/auth/locked");
});
</script>
<template>
  <div class="p-6">

    {{  authStore.user }}
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
                  <FieldText v-model="form.email" label="Email" name="email" />
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
      <div class="col-span-6"></div>
    </div>
  </div>
</template>

<style scoped></style>
