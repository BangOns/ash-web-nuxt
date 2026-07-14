<script setup lang="ts">
import { inject } from "vue";
import FormBase from "./FormBase.vue";
import Switch from "../ui/Switch.vue";

import type { Component } from "vue";

defineProps<{
  name: string;
  label?: string;
  required?: boolean;
  class?: string;
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
      <div class="flex items-center">
        <Switch
          :disabled="disabled"
          :model-value="field.state.value"
          @update:model-value="field.handleChange"
        />
      </div>
    </FormBase>
  </component>
  <FormBase
    v-else
    :label="label"
    :required="required"
    :class="$props.class"
  >
    <div class="flex items-center">
      <Switch :disabled="disabled" />
    </div>
  </FormBase>
</template>
