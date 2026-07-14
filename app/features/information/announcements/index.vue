<script setup lang="ts">
import { motion } from "motion-v";
import { FileText } from "@lucide/vue";
import { useAnnouncementsManagement } from "./hooks/useAnnouncementsManagement";

const { announcements, formatDate } = await useAnnouncementsManagement();
</script>

<template>
  <div class="space-y-8">
    <div>
      <h2
        class="text-3xl font-bold text-primary-950 dark:text-white mb-6 border-b border-primary-100 dark:border-primary-800 pb-4 font-sans"
      >
        Pengumuman Resmi
      </h2>

      <div class="space-y-5">
        <motion.div
          v-for="(item, idx) in announcements"
          :key="item.id"
          :initial="{ opacity: 0, x: -20 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ delay: idx * 0.1 }"
          class="bg-white dark:bg-primary-900 border border-primary-100 dark:border-primary-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-5"
        >
          <div
            class="shrink-0 flex sm:flex-col gap-3 sm:gap-1 items-center sm:items-start text-sm"
          >
            <span
              class="bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300 px-3 py-1 sm:px-0 sm:py-0 sm:bg-transparent font-medium sm:font-normal rounded-full border border-primary-100 dark:border-primary-800 sm:border-none"
            >
              {{ formatDate(item.createdAt) }}
            </span>
          </div>
          <div class="flex-grow">
            <h3
              class="text-xl font-bold text-primary-900 dark:text-white mb-2 flex items-start gap-2 leading-snug"
            >
              <FileText class="w-5 h-5 text-primary-500 shrink-0 mt-1" />
              {{ item.title }}
            </h3>
            <p
              class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm whitespace-pre-line"
            >
              {{ item.description }}
            </p>
          </div>
        </motion.div>
      </div>

      <div
        v-if="!announcements?.length"
        class="text-center py-16 text-gray-400 italic text-sm"
      >
        Belum ada pengumuman resmi saat ini.
      </div>
    </div>
  </div>
</template>
