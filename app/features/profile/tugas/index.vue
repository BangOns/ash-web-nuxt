<script setup lang="ts">
import { motion } from "motion-v";
import { dutiesList } from "./data";

const duties = dutiesList;
</script>

<template>
    <div class="space-y-8">
        <div>
            <h2
                class="text-3xl font-bold text-primary-950 dark:text-white mb-6 border-b border-primary-100 dark:border-primary-800 pb-4"
            >
                Tugas Pokok & Fungsi
            </h2>
            <p
                class="text-gray-600 dark:text-gray-300 mb-10 leading-relaxed text-lg"
            >
                Secara umum, tugas utama Pondok Pesantren Ashhaburratib adalah
                tafaqquh fiddin (mendalami ilmu agama) dan
                mengimplementasikannya dalam kehidupan bermasyarakat. Berikut
                adalah rincian fungsionalnya:
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    v-for="(duty, idx) in duties"
                    :key="idx"
                    :initial="{ opacity: 0, y: 20 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ delay: idx * 0.1 }"
                    class="bg-white dark:bg-primary-800/50 rounded-2xl p-6 md:p-8 border border-primary-100 dark:border-primary-700 shadow-sm hover:shadow-md transition-shadow group"
                >
                    <div
                        :class="[
                            'w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110',
                            duty.color,
                        ]"
                    >
                        <component :is="duty.icon" class="w-7 h-7" />
                    </div>

                    <h3
                        class="text-xl font-bold text-primary-900 dark:text-white mb-3"
                    >
                        {{ duty.title }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {{ duty.desc }}
                    </p>
                </motion.div>
            </div>
        </div>
    </div>
</template>
