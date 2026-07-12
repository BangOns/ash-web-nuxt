<script lang="ts" setup>
import { motion } from "motion-v"; // Tambahkan import type
import MockData from "../data/mock-data";
import { fadeUp, staggerContainer } from "../utils/animate";

const { features } = MockData;
</script>

<template>
    <section class="relative z-30 mb-16 container mx-auto px-6 lg:px-12">
        <hr class="w-full pb-10 border-teal-200" />
        <motion.div
            :initial="{ opacity: 0, y: 50 }"
            :whileInView="{ opacity: 1, y: 0 }"
            :viewport="{ once: true, margin: '-50px' }"
            :transition="{ duration: 0.8 }"
            class="text-center mb-8"
        >
            <h2
                class="text-[#0B4A3F] font-bold text-xl md:text-2xl tracking-widest uppercase mb-6 drop-shadow-sm bg-white/50 inline-block px-6 py-2 rounded-full backdrop-blur-sm shadow-sm"
            >
                Keunggulan Kami
            </h2>
        </motion.div>

        <motion.div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            :viewport="{ once: true, margin: '-50px' }"
            :variants="staggerContainer"
        >
            <motion.div
                v-for="feature in features"
                :key="feature.title"
                whileInView="visible"
                :variants="fadeUp"
                class="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-xl shadow-teal-900/10 border border-white hover:-translate-y-2 transition-transform duration-500 text-center"
            >
                <div
                    class="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-4 border border-teal-100"
                >
                    <component :is="feature.icon" />
                </div>
                <h3 class="text-[#0B4A3F] font-bold text-xl mb-3">
                    {{ feature.title }}
                </h3>
                <p class="text-gray-500 text-sm leading-relaxed">
                    {{ feature.desc }}
                </p>
            </motion.div>
        </motion.div>
    </section>
</template>
