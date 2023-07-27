<script setup lang="ts">
import * as yup from 'yup';
import { useForm } from 'vee-validate';

definePageMeta({
  title: "Reusable Form",
  desc: "This is Description of Reusable Form",
});

const showPassword = ref(true);
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value;
};

const { handleSubmit } = useForm({
  validationSchema: yup.object(schemaValidationText),
});

const form = reactive({
  name: '',
  password: '',
});

const onSubmit = handleSubmit(values => {
  console.log(values);
});
</script>

<template>
  <div class="px-6 py-4">
    <div>
      <form @submit="onSubmit">
        <div class="grid-12 gap-4">
          <div class="col-span-6">
            <FieldText v-model="form.name" type="text" label="Fullname" name="name" placeholder="e.g Dimas Roger" />
          </div>
          <div class="col-span-12">
            <UButton type="submit" size="lg">
              Submit
            </UButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
