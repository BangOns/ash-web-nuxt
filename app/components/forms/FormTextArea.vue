<script setup lang="ts">
import { inject } from "vue";
import FormBase from "./FormBase.vue";
import Textarea from "../ui/Textarea.vue";

import type { Component } from "vue";

defineProps<{
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  class?: string;
  inputClass?: string;
  disabled?: boolean;
  rows?: number;
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
      <Textarea
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows"
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
    <Textarea
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      :class="inputClass"
    />
  </FormBase>
</template>
