<script setup lang="ts">
import Label from "../ui/Label.vue";
import FieldError from "../ui/FieldError.vue";

defineProps<{
    label?: string;
    required?: boolean;
    errors?: Array<{ message?: string } | string | undefined> | string;
    errorMessage?: string;
    class?: string;
}>();
</script>

<template>
    <div :class="['w-full flex flex-col gap-1.5', $props.class]">
        <div v-if="label" class="flex items-center gap-1 text-black">
            <Label>{{ label }}</Label>
            <span v-if="required" class="text-red-500 font-bold">*</span>
        </div>
        <slot />
        <FieldError :errors="errors || errorMessage" />
    </div>
</template>
