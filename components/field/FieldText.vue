<script setup lang="ts">
import { useField } from "vee-validate";
import type { PropType } from "vue";
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
    default: "Input Field",
    type: String,
  },
  type: {
    default: "text",
    type: String,
  },
  loading: {
    default: false,
    type: Boolean,
  },
  variant: {
    default: "outline",
    type: String as PropType<"outline" | "none">,
  },
  size: {
    default: "md",
    type: String as PropType<"2xs" | "xs" | "sm" | "md" | "lg" | "xl">,
  },
  color: {
    default: "gray",
    type: String as PropType<"white" | "gray">,
  },
  modelValue: {
    default: null,
    type: [String, Number],
  },
});

const { value, errorMessage } = useField<string | number>(
  () => props.name,
  undefined,
  {
    syncVModel: true,
  }
);

const slots = useSlots();
</script>

<template>
  <div>
    <UFormGroup
      :name="name"
      :label="label"
      :error="errorMessage"
      :ui="{
        label: {
          base: 'text-base font-semibold',
        },
      }"
    >
      <UInput
        v-model="value"
        :color="color"
        :loading="loading"
        :placeholder="placeholder"
        :variant="variant"
        :size="size"
        :type="type"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        <template #leading v-if="slots.leading">
          <slot name="leading"></slot>
        </template>
        <template #trailing v-if="slots.trailing">
          <slot name="trailing"></slot>
        </template>
      </UInput>
    </UFormGroup>
  </div>
</template>
