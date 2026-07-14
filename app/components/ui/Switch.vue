<script setup lang="ts">
defineProps<{
    modelValue?: boolean;
    disabled?: boolean;
    class?: string;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>();
</script>

<template>
    <button
        type="button"
        role="switch"
        :aria-checked="modelValue"
        :disabled="disabled"
        :class="[
            'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none focus:ring-2 focus:ring-[#0B4A3F]/20 disabled:cursor-not-allowed disabled:opacity-50',
            modelValue ? 'bg-[#0B4A3F]' : 'bg-gray-200 dark:bg-gray-850',
            $props.class,
        ]"
        @click="emit('update:modelValue', !modelValue)"
    >
        <span
            :class="[
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
                modelValue ? 'translate-x-5' : 'translate-x-0',
            ]"
        />
    </button>
</template>
