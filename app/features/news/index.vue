<script setup lang="ts">
import { motion } from "motion-v";
import { Calendar, ArrowUpRight } from "@lucide/vue";
import { useNewsManagement } from "./hooks/useNewsManagement";

const { newsData, formatDate } = await useNewsManagement();
</script>

<template>
    <div
        class="bg-linear-to-br from-teal-50 via-white to-amber-50 min-h-screen font-sans pb-20"
    >
        <!-- HEADER SECTION -->
        <section
            class="bg-[#0B4A3F] text-white py-20 md:py-28 relative overflow-hidden z-0"
        >
            <div
                class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
            >
                <svg
                    class="w-full h-full text-white"
                    fill="currentColor"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,0 L20,0 L0,20 Z M50,0 L70,0 L0,70 L0,50 Z M100,0 L100,20 L20,100 L0,100 Z M100,50 L100,70 L70,100 L50,100 Z M100,100 L100,100 L100,100 L100,100 Z"
                        opacity="0.5"
                    />
                </svg>
            </div>
            <div
                class="container mx-auto px-6 lg:px-12 relative z-10 text-center"
            >
                <motion.h1
                    :initial="{ opacity: 0, y: 30 }"
                    :animate="{ opacity: 1, y: 0 }"
                    class="text-4xl md:text-5xl font-extrabold mb-4 uppercase tracking-wide"
                >
                    Berita & Kegiatan
                </motion.h1>
                <motion.p
                    :initial="{ opacity: 0, y: 20 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ delay: 0.1 }"
                    class="text-[#B5E9D5] text-lg max-w-2xl mx-auto"
                >
                    Kabar dan informasi terbaru seputar Pondok Pesantren
                    Ashhaburratib
                </motion.p>
            </div>
            <div
                class="absolute bottom-0.5 left-0 right-0 w-full z-20 pointer-events-none text-teal-50"
            >
                <svg
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    class="w-full h-16 md:h-24 drop-shadow-xs"
                >
                    <path
                        fill="currentColor"
                        d="M0,160L80,149.3C160,139,320,117,480,128C640,139,800,181,960,181.3C1120,181,1280,139,1360,117.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </section>

        <!-- NEWS GRID SECTION -->
        <section class="container mx-auto px-6 lg:px-12 mt-16 relative z-30">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <motion.div
                    v-for="(news, idx) in newsData"
                    :key="news.id"
                    :initial="{ opacity: 0, y: 30 }"
                    :while-in-view="{ opacity: 1, y: 0 }"
                    :viewport="{ once: true, margin: '-50px' }"
                    :transition="{ delay: (idx % 3) * 0.15, duration: 0.5 }"
                    class="bg-white rounded-4xl overflow-hidden shadow-lg shadow-teal-900/5 group border border-white flex flex-col h-full hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-900/10 transition-all duration-500 cursor-pointer"
                >
                    <div class="relative h-64 overflow-hidden">
                        <img
                            :src="news.thumbnail"
                            :alt="news.title"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                        />
                        <div
                            class="absolute inset-0 bg-[#0B4A3F]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        ></div>
                        <div
                            class="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-[#0B4A3F] shadow-xs"
                        >
                            {{ news.category }}
                        </div>
                    </div>
                    <div
                        class="p-8 flex flex-col grow relative bg-white z-10 transition-transform duration-500"
                    >
                        <div
                            class="flex items-center gap-2 text-gray-400 text-xs font-semibold mb-4"
                        >
                            <Calendar class="w-4 h-4" />
                            {{ formatDate(news.createdAt) }}
                        </div>
                        <h3
                            class="text-xl font-bold text-[#0B4A3F] mb-4 line-clamp-2 leading-snug group-hover:text-[#12866B] transition-colors"
                        >
                            {{ news.title }}
                        </h3>
                        <p
                            class="text-gray-500 mb-8 line-clamp-3 text-sm leading-relaxed grow"
                        >
                            {{ news.excerpt }}
                        </p>
                        <div class="mt-auto">
                            <NuxtLink
                                :to="`/news/${news.slug}`"
                                class="inline-flex items-center gap-2 bg-teal-50 text-[#12866B] font-bold text-sm hover:bg-linear-to-r hover:from-teal-400 hover:to-[#12866B] hover:text-white transition-all py-3 px-6 rounded-2xl shadow-xs"
                            >
                                Baca Selengkapnya
                                <ArrowUpRight class="w-4 h-4" />
                            </NuxtLink>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div
                v-if="!newsData?.length"
                class="text-center py-16 text-gray-400 italic text-sm"
            >
                Belum ada berita yang diterbitkan.
            </div>
        </section>
    </div>
</template>
