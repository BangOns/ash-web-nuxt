<script setup lang="ts">
import { inject } from "vue";
import FormBase from "./FormBase.vue";
import Input from "../ui/Input.vue";

import type { Component } from "vue";

defineProps<{
  name: string;
  label?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  class?: string;
  inputClass?: string;
  disabled?: boolean;
}>();

interface FormContext {
  Field: Component;
}

const form = inject<FormContext | null>("formContext", null);
</script>

<template>
  <component :is="form.Field" v-if="form" v-slot="{ field }" :name="name">
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
        :model-value="field.state.value"
        :class="inputClass"
        @update:model-value="field.handleChange"
        @blur="field.handleBlur"
      />
    </FormBase>
  </component>
  <FormBase
    v-else
    :label="label"
    :required="required"
    :class="$props.class"
  >
    <Input
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClass"
    />
  </FormBase>
</template>
