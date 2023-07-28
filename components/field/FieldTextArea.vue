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
  disabled: {
    default: false,
    type: Boolean,
  },
  autoresize: {
    default: false,
    type: Boolean,
  },
  resize: {
    default: false,
    type: Boolean,
  },
  rows: {
    default: 2,
    type: Number,
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

const { value, errorMessage } = useField<string>(
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
      <UTextarea
        v-model="value"
        :color="color"
        :placeholder="placeholder"
        :variant="variant"
        :size="size"
        :disabled="disabled"
        :resize="resize"
        :autoresize="autoresize"
        :rows="rows"
        :ui="{ icon: { trailing: { pointer: '' } } }"
      >
        
      </UTextarea>
    </UFormGroup>
  </div>
</template>
