<script setup lang="ts">
defineProps<{
    modelValue?: string;
    class?: string;
    placeholder?: string;
    disabled?: boolean;
    rows?: number;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void;
    (e: "blur"): void;
}>();
</script>

<template>
    <textarea
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :rows="rows || 3"
        @input="
            emit(
                'update:modelValue',
                ($event.target as HTMLTextAreaElement).value,
            )
        "
        @blur="emit('blur')"
        :class="[
            'w-full min-w-0 rounded-xl border border-gray-250 bg-white px-4 py-2.5 text-sm transition-all outline-none focus:ring-2 focus:ring-[#0B4A3F]/20 focus:border-[#0B4A3F] placeholder:text-gray-400 disabled:pointer-events-none disabled:bg-gray-50 disabled:opacity-50 dark:bg-gray-900 dark:border-gray-800 dark:focus:ring-teal-500/20 dark:focus:border-teal-500',
            $props.class,
        ]"
    />
</template>
