<script setup lang="ts">
import { motion } from "motion-v";
import { Calendar, ArrowLeft, Tag, Share2 } from "@lucide/vue";
import { useNewsDetailManagement } from "./hooks/useNewsDetailManagement";

const { article, formatDate } = await useNewsDetailManagement();
</script>

<template>
    <div
        class="bg-linear-to-br from-teal-50 via-white to-amber-50 min-h-screen font-sans pb-20"
    >
        <div v-if="!article" class="container mx-auto px-6 py-24 text-center">
            <p class="text-gray-500 text-base">Memuat data berita...</p>
        </div>

        <div v-else>
            <!-- HEADER HERO SECTION -->
            <section
                class="bg-[#0B4A3F] text-white pt-28 pb-40 md:pt-36 md:pb-48 relative overflow-hidden z-0"
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

                <!-- Navigation Breadcrumb -->
                <div
                    class="container mx-auto px-6 lg:px-12 relative z-10 mb-8 mt-4"
                >
                    <NuxtLink
                        to="/news"
                        class="inline-flex items-center gap-2 text-teal-100 hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-full text-sm font-semibold backdrop-blur-md border border-white/10 shadow-sm cursor-pointer"
                    >
                        <ArrowLeft class="w-4 h-4" /> Kembali ke Daftar Berita
                    </NuxtLink>
                </div>

                <div class="container mx-auto px-6 lg:px-12 relative z-10">
                    <div
                        class="max-w-4xl mx-auto text-center md:text-left flex flex-col items-center md:items-start"
                    >
                        <div
                            class="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-6"
                        >
                            <span
                                class="bg-linear-to-r from-yellow-400 to-amber-500 text-white text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                            >
                                {{ article.category }}
                            </span>
                            <span
                                class="flex items-center gap-2 text-teal-100 text-sm font-semibold"
                            >
                                <Calendar class="w-4 h-4" />
                                {{ formatDate(article.createdAt) }}
                            </span>
                        </div>
                        <motion.h1
                            :initial="{ opacity: 0, y: 20 }"
                            :animate="{ opacity: 1, y: 0 }"
                            class="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-center md:text-left"
                        >
                            {{ article.title }}
                        </motion.h1>
                    </div>
                </div>

                <!-- SVG Decorative Curve Overlap -->
                <div
                    class="absolute bottom-0.5 left-0 right-0 w-full z-20 pointer-events-none text-teal-50"
                >
                    <svg
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                        class="w-full h-16 md:h-32 drop-shadow-xs"
                    >
                        <path
                            fill="currentColor"
                            d="M0,160L80,149.3C160,139,320,117,480,128C640,139,800,181,960,181.3C1120,181,1280,139,1360,117.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </section>

            <!-- ARTICLE CONTENT PLATFORM -->
            <section
                class="container mx-auto px-6 lg:px-12 relative z-30 -mt-24 md:-mt-32"
            >
                <div class="max-w-5xl mx-auto">
                    <motion.div
                        :initial="{ opacity: 0, y: 30 }"
                        :animate="{ opacity: 1, y: 0 }"
                        :transition="{ duration: 0.6 }"
                        class="bg-white/95 backdrop-blur-md rounded-[2.5rem] md:rounded-[3.5rem] p-6 lg:p-14 shadow-2xl shadow-teal-900/10 border border-white"
                    >
                        <!-- Featured Image Canvas -->
                        <div
                            class="w-full h-64 md:h-100 lg:h-125 rounded-2xl md:rounded-4xl overflow-hidden mb-12 shadow-md"
                        >
                            <img
                                :src="article.thumbnail"
                                :alt="article.title"
                                class="w-full h-full object-cover shadow-inner"
                            />
                        </div>

                        <!-- Typed Body Container -->
                        <div class="px-2 md:px-8">
                            <div
                                class="text-gray-700 text-lg md:text-xl font-medium leading-[1.8] tracking-wide space-y-8 [&>p]:mb-6 [&>h3]:text-3xl [&>h3]:font-extrabold [&>h3]:text-[#0B4A3F] [&>h3]:mt-12 [&>h3]:mb-6 [&>ul]:list-disc [&>ul]:pl-8 [&>ul>li]:mb-3 [&>ul>li]:pl-2 [&>ul>li::marker]:text-teal-500"
                                v-html="article.content"
                            />
                        </div>

                        <!-- Article Footer & Social Share -->
                        <div
                            class="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 px-2 md:px-8"
                        >
                            <div
                                class="flex flex-wrap items-center gap-3 text-sm font-semibold text-gray-500"
                            >
                                <Tag class="w-5 h-5 text-teal-600" />
                                <span
                                    class="bg-teal-50 text-teal-800 px-4 py-1.5 rounded-lg border border-teal-100"
                                    >Pesantren</span
                                >
                                <span
                                    class="bg-teal-50 text-teal-800 px-4 py-1.5 rounded-lg border border-teal-100"
                                    >{{ article.category }}</span
                                >
                            </div>
                            <button
                                class="flex items-center gap-2 text-[#12866B] font-bold bg-white border border-teal-100 hover:bg-teal-50 hover:border-teal-200 shadow-sm px-6 py-3 rounded-2xl transition-all cursor-pointer"
                            >
                                <Share2 class="w-5 h-5" />
                                Bagikan Artikel
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    </div>
</template>
