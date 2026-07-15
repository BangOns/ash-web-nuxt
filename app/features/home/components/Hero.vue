<script setup lang="ts">
import { computed } from "vue";
import { motion } from "motion-v";
import bgAsh from "~/assets/img/bg-ash.jpg";

const { data: hero } = await useHeroApi().getHero();

const bgImageSrc = computed(() => {
    const imgUrl = hero.value?.bgImage;
    // Fallback to local bg-ash.jpg if bgImage is empty or uses the default Unsplash placeholder
    if (
        !imgUrl ||
        imgUrl.includes("images.unsplash.com/photo-1542810634-71277d95dcbb") ||
        imgUrl.includes("images.unsplash.com/photo-1519817650390")
    ) {
        return bgAsh;
    }
    return imgUrl;
});
</script>

<template>
    <section
        class="relative w-full min-h-screen flex items-center bg-linear-to-br from-[#062F26] via-[#0B4A3F] to-[#041D18] z-0 overflow-hidden pt-24 pb-20 lg:py-0"
    >
        <!-- Background patterns (Amber/Teal overlay) -->
        <header
            class="absolute top-0 left-0 w-full lg:w-1/2 h-full opacity-[0.03] lg:opacity-[0.05] pointer-events-none z-0"
        >
            <svg
                class="w-full h-full text-amber-400"
                fill="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <path
                    d="M0,0 L20,0 L0,20 Z M50,0 L70,0 L0,70 L0,50 Z M100,0 L100,20 L20,100 L0,100 Z M100,50 L100,70 L70,100 L50,100 Z M100,100 L100,100 L100,100 L100,100 Z"
                />
            </svg>
        </header>

        <!-- Responsive Container -->
        <section
            class="container relative z-10 mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen py-24 lg:py-0"
        >
            <!-- Left Column (Text & Buttons) -->
            <section
                class="max-w-xl text-white flex flex-col justify-center order-1"
            >
                <!-- Badge & Arabic Text -->
                <section class="flex items-center gap-3 mb-6">
                    <!-- <span
                        class="text-2xl font-serif text-[#B5E9D5] tracking-widest select-none"
                    >
                        اصحاب الرّاتب
                    </span> -->
                </section>

                <!-- Dynamic Title with Elegant Highlight -->
                <h1
                    class="text-4xl font-extrabold leading-[1.15] tracking-tight mb-6 uppercase text-transparent bg-clip-text bg-linear-to-r from-white via-white to-amber-200"
                >
                    {{
                        hero?.title ||
                        "MENCETAK GENERASI RABBANI, BERAKHLAQ MULIA, & UNGGUL"
                    }}
                </h1>

                <!-- Subtitle -->
                <p
                    class="text-lg text-[#B5E9D5]/90 mb-10 leading-relaxed max-w-lg font-light"
                >
                    {{
                        hero?.subtitle ||
                        "Selamat Datang di Pondok Pesantren Ashhaburratib. Bergabunglah bersama kami."
                    }}
                </p>

                <!-- CTA Buttons -->
                <section class="flex flex-wrap gap-4 items-center">
                    <motion.div
                        :while-hover="{ scale: 1.05, y: -2 }"
                        :while-tap="{ scale: 0.95 }"
                    >
                        <NuxtLink
                            to="https://wa.me/628979415635"
                            target="_blank"
                            class="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-linear-to-r from-amber-400 via-amber-500 to-yellow-500 text-teal-950 font-bold tracking-wide shadow-[0_4px_20px_rgba(245,158,11,0.4)] hover:shadow-[0_6px_25px_rgba(245,158,11,0.6)] border border-amber-300/30 transition-all uppercase text-sm cursor-pointer"
                        >
                            {{ hero?.btnText || "Daftar Sekarang" }}
                        </NuxtLink>
                    </motion.div>

                    <motion.div
                        :while-hover="{ scale: 1.05, y: -2 }"
                        :while-tap="{ scale: 0.95 }"
                    >
                        <NuxtLink
                            to="/profile/vision-mission"
                            class="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white/5 backdrop-blur-md text-white font-semibold tracking-wide border border-white/10 hover:bg-white/10 transition-all duration-300 uppercase text-sm"
                        >
                            Profil Pondok
                        </NuxtLink>
                    </motion.div>
                </section>
            </section>

            <!-- Right Column (The Image Card) -->
            <section
                class="relative w-full flex items-center justify-center lg:justify-end z-10 order-2"
            >
                <!-- Ambient Glow behind the card on desktop -->
                <section
                    class="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-amber-500/10 via-teal-500/5 to-transparent blur-3xl pointer-events-none z-0"
                />

                <!-- The Card Frame with Soft Rotation -->
                <div
                    class="relative w-full max-w-135 aspect-16/10 sm:aspect-video lg:aspect-16/10 rounded-3xl p-3 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(4,29,24,0.4)] overflow-hidden group z-10 lg:rotate-1 hover:rotate-0 transition-all duration-500 ease-out"
                >
                    <!-- Inner border highlighting -->
                    <div
                        class="absolute inset-0 rounded-3xl border border-amber-400/20 pointer-events-none group-hover:border-amber-400/40 transition-colors duration-500"
                    />

                    <!-- The building image -->
                    <img
                        :src="bgImageSrc"
                        alt="Gedung Pondok Pesantren Ashhaburratib AL Madani"
                        class="w-full h-full object-cover rounded-2xl shadow-inner group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    <!-- Elegant glassmorphic tag on the image -->
                    <div
                        class="absolute bottom-6 left-6 right-6 px-5 py-3 rounded-xl bg-teal-950/80 backdrop-blur-md border border-white/10 text-white flex justify-between items-center shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                    >
                        <div>
                            <h4
                                class="font-bold text-sm tracking-wide text-amber-300"
                            >
                                Gedung Utama Al Madani
                            </h4>
                            <p class="text-xs text-[#B5E9D5] font-light">
                                Jl. Mangga, Beji, Kota Depok
                            </p>
                        </div>
                        <span
                            class="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30"
                        >
                            Depok
                        </span>
                    </div>
                </div>
            </section>
        </section>

        <!-- Design gelombang (Bottom Curve Waves) -->
        <section
            class="absolute bottom-0 left-0 w-full z-20 pointer-events-none text-teal-50"
        >
            <svg
                viewBox="0 0 1440 300"
                preserveAspectRatio="none"
                class="w-full h-24 md:h-32 lg:h-48"
            >
                <path
                    fill="currentColor"
                    stroke="currentColor"
                    d="M0,160L80,149.3C160,139,320,117,480,128C640,139,800,181,960,181.3C1120,181,1280,139,1360,117.3L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                />
            </svg>
        </section>
    </section>
</template>
