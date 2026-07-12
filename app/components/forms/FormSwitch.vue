<script setup lang="ts">
import { inject } from "vue";
import FormBase from "./FormBase.vue";
import Switch from "../ui/Switch.vue";

const props = defineProps<{
  name: string;
  label?: string;
  required?: boolean;
  class?: string;
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
      <div class="flex items-center">
        <Switch
          :disabled="disabled"
          :modelValue="field.state.value"
          @update:modelValue="field.handleChange"
        />
      </div>
    </FormBase>
  </component>
</template>
