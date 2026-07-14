<script setup lang="ts">
import { motion } from "motion-v";
import { useRoute } from "vue-router";
import { ClipboardList, BookHeart, Mic, MessageSquarePlus } from "@lucide/vue";

const route = useRoute();

const links = [
    {
        name: "Survei Kepuasan",
        href: "/interaction/survey",
        icon: ClipboardList,
        desc: "Bantu kami meningkatkan kualitas layanan",
    },
    {
        name: "Buku Tamu",
        href: "/interaction/guest-book",
        icon: BookHeart,
        desc: "Tinggalkan jejak kunjungan Anda",
    },
    {
        name: "Suara Anda",
        href: "/interaction/your-voice",
        icon: Mic,
        desc: "Sampaikan aspirasi dan pandangan Anda",
    },
    {
        name: "Kritik & Saran",
        href: "/interaction/suggestions-reviews",
        icon: MessageSquarePlus,
        desc: "Masukan membangun untuk pesantren",
    },
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
                        Ruang Interaksi
                    </motion.h1>
                    <motion.p
                        :initial="{ opacity: 0, y: 20 }"
                        :animate="{ opacity: 1, y: 0 }"
                        :transition="{ delay: 0.1 }"
                        class="text-[#B5E9D5] text-lg max-w-2xl mx-auto"
                    >
                        Kami sangat menghargai setiap masukan, saran, dan
                        aspirasi dari Anda untuk kemajuan bersama.
                    </motion.p>
                </div>
                <div
                    class="absolute -bottom-0.5 left-0 right-0 w-full z-20 pointer-events-none text-teal-50"
                >
                    <svg
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                        class="w-full h-16 md:h-24 drop-shadow-sm"
                    >
                        <path
                            fill="currentColor"
                            d="M0,160L80,149.3C160,139,320,117,480,128C640,139,800,181,960,181.3C1120,181,1280,139,1360,117.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                        />
                    </svg>
                </div>
            </section>

            <section
                class="container mx-auto px-6 lg:px-12 mt-12 relative z-30"
            >
                <div class="flex flex-col lg:flex-row gap-8">
                    <motion.aside
                        :initial="{ opacity: 0, x: -20 }"
                        :animate="{ opacity: 1, x: 0 }"
                        class="w-full lg:w-1/3 shrink-0"
                    >
                        <div
                            class="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg shadow-teal-900/5 border border-white p-6 md:p-8 sticky top-28"
                        >
                            <h3
                                class="font-bold text-xl text-[#0B4A3F] mb-6 uppercase tracking-wider"
                            >
                                Pilih Layanan
                            </h3>
                            <div class="space-y-4">
                                <NuxtLink
                                    v-for="link in links"
                                    :key="link.name"
                                    :to="link.href"
                                    :class="[
                                        'block p-5 rounded-2xl transition-all border',
                                        route.path === link.href
                                            ? 'bg-linear-to-br from-teal-50 to-white border-teal-200 shadow-md shadow-teal-900/5'
                                            : 'bg-white border-transparent hover:bg-teal-50/50 hover:border-teal-100',
                                    ]"
                                >
                                    <div class="flex items-start gap-5">
                                        <div
                                            :class="[
                                                'p-3 rounded-xl shrink-0',
                                                route.path === link.href
                                                    ? 'bg-linear-to-r from-teal-400 to-[#12866B] text-white shadow-md shadow-teal-500/20'
                                                    : 'bg-teal-50 text-teal-600',
                                            ]"
                                        >
                                            <component
                                                :is="link.icon"
                                                class="w-6 h-6"
                                            />
                                        </div>
                                        <div>
                                            <h4
                                                :class="[
                                                    'font-bold text-lg',
                                                    route.path === link.href
                                                        ? 'text-[#0B4A3F]'
                                                        : 'text-gray-900',
                                                ]"
                                            >
                                                {{ link.name }}
                                            </h4>
                                            <p
                                                :class="[
                                                    'text-sm mt-1 leading-relaxed',
                                                    route.path === link.href
                                                        ? 'text-teal-700'
                                                        : 'text-gray-500',
                                                ]"
                                            >
                                                {{ link.desc }}
                                            </p>
                                        </div>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
                    </motion.aside>

                    <motion.main
                        :initial="{ opacity: 0, y: 20 }"
                        :animate="{ opacity: 1, y: 0 }"
                        class="w-full lg:w-2/3 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl shadow-teal-900/5 border border-white p-8 md:p-12"
                    >
                        <slot />
                    </motion.main>
                </div>
            </section>
        </article>
    </NuxtLayout>
</template>
