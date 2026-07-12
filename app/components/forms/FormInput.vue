<script setup lang="ts">
import { inject } from "vue";
import FormBase from "./FormBase.vue";
import Input from "../ui/Input.vue";

const props = defineProps<{
  name: string;
  label?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
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
      <Input
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :modelValue="field.state.value"
        @update:modelValue="field.handleChange"
        @blur="field.handleBlur"
        :class="inputClass"
      />
    </FormBase>
  </component>
</template>
