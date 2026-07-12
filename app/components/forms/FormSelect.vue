<script setup lang="ts">
import { inject } from "vue";
import FormBase from "./FormBase.vue";
import Select from "../ui/Select.vue";

const props = defineProps<{
  name: string;
  label?: string;
  required?: boolean;
  class?: string;
  inputClass?: string;
  disabled?: boolean;
}>();

const form = inject<any>("formContext");
</script>

<template>
  <component :is="form.Field" :name="name" v-slot="{ field }">
    <FormBase
      :label="label"
      :required="required"
      :errors="field.state.meta.errors"
      :class="$props.class"
    >
      <Select
        :disabled="disabled"
        :modelValue="field.state.value"
        @update:modelValue="field.handleChange"
        @blur="field.handleBlur"
        :class="inputClass"
      >
        <slot />
      </Select>
    </FormBase>
  </component>
</template>
