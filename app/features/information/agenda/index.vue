<script setup lang="ts">
import { motion } from "motion-v";
import { useAgendaManagement } from "./hooks/useAgendaManagement";

const { groupedAgenda } = await useAgendaManagement();
</script>

<template>
    <div class="space-y-8">
        <div>
            <h2
                class="text-3xl font-bold text-primary-950 dark:text-white mb-6 border-b border-primary-100 dark:border-primary-800 pb-4 font-sans"
            >
                Agenda Kegiatan
            </h2>

            <div class="space-y-10">
                <div
                    v-for="(group, idx) in groupedAgenda"
                    :key="idx"
                    class="relative"
                >
                    <h3
                        class="text-xl font-bold text-primary-800 dark:text-primary-200 mb-6 bg-primary-50 dark:bg-primary-900 inline-block px-4 py-2 rounded-xl"
                    >
                        {{ group.month }}
                    </h3>

                    <div
                        class="space-y-4 pl-4 border-l-2 border-primary-200 dark:border-primary-800 ml-4"
                    >
                        <motion.div
                            v-for="(event, eventIdx) in group.events"
                            :key="eventIdx"
                            :initial="{ opacity: 0, x: -20 }"
                            :animate="{ opacity: 1, x: 0 }"
                            :transition="{ delay: (idx + eventIdx) * 0.1 }"
                            class="relative bg-white dark:bg-primary-900 p-5 rounded-r-2xl border border-primary-100 dark:border-primary-800 border-l-4 border-l-primary-500 shadow-sm hover:shadow-md transition-all ml-4"
                        >
                            <div
                                class="absolute -left-6.75 top-6 w-4 h-4 rounded-full bg-primary-500 border-4 border-white dark:border-primary-950"
                            />
                            <div
                                class="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6"
                            >
                                <div class="shrink-0 w-24">
                                    <span
                                        class="font-bold text-lg text-primary-600 dark:text-primary-400"
                                        >{{ event.date }}</span
                                    >
                                </div>
                                <div>
                                    <h4
                                        class="font-bold text-gray-900 dark:text-white text-lg leading-snug"
                                    >
                                        {{ event.title }}
                                    </h4>
                                    <p
                                        class="text-sm text-gray-500 dark:text-gray-400 mt-1 font-semibold"
                                    >
                                        {{ event.time }}
                                    </p>
                                    <p
                                        v-if="event.description"
                                        class="text-xs text-gray-450 dark:text-gray-300 mt-2 leading-relaxed"
                                    >
                                        {{ event.description }}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div
                v-if="!groupedAgenda.length"
                class="text-center py-16 text-gray-400 italic text-sm"
            >
                Belum ada agenda kegiatan yang direncanakan.
            </div>
        </div>
    </div>
</template>
