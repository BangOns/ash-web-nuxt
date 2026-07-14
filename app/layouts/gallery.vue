<script setup lang="ts">
import { motion } from "motion-v";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
    <NuxtLayout name="default">
        <article
            class="bg-linear-to-br from-teal-50 via-white to-amber-50 min-h-screen font-sans pb-20"
        >
            <!-- Header -->
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
                        Galeri Pesantren
                    </motion.h1>
                    <motion.p
                        :initial="{ opacity: 0, y: 20 }"
                        :animate="{ opacity: 1, y: 0 }"
                        :transition="{ delay: 0.1 }"
                        class="text-[#B5E9D5] text-lg max-w-2xl mx-auto mb-10"
                    >
                        Dokumentasi kegiatan dan fasilitas Pondok Pesantren
                        Ashhaburratib
                    </motion.p>

                    <!-- Tab Navigation -->
                    <motion.div
                        :initial="{ opacity: 0, y: 20 }"
                        :animate="{ opacity: 1, y: 0 }"
                        :transition="{ delay: 0.2 }"
                        class="flex justify-center gap-4"
                    >
                        <NuxtLink
                            to="/gallery/photos"
                            :class="[
                                'px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-sm transition-all',
                                route.path.includes('photos')
                                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-[0_0_20px_rgba(234,179,8,0.5)]'
                                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20',
                            ]"
                        >
                            Foto
                        </NuxtLink>
                        <NuxtLink
                            to="/gallery/videos"
                            :class="[
                                'px-8 py-3.5 rounded-full font-bold uppercase tracking-wider text-sm transition-all',
                                route.path.includes('videos')
                                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-[0_0_20px_rgba(234,179,8,0.5)]'
                                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20',
                            ]"
                        >
                            Video
                        </NuxtLink>
                    </motion.div>
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
                        />
                    </svg>
                </div>
            </section>

            <!-- Main Content -->
            <section
                class="container mx-auto px-6 lg:px-12 mt-12 relative z-30"
            >
                <motion.div
                    :initial="{ opacity: 0, y: 20 }"
                    :animate="{ opacity: 1, y: 0 }"
                    class="w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-xl shadow-teal-900/5 border border-white p-8 md:p-12"
                >
                    <slot />
                </motion.div>
            </section>
        </article>
    </NuxtLayout>
</template>
