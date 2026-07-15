<script setup lang="ts">
defineProps<{
    modelValue?: string | number;
    class?: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string | number): void;
    (e: "blur"): void;
}>();
</script>

<template>
    <input
        :type="type || 'text'"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
            'w-full min-w-0 rounded-xl border border-gray-250 bg-white px-4 py-2.5 text-sm transition-all outline-none focus:ring-2 focus:ring-[#0B4A3F]/20 focus:border-[#0B4A3F] placeholder:text-gray-400 disabled:pointer-events-none disabled:bg-gray-50 disabled:opacity-50',
            $props.class,
        ]"
        @input="
            emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
        @blur="emit('blur')"
    >
</template>
