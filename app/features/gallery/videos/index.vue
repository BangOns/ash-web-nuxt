<script setup lang="ts">
import { motion } from "motion-v";
import { Video } from "@lucide/vue";

const { data: videos } = await useGalleryApi().getGallery("VIDEO");
</script>

<template>
  <div class="space-y-8 pb-20">
    <div class="flex items-center gap-3 mb-8">
      <Video class="w-8 h-8 text-[#0B4A3F]" />
      <h2 class="text-3xl font-bold text-primary-950 dark:text-white">
        Dokumentasi Video
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        v-for="(vid, idx) in videos"
        :key="vid.id"
        :initial="{ opacity: 0, y: 30 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: idx * 0.1 }"
        class="group outline-none"
      >
        <a :href="vid.file" target="_blank" class="block">
          <div
            class="relative rounded-2xl overflow-hidden aspect-video bg-primary-100 dark:bg-primary-900 cursor-pointer shadow-md mb-4 border border-gray-100"
          >
            <img
              :src="vid.thumbnail"
              :alt="vid.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            >

            <!-- Play Button Overlay -->
            <div
              class="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center"
            >
              <div
                class="w-16 h-16 rounded-full bg-teal-600/90 backdrop-blur-xs flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-500 transition-all shadow-lg border border-white/20"
              >
                <div
                  class="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"
                />
              </div>
            </div>
          </div>
        </a>

        <h3
          class="text-xl font-bold text-[#0B4A3F] dark:text-white group-hover:text-teal-700 transition-colors cursor-pointer line-clamp-2"
        >
          <a :href="vid.file" target="_blank">{{ vid.title }}</a>
        </h3>
        <p
          v-if="vid.description"
          class="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed"
        >
          {{ vid.description }}
        </p>
      </motion.div>
    </div>

    <div
      v-if="!videos?.length"
      class="text-center py-16 text-gray-400 italic text-sm"
    >
      Belum ada dokumentasi video.
    </div>
  </div>
</template>
