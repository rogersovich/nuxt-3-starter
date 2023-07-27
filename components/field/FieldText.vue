<script setup lang="ts">
import { useField } from 'vee-validate';
import type { PropType } from 'vue';
const props = defineProps({
  name: {
    default: null,
    type: String,
  },
  label: {
    default: null,
    type: String,
  },
  placeholder: {
    default: 'Input Field',
    type: String,
  },
  type: {
    default: 'text',
    type: String,
  },
  variant: {
    default: 'outline',
    type: String as PropType<
      | 'outline'
      | 'none'
    >,
  },
  modelValue: {
    default: 'text',
    type: [String, Number],
  },
});

const { value, errorMessage } = useField<string | number>(() => props.name, undefined, {
  syncVModel: true,
});
</script>

<template>
  <div>
    <UFormGroup :name="name" :label="label" :error="errorMessage" :ui="{
      label: {
        base: 'text-base font-semibold'
      }
    }">
      <UInput v-model="value" color="gray" :placeholder="placeholder" :variant="variant" size="xl" />
    </UFormGroup>
  </div>
</template>