<script setup lang="ts">
import { computed } from "vue";

interface Props {
    title: string;
    value: number | string;
    icon: any;
    color?: "teal" | "blue" | "amber" | "purple" | "pink" | "emerald";
}

const props = withDefaults(defineProps<Props>(), {
    color: "teal",
});

const colorClass = computed(() => {
    switch (props.color) {
        case "blue":
            return "bg-blue-50 text-blue-600";
        case "amber":
            return "bg-amber-50 text-amber-600";
        case "purple":
            return "bg-purple-50 text-purple-600";
        case "pink":
            return "bg-pink-50 text-pink-600";
        case "emerald":
            return "bg-emerald-50 text-emerald-600";
        case "teal":
        default:
            return "bg-teal-50 text-teal-600";
    }
});
</script>

<template>
    <div
        class="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex items-center gap-4 min-w-50 flex-1 sm:flex-initial"
    >
        <div
            :class="[
                'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
                colorClass,
            ]"
        >
            <component :is="icon" class="w-6 h-6" />
        </div>
        <div>
            <p
                class="text-[10px] font-semibold text-gray-400 uppercase tracking-wider"
            >
                {{ title }}
            </p>
            <h3 class="text-2xl font-bold text-gray-800 mt-1">
                {{ value }}
            </h3>
        </div>
    </div>
</template>
