<script setup lang="ts">
import { motion } from "motion-v";
import { useRoute } from "vue-router";
import { Info, BellRing, CalendarDays, PieChart } from "@lucide/vue";

const route = useRoute();

const links = [
    { name: "Layanan", href: "/information/services", icon: Info },
    { name: "Pengumuman", href: "/information/announcements", icon: BellRing },
    { name: "Agenda", href: "/information/agenda", icon: CalendarDays },
    { name: "Infografis", href: "/information/infographics", icon: PieChart },
];
</script>

<template>
    <NuxtLayout name="default">
        <article
            class="bg-linear-to-br from-teal-50 via-white to-amber-50 min-h-screen font-sans pb-20"
        >
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
                        Layanan Informasi
                    </motion.h1>
                    <motion.p
                        :initial="{ opacity: 0, y: 20 }"
                        :animate="{ opacity: 1, y: 0 }"
                        :transition="{ delay: 0.1 }"
                        class="text-[#B5E9D5] text-lg max-w-2xl mx-auto"
                    >
                        Pusat informasi kegiatan, layanan administrasi, dan
                        pengumuman.
                    </motion.p>
                </div>
                <div
                    class="absolute bottom-[-2px] left-0 right-0 w-full z-20 pointer-events-none text-teal-50"
                >
                    <svg
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                        class="w-full h-16 md:h-24 drop-shadow-sm"
                    >
                        <path
                            fill="currentColor"
                            d="M0,160L80,149.3C160,139,320,117,480,128C640,139,800,181,960,181.3C1120,181,1280,139,1360,117.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </section>

            <section
                class="container mx-auto px-6 lg:px-12 mt-12 relative z-30"
            >
                <div class="flex flex-col md:flex-row gap-8">
                    <motion.aside
                        :initial="{ opacity: 0, x: -20 }"
                        :animate="{ opacity: 1, x: 0 }"
                        class="w-full md:w-1/4 shrink-0"
                    >
                        <div
                            class="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg shadow-teal-900/5 border border-white p-6 sticky top-28"
                        >
                            <h3
                                class="font-bold text-lg text-[#0B4A3F] mb-6 px-3 uppercase tracking-wider"
                            >
                                Kategori
                            </h3>
                            <nav class="flex flex-col space-y-3">
                                <NuxtLink
                                    v-for="link in links"
                                    :key="link.name"
                                    :to="link.href"
                                    :class="[
                                        'flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all',
                                        route.path === link.href
                                            ? 'bg-gradient-to-r from-teal-400 to-[#12866B] text-white shadow-md shadow-teal-500/20'
                                            : 'text-gray-600 hover:bg-teal-50 hover:text-[#0B4A3F]',
                                    ]"
                                >
                                    <component
                                        :is="link.icon"
                                        :class="[
                                            'w-5 h-5',
                                            route.path === link.href
                                                ? 'text-white'
                                                : 'text-teal-600',
                                        ]"
                                    />
                                    <span class="font-semibold text-sm">{{
                                        link.name
                                    }}</span>
                                </NuxtLink>
                            </nav>
                        </div>
                    </motion.aside>

                    <motion.main
                        :initial="{ opacity: 0, y: 20 }"
                        :animate="{ opacity: 1, y: 0 }"
                        class="w-full md:w-3/4 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl shadow-teal-900/5 border border-white p-8 md:p-12"
                    >
                        <slot />
                    </motion.main>
                </div>
            </section>
        </article>
    </NuxtLayout>
</template>
