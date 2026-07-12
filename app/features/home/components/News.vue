<script setup lang="ts">
import { motion } from "motion-v";
import { fadeUp, staggerContainer } from "../utils/animate";
import { ArrowRight, ArrowUpRight, Calendar } from "@lucide/vue";

const { data: newsData } = await useNewsApi().getNews();

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
};
</script>

<template>
    <section class="relative z-20 bg-white py-20">
        <div class="container mx-auto px-6 lg:px-12">
            <div
                class="mb-12 flex flex-col items-end justify-between md:flex-row"
            >
                <motion.div
                    initial="hidden"
                    while-in-view="visible"
                    :viewport="{ once: true }"
                    :variants="staggerContainer"
                >
                    <motion.h2
                        :variants="fadeUp"
                        class="mb-4 text-3xl font-extrabold uppercase tracking-tight text-[#0B4A3F] md:text-4xl"
                    >
                        Berita
                        <span
                            class="text-transparent bg-clip-text bg-linear-to-r from-teal-500 to-amber-500"
                        >
                            & Kegiatan
                        </span>
                    </motion.h2>
                    <motion.p :variants="fadeUp" class="text-gray-500 max-w-xl">
                        Kabar terbaru seputar pendaftaran santri, event,
                        prestasi, dan informasi penting pesantren.
                    </motion.p>
                </motion.div>

                <NuxtLink
                    to="/news"
                    class="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-teal-100 text-[#0B4A3F] hover:bg-teal-50 hover:border-teal-200 transition-colors font-semibold shadow-xs"
                >
                    Semua Berita <ArrowRight class="w-4 h-4" />
                </NuxtLink>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <!-- Left Featured Article -->
                <motion.div
                    v-if="newsData?.length"
                    :initial="{ opacity: 0, y: 30 }"
                    :whileInView="{ opacity: 1, y: 0 }"
                    :viewport="{ once: true, margin: '-50px' }"
                    :transition="{ duration: 0.6 }"
                    class="lg:col-span-7 group cursor-pointer"
                >
                    <NuxtLink :to="`/news/${newsData[0]?.slug}`">
                        <div
                            class="relative h-100 overflow-hidden rounded-4xl shadow-xl shadow-teal-900/10 md:h-120"
                        >
                            <img
                                :src="newsData[0]?.thumbnail"
                                :alt="newsData[0]?.title"
                                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div
                                class="absolute inset-0 bg-linear-to-t from-[#0B4A3F] via-[#0B4A3F]/50 to-transparent"
                            ></div>

                            <div class="absolute top-6 left-6 flex gap-3">
                                <span
                                    class="bg-[#0B4A3F] text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)] border border-teal-300/30"
                                >
                                    Kabar Terbaru
                                </span>
                            </div>
                            <div
                                class="absolute bottom-0 left-0 right-0 p-8 md:p-10"
                            >
                                <div
                                    class="flex items-center gap-2 text-teal-100 text-sm mb-3"
                                >
                                    <Calendar class="w-4 h-4" />
                                    {{
                                        formatDate(newsData[0]?.createdAt ?? "")
                                    }}
                                </div>
                                <h3
                                    class="text-white text-2xl md:text-3xl font-extrabold leading-tight mb-4 group-hover:text-yellow-400 transition-colors"
                                >
                                    {{ newsData[0]?.title }}
                                </h3>
                                <p
                                    class="text-teal-50 line-clamp-2 leading-relaxed opacity-90 max-w-2xl text-sm"
                                >
                                    {{ newsData[0]?.excerpt }}
                                </p>
                            </div>
                        </div>
                    </NuxtLink>
                </motion.div>

                <div
                    v-else
                    class="lg:col-span-7 bg-gray-50 border border-gray-200 rounded-4xl h-100 flex items-center justify-center text-gray-400"
                >
                    Belum ada berita.
                </div>

                <!-- Right List Articles -->
                <div class="lg:col-span-5 flex flex-col gap-6">
                    <motion.div
                        v-for="(news, idx) in newsData?.slice(1, 4)"
                        :key="news.id"
                        :initial="{ opacity: 0, x: 30 }"
                        :whileInView="{ opacity: 1, x: 0 }"
                        :viewport="{ once: true, margin: '-50px' }"
                        :transition="{ duration: 0.5, delay: idx * 0.15 }"
                        class="group cursor-pointer"
                    >
                        <NuxtLink
                            :to="`/news/${news.slug}`"
                            class="flex flex-col sm:flex-row gap-5 bg-white rounded-3xl p-4 border border-gray-100 shadow-xs hover:border-teal-150 hover:shadow-md transition-all h-full"
                        >
                            <div
                                class="w-full sm:w-1/3 h-32 rounded-2xl overflow-hidden shrink-0 relative"
                            >
                                <img
                                    :src="news.thumbnail"
                                    :alt="news.title"
                                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div class="absolute top-2 left-2">
                                    <span
                                        class="bg-white/95 backdrop-blur-xs text-[#0B4A3F] text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shadow-xs border border-gray-200/40"
                                    >
                                        {{ news.category }}
                                    </span>
                                </div>
                            </div>
                            <div
                                class="flex flex-col justify-center py-1 relative w-full sm:w-2/3"
                            >
                                <div
                                    class="flex items-center gap-2 text-gray-400 text-xs font-medium mb-1.5"
                                >
                                    <Calendar class="w-3.5 h-3.5" />
                                    {{ formatDate(news.createdAt) }}
                                </div>
                                <h4
                                    class="text-[#0B4A3F] font-bold text-sm leading-snug mb-2 group-hover:text-[#12866B] transition-colors line-clamp-2 pr-4"
                                >
                                    {{ news.title }}
                                </h4>
                                <span
                                    class="inline-flex items-center gap-1 text-xs font-semibold text-teal-650 group-hover:text-teal-750 transition-colors mt-auto"
                                >
                                    Baca Lengkap
                                    <ArrowUpRight class="w-3.5 h-3.5" />
                                </span>
                            </div>
                        </NuxtLink>
                    </motion.div>

                    <NuxtLink
                        to="/news"
                        class="md:hidden inline-flex justify-center items-center gap-2 w-full px-6 py-4 rounded-3xl bg-teal-50 text-[#0B4A3F] font-bold mt-2 shadow-xs border border-teal-100"
                    >
                        Semua Berita <ArrowRight class="w-4 h-4" />
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
