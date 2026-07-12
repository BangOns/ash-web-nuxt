<script setup lang="ts">
import { inject } from "vue";
import FormBase from "./FormBase.vue";
import Textarea from "../ui/Textarea.vue";

const props = defineProps<{
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  class?: string;
  inputClass?: string;
  disabled?: boolean;
  rows?: number;
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
      <Textarea
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows"
        :modelValue="field.state.value"
        @update:modelValue="field.handleChange"
        @blur="field.handleBlur"
        :class="inputClass"
      />
    </FormBase>
  </component>
</template>
