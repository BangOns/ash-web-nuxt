<script setup lang="ts">
import { FolderOpen } from "@lucide/vue";

interface Props {
    title?: string;
    description?: string;
}

withDefaults(defineProps<Props>(), {
    title: "Belum Ada Data",
    description:
        "Data yang Anda cari belum ditambahkan atau tidak tersedia saat ini.",
});
</script>

<template>
    <div
        class="flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-3xl bg-white/40 backdrop-blur-md border border-white/60 shadow-xs max-w-lg mx-auto my-6 animate-fade-in"
    >
        <!-- Icon Container with Glowing Ambient Backdrop -->
        <div class="relative mb-6 flex items-center justify-center">
            <!-- Glow effect -->
            <div
                class="absolute inset-0 bg-linear-to-tr from-teal-400/20 to-amber-400/20 rounded-full blur-xl scale-125"
            />

            <!-- Icon Wrapper -->
            <div
                class="relative w-20 h-20 rounded-2xl bg-linear-to-tr from-teal-50 to-emerald-50 border border-teal-100 flex items-center justify-center shadow-inner group"
            >
                <FolderOpen
                    class="w-10 h-10 text-teal-600 group-hover:scale-110 transition-transform duration-300"
                />
            </div>
        </div>

        <!-- Content -->
        <h3
            class="text-[#0B4A3F] font-bold text-lg md:text-xl mb-2 tracking-wide"
        >
            {{ title }}
        </h3>

        <p class="text-gray-500 text-sm md:text-base leading-relaxed max-w-sm">
            {{ description }}
        </p>

        <!-- Custom Slot for actions like retry or add new button -->
        <div v-if="$slots.action" class="mt-6">
            <slot name="action" />
        </div>
    </div>
</template>

<style scoped>
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
}
</style>
