<script setup lang="ts">
defineProps<{
    modelValue?: string | number;
    class?: string;
    disabled?: boolean;
}>();

const emit = defineEmits<{
    (e: "update:modelValue", value: string | number): void;
    (e: "blur"): void;
}>();
</script>

<template>
    <div class="relative w-full">
        <select
            :value="modelValue"
            :disabled="disabled"
            :class="[
                'w-full appearance-none rounded-xl border border-gray-250 bg-white px-4 py-2.5 pr-10 text-sm transition-all outline-none focus:ring-2 focus:ring-[#0B4A3F]/20 focus:border-[#0B4A3F] disabled:pointer-events-none disabled:bg-gray-50 disabled:opacity-50 dark:bg-gray-900 dark:border-gray-800 dark:focus:ring-teal-500/20 dark:focus:border-teal-500',
                $props.class,
            ]"
            @change="
                emit(
                    'update:modelValue',
                    ($event.target as HTMLSelectElement).value,
                )
            "
            @blur="emit('blur')"
        >
            <slot />
        </select>
        <div
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
        >
            <svg
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </div>
    </div>
</template>
