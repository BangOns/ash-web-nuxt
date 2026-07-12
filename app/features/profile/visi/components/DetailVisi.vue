<script setup lang="ts">
defineProps<{
  visi?: string;
}>();
</script>

<template>
  <div>
    <h2
      class="text-3xl font-bold text-primary-950 dark:text-white mb-6 flex items-center gap-3 border-b border-primary-100 dark:border-primary-800 pb-4 font-sans"
    >
      <span
        class="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center text-primary-600 text-sm font-bold"
      >
        01
      </span>
      Visi
    </h2>
    <div
      class="bg-primary-50 dark:bg-primary-800/50 p-6 md:p-8 rounded-2xl border border-primary-100 dark:border-primary-700"
    >
      <p
        class="text-xl md:text-2xl text-center font-medium text-primary-800 dark:text-primary-100 leading-relaxed italic"
      >
        &quot;{{
          visi ||
          "Menjadi lembaga pendidikan Islam terkemuka yang mencetak generasi rabbani, berakhlak mulia, cerdas, terampil, dan berwawasan global yang dijiwai dengan nilai-nilai Ahlussunnah wal Jama'ah."
        }}&quot;
      </p>
    </div>
  </div>
</template>
