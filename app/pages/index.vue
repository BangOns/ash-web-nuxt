<script setup lang="ts">
import { motion } from "motion-v";
</script>

<template>
    <article
        class="flex flex-col min-h-screen bg-linear-to-br from-teal-50 via-white to-amber-50 selection:bg-[#0B4A3F] selection:text-white font-sans overflow-x-hidden"
    >
        <section
            class="relative w-full min-h-screen flex items-center bg-[#0B4A3F] z-0 overflow-hidden pt-20 pb-40"
        >
            <div
                class="absolute top-0 left-0 w-1/2 h-full opacity-10 pointer-events-none"
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
                class="absolute top-0 right-0 w-full lg:w-[55%] h-full opacity-30 lg:opacity-100 z-0"
            >
                <img
                    src="https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1200&auto=format&fit=crop"
                    alt="Hero Background"
                    class="w-full h-full object-cover rounded-bl-[10rem] shadow-2xl"
                />
                {/* Overlay gradient blending image into the green background
                */}
                <div
                    class="absolute inset-0 bg-linear-to-r from-[#0B4A3F] via-[#0B4A3F]/80 to-transparent"
                ></div>
            </div>

            {/* Hero Content container */}
            <div
                class="container relative z-10 mx-auto px-6 lg:px-12 flex items-center h-full"
            >
                <motion.div
                    :initial="{ opacity: 0, x: -30 }"
                    :animate="{ opacity: 1, x: 0 }"
                    :transition="{ duration: 0.8, ease: 'easeOut' }"
                    class="max-w-xl text-white pt-10"
                >
                    <div class="mb-6 opacity-90">
                        <span
                            class="text-3xl font-serif tracking-widest text-[#B5E9D5]"
                        >
                            نُورُ العِلْم
                        </span>
                    </div>

                    <h1
                        class="text-4xl sm:text-5xl lg:text-5xl font-extrabold leading-[1.2] tracking-tight mb-8"
                    >
                        MENCETAK GENERASI RABBANI, BERAKHLAQ MULIA, & UNGGUL
                    </h1>

                    <p
                        class="text-lg text-[#B5E9D5] mb-10 leading-relaxed max-w-md font-light"
                    >
                        Selamat Datang di Pondok Pesantren Cahaya Ilmu.
                        Bergabunglah bersama kami.
                    </p>

                    <motion.div
                        :whileHover="{ scale: 1.05 }"
                        :whileTap="{ scale: 0.95 }"
                        class="inline-block"
                    >
                        <NuxtLink
                            to="/register"
                            class="block px-8 py-3.5 rounded-full bg-linear-to-r from-teal-400 to-[#12866B] text-white font-bold tracking-wide shadow-[0_0_20px_rgba(234,179,8,0.5)] border border-teal-300/30 hover:shadow-[0_0_25px_rgba(234,179,8,0.7)] transition-all duration-300 ease-in-out uppercase text-sm"
                        >
                            Daftar Sekarang
                        </NuxtLink>
                    </motion.div>
                </motion.div>
            </div>

            {/* Curved Bottom SVG Border */}
            <div
                class="absolute bottom-0.5 left-0 w-full z-20 pointer-events-none text-teal-50"
            >
                <svg
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                    class="w-full h-24 md:h-32 lg:h-48 drop-shadow-sm"
                >
                    <path
                        fill="currentColor"
                        d="M0,160L80,149.3C160,139,320,117,480,128C640,139,800,181,960,181.3C1120,181,1280,139,1360,117.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                    ></path>
                </svg>
            </div>
        </section>
    </article>
</template>
