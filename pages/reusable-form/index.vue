<script setup lang="ts">
import * as yup from "yup";
import { useForm } from "vee-validate";

definePageMeta({
  title: "Reusable Form",
  desc: "This is Description of Reusable Form",
  auth: false
});

const showPassword = ref(true);
const toggleShowPassword = () => {
  console.log("test");
  showPassword.value = !showPassword.value;
};

const { handleSubmit } = useForm({
  validationSchema: yup.object(schemaValidationText),
});

const form = reactive({
  name: "",
  password: "",
  desc: "",
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>

<template>
  <div class="px-6 py-4">
    <div>
      <form @submit="onSubmit">
        <div class="grid-12 gap-4">
          <div class="col-span-6">
            <FieldText
              v-model="form.name"
              type="text"
              label="Fullname"
              name="name"
              placeholder="e.g Dimas Roger"
            >
            </FieldText>
          </div>
          <div class="col-span-6">
            <FieldTextArea
              v-model="form.desc"
              label="Fullname"
              name="desc"
              placeholder="e.g Dimas Roger"
            >
            </FieldTextArea>
          </div>
          <div class="col-span-6">
            <FieldText
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              name="password"
              placeholder="e.g *******"
            >
              <template #trailing>
                <UButton
                  color="gray"
                  variant="link"
                  :icon="
                    showPassword ? 'i-heroicons-eye' : 'i-heroicons-eye-slash'
                  "
                  :padded="false"
                  @click="toggleShowPassword()"
                />
              </template>
            </FieldText>
          </div>
          <div class="col-span-12">
            <UButton type="submit" size="lg"> Submit </UButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
