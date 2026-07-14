<script setup lang="ts">
import { motion } from "motion-v";
import { fadeUp, staggerContainer } from "../utils/animate";
import {
    GraduationCap,
    BookOpen,
    ShieldCheck,
    Briefcase,
    type LucideIcon,
} from "@lucide/vue";

const { data: dbPrograms } = await useProgramsApi().getPrograms();

const iconMap: Record<string, LucideIcon> = {
    GraduationCap,
    BookOpen,
    ShieldCheck,
    Briefcase,
};

const getIcon = (iconName: string) => {
    return iconMap[iconName] || GraduationCap;
};
</script>

<template>
    <section
        class="py-16 md:py-24 relative z-10 w-full rounded-tl-[6rem] bg-linear-to-br from-white/60 to-amber-50/60 shadow-inner"
    >
        <div class="container mx-auto px-6 lg:px-12">
            <div
                class="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#0B4A3F]/10 pb-6"
            >
                <motion.div
                    initial="hidden"
                    while-in-view="visible"
                    :viewport="{ once: true }"
                    :variants="staggerContainer"
                >
                    <motion.h2
                        :variants="fadeUp"
                        class="text-4xl md:text-5xl font-extrabold text-[#0B4A3F] mb-4 uppercase tracking-tight"
                    >
                        Program
                        <br />
                        Pendidikan
                    </motion.h2>
                    <motion.p
                        :variants="fadeUp"
                        class="text-[#0B4A3F]/70 text-lg max-w-xl"
                    >
                        Selamat Datang di Pondok Pesantren Ashhaburratib. Kami
                        menawarkan pendidikan holistik dan terbaik.
                    </motion.p>
                </motion.div>
            </div>

            <motion.div
                class="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial="hidden"
                while-in-view="visible"
                :viewport="{ once: true, margin: '-50px' }"
                :variants="staggerContainer"
            >
                <motion.div
                    v-for="program in dbPrograms"
                    :key="program.id"
                    :variants="fadeUp"
                    class="group relative bg-white rounded-3xl p-8 border border-gray-150 hover:border-teal-200 shadow-md shadow-[#0B4A3F]/5 hover:shadow-xl hover:shadow-[#0B4A3F]/12 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between"
                >
                    <!-- Top Card Area: Icon, Title & Description -->
                    <div class="space-y-6">
                        <!-- Icon Wrapper -->
                        <div
                            class="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-teal-50 border border-teal-100 text-[#0B4A3F] group-hover:bg-[#0B4A3F] group-hover:text-white group-hover:border-[#0B4A3F] transition-all duration-500 shadow-inner"
                        >
                            <component
                                :is="getIcon(program.icon)"
                                class="w-7 h-7"
                            />
                        </div>

                        <!-- Title -->
                        <h3
                            class="text-xl font-bold text-gray-800 group-hover:text-[#0B4A3F] transition-colors duration-300"
                        >
                            {{ program.title }}
                        </h3>

                        <!-- Description -->
                        <p class="text-gray-500 leading-relaxed text-sm">
                            {{ program.description }}
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    </section>
</template>
