<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
    errors?: Array<{ message?: string } | string | undefined> | string;
}>();

const parsedErrors = computed(() => {
    if (!props.errors) return [];
    if (typeof props.errors === "string") return [props.errors];
    return props.errors
        .map((e) => (typeof e === "string" ? e : e?.message))
        .filter(Boolean) as string[];
});
</script>

<template>
    <div
        v-if="parsedErrors.length"
        role="alert"
        class="text-xs text-red-500 font-semibold mt-1.5 space-y-1"
    >
        <div v-if="parsedErrors.length === 1">
            {{ parsedErrors[0] }}
        </div>
        <ul v-else class="list-disc pl-4 space-y-0.5">
            <li v-for="(err, idx) in parsedErrors" :key="idx">
                {{ err }}
            </li>
        </ul>
    </div>
</template>
