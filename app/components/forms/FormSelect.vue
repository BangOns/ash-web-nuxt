<script setup lang="ts">
import { inject } from "vue";
import FormBase from "./FormBase.vue";
import Select from "../ui/Select.vue";

import type { Component } from "vue";

defineProps<{
  name: string;
  label?: string;
  required?: boolean;
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
      <Select
        :disabled="disabled"
        :model-value="field.state.value"
        :class="inputClass"
        @update:model-value="field.handleChange"
        @blur="field.handleBlur"
      >
        <slot />
      </Select>
    </FormBase>
  </component>
  <FormBase
    v-else
    :label="label"
    :required="required"
    :class="$props.class"
  >
    <Select
      :disabled="disabled"
      :class="inputClass"
    >
      <slot />
    </Select>
  </FormBase>
</template>
