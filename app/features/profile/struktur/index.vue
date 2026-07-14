<script setup lang="ts">
import { motion } from "motion-v";

const { data: members } = await useOrganisasiApi().getMembers();
</script>

<template>
  <div class="space-y-8">
    <div>
      <h2
        class="text-3xl font-bold text-primary-950 dark:text-white mb-6 border-b border-primary-100 dark:border-primary-800 pb-4 font-sans"
      >
        Struktur Organisasi
      </h2>
      <p class="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
        Pondok Pesantren Ashhaburratib dikelola oleh jajaran pengurus yang
        berdedikasi tinggi, terdiri dari para kyai, asatidz, dan profesional
        di bidang pendidikan untuk memastikan tercapainya visi dan misi
        institusi.
      </p>

      <!-- Dynamic Members List -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div
          v-for="member in members"
          :key="member.id"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          class="bg-white dark:bg-primary-900 border border-primary-100 dark:border-primary-850 rounded-3xl p-6 shadow-md shadow-primary-900/5 text-center flex flex-col items-center gap-4"
        >
          <img
            :src="
              member.photo ||
              'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200'
            "
            class="w-24 h-24 rounded-full object-cover shadow-md border-2 border-primary-100 dark:border-primary-800 bg-gray-50"
          >
          <div>
            <h4 class="font-bold text-lg text-primary-950 dark:text-white">
              {{ member.name }}
            </h4>
            <p class="text-sm text-teal-600 dark:text-teal-400 font-bold mt-1">
              {{ member.position }}
            </p>
          </div>
        </motion.div>
      </div>

      <div
        v-if="!members?.length"
        class="text-center py-12 text-gray-400 italic text-sm"
      >
        Belum ada data kepengurusan.
      </div>
    </div>
  </div>
</template>
