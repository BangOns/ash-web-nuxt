<script setup lang="ts">
import { computed } from "vue";
import { motion } from "motion-v";

const props = defineProps<{
  misi?: string;
}>();

const computedMisiList = computed(() => {
  if (!props.misi) {
    return [
      "Menyelenggarakan pendidikan formal dan non-formal secara komprehensif, integratif, dan kompetitif.",
      "Menanamkan aqidah yang kuat, membiasakan ibadah yang benar, dan membina akhlakul karimah.",
      "Mengembangkan minat, bakat, dan potensi santri melalui kegiatan ekstrakurikuler serta keterampilan hidup.",
      "Meningkatkan kualitas tenaga pendidik dan kependidikan seiring dengan perkembangan zaman.",
      "Membangun jaringan kerjasama dengan berbagai institusi dalam dan luar negeri untuk memperluas akses lulusan.",
      "Berperan aktif dalam pemberdayaan masyarakat dan dakwah Islamiyah.",
    ];
  }
  return props.misi
    .split("\n")
    .map((line) => line.replace(/^\d+[\.\s]*/, "").trim())
    .filter((line) => line.length > 0);
});
</script>

<template>
  <div>
    <h2
      class="text-3xl font-bold text-primary-950 dark:text-white mb-6 flex items-center gap-3 border-b border-primary-100 dark:border-primary-800 pb-4 font-sans"
    >
      <span
        class="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 text-sm font-bold"
      >
        02
      </span>
      Misi
    </h2>

    <ul class="space-y-4">
      <motion.li
        v-for="(item, idx) in computedMisiList"
        :key="idx"
        :initial="{ opacity: 0, x: -20 }"
        :animate="{ opacity: 1, x: 0 }"
        :transition="{ delay: idx * 0.1 }"
        class="flex gap-4 p-4 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-800/50 transition-colors"
      >
        <div
          class="w-6 h-6 rounded-full bg-primary-500 shrink-0 flex items-center justify-center mt-1"
        >
          <div class="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <p
          class="text-gray-700 dark:text-gray-300 text-lg font-medium leading-relaxed"
        >
          {{ item }}
        </p>
      </motion.li>
    </ul>
  </div>
</template>
