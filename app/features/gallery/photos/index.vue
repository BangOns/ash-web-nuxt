<script setup lang="ts">
import { motion } from "motion-v";
import { Camera } from "@lucide/vue";

const { data: images } = await useGalleryApi().getGallery("IMAGE");
</script>

<template>
    <div class="space-y-8 pb-20">
        <div class="flex items-center gap-3 mb-8">
            <Camera class="w-8 h-8 text-[#0B4A3F]" />
            <h2 class="text-3xl font-bold text-primary-950 dark:text-white">
                Dokumentasi Foto
            </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
                v-for="(img, idx) in images"
                :key="img.id"
                :initial="{ opacity: 0, scale: 0.95 }"
                :animate="{ opacity: 1, scale: 1 }"
                :transition="{ delay: idx * 0.1 }"
                class="group relative rounded-2xl overflow-hidden aspect-4/3 bg-primary-100 dark:bg-primary-900 cursor-pointer shadow-sm hover:shadow-xl transition-all border border-gray-100"
            >
                <img
                    :src="img.file"
                    :alt="img.title"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                >
                <div
                    class="absolute inset-0 bg-linear-to-t from-primary-950/90 via-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                >
                    <div
                        class="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                        <p class="text-white font-bold text-lg drop-shadow-xs">
                            {{ img.title }}
                        </p>
                        <p
                            v-if="img.description"
                            class="text-teal-200 text-xs mt-1 truncate"
                        >
                            {{ img.description }}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>

        <div
            v-if="!images?.length"
            class="text-center py-16 text-gray-400 italic text-sm"
        >
            Belum ada dokumentasi foto.
        </div>
    </div>
</template>
