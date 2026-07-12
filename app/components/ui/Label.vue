<script setup lang="ts">
defineProps<{
    class?: string;
}>();
</script>

<template>
    <label
        :class="[
            'text-sm font-medium leading-none text-gray-700 dark:text-gray-300 select-none',
            $props.class,
        ]"
    >
        <slot />
    </label>
</template>
