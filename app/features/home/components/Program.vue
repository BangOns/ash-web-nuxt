<script setup lang="ts">
import { motion } from "motion-v";
import { fadeUp, staggerContainer } from "../utils/animate";
import { ArrowRight, GraduationCap, BookOpen, ShieldCheck, Briefcase } from "@lucide/vue";

const { data: dbPrograms } = await useProgramsApi().getPrograms();

const iconMap: Record<string, any> = {
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
          whileInView="visible"
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
            Selamat Datang di Pondok Pesantren Ashhaburratib. Kami menawarkan
            pendidikan holistik dan terbaik.
          </motion.p>
        </motion.div>

        <NuxtLink
          to="/information/services"
          class="hidden md:inline-flex group items-center gap-2 px-6 py-3 rounded-full bg-[#0B4A3F] text-white hover:bg-[#07332b] transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Lihat Semua
          <ArrowRight
            class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </NuxtLink>
      </div>

      <motion.div
        class="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial="hidden"
        whileInView="visible"
        :viewport="{ once: true, margin: '-50px' }"
        :variants="staggerContainer"
      >
        <motion.div
          v-for="program in dbPrograms"
          :key="program.id"
          :variants="fadeUp"
          class="group relative bg-white rounded-3xl p-8 border border-gray-150 hover:border-teal-200 shadow-md shadow-[#0B4A3F]/5 hover:shadow-xl hover:shadow-[#0B4A3F]/12 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between cursor-pointer"
        >
          <!-- Top Card Area: Icon, Title & Description -->
          <div class="space-y-6">
            <!-- Icon Wrapper -->
            <div
              class="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-teal-50 border border-teal-100 text-[#0B4A3F] group-hover:bg-[#0B4A3F] group-hover:text-white group-hover:border-[#0B4A3F] transition-all duration-500 shadow-inner"
            >
              <component :is="getIcon(program.icon)" class="w-7 h-7" />
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

          <!-- Bottom Card Area: Action Link -->
          <div
            class="mt-8 pt-4 border-t border-gray-50 flex items-center text-xs font-bold text-teal-600 group-hover:text-teal-700 tracking-wider uppercase gap-2 select-none"
          >
            Selengkapnya
            <ArrowRight
              class="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
</template>
