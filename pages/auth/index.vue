<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";

definePageMeta({
  title: "Auth",
  desc: "This is Description of Auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
});

// Handle Login from use auth
const { signIn } = useAuth();

const toast = useToast();
const router = useRouter();

const { handleSubmit } = useForm({
  validationSchema: yup.object(schemaValidationlogin),
});

type TLoginScheme = {
  email: string;
  password: string | number;
};

const form = reactive<TLoginScheme>({
  email: "john@mail.com",
  password: "changeme",
});

const onSubmit = handleSubmit((values: TLoginScheme) => {
  signIn("credentials", {
    email: values.email,
    password: values.password,
    callbackUrl: "/",
    redirect: false,
  }).then((res: any) => {
    if (res?.error == null) {
      navigateTo("/auth/locked");
    } else {
      const err = JSON.parse(res.error)._data;
      toast.add({
        title: err.message,
        description: `Error: ${err.message}, StatusCode: ${err.statusCode}`,
        icon: "i-heroicons-x-mark-20-solid",
        color: "red",
        timeout: 5000,
      });
    }
  });
});
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
