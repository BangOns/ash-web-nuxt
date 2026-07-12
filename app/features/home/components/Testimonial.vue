<script setup lang="ts">
import { Quote } from "@lucide/vue";

const { data: dbGallery } = await useGalleryApi().getGallery("IMAGE");
const { data: dbTestimonials } = await useTestimonialsApi().getTestimonials();
</script>

<template>
  <section class="py-20 relative bg-[#0B4A3F]">
    <div
      class="absolute -top-0.5 left-0 w-full z-20 pointer-events-none text-white"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        class="w-full h-12 md:h-16 lg:h-20 drop-shadow-xs rotate-180"
      >
        <path
          fill="currentColor"
          d="M0,64L120,53.3C240,43,480,21,720,26.7C960,32,1200,64,1320,80L1440,96L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"
        ></path>
      </svg>
    </div>

    <div class="container mx-auto px-6 lg:px-12 pt-10 relative z-30">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <h3
            class="text-white text-3xl font-bold mb-8 uppercase tracking-wide border-l-4 border-yellow-500 pl-4"
          >
            Galeri Kegiatan
          </h3>
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="img in dbGallery?.slice(0, 4)"
              :key="img.id"
              class="rounded-3xl overflow-hidden h-32 md:h-40 group cursor-pointer shadow-md"
            >
              <img
                :src="img.file"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                :alt="img.title"
              />
            </div>
            <div
              v-if="!dbGallery?.length"
              class="col-span-2 text-center text-teal-200 py-12 text-sm italic"
            >
              Belum ada foto galeri kegiatan.
            </div>
          </div>
        </div>

        <div>
          <h3
            class="text-white text-3xl font-bold mb-8 uppercase tracking-wide border-l-4 border-yellow-500 pl-4"
          >
            Testimoni
          </h3>
          <ClientOnly>
            <swiper-container
              :space-between="20"
              :slides-per-view="1"
              :autoplay="{ delay: 5000 }"
              :pagination="{
                clickable: true,
                dynamicBullets: true,
              }"
              class="pb-12"
            >
              <swiper-slide v-for="t in dbTestimonials" :key="t.id">
                <div
                  class="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 h-full flex flex-col hover:bg-white/20 transition-colors"
                >
                  <Quote class="text-yellow-500 w-8 h-8 mb-4 opacity-70" />

                  <p
                    class="text-teal-100 italic mb-6 text-sm md:text-base leading-relaxed grow"
                  >
                    "{{ t.testimonial }}"
                  </p>

                  <div class="flex items-center gap-4">
                    <img
                      v-if="t.photo"
                      :src="t.photo"
                      class="w-12 h-12 rounded-full object-cover bg-gray-100 border border-white/20 shadow-md"
                    />
                    <div
                      v-else
                      class="w-12 h-12 rounded-full bg-linear-to-r from-teal-400 to-[#12866B] flex items-center justify-center text-white font-bold text-lg shadow-md"
                    >
                      {{ t.name.charAt(0) }}
                    </div>
                    <div>
                      <h4 class="font-bold text-white">
                        {{ t.name }}
                      </h4>
                      <p class="text-teal-200 text-sm">
                        {{ t.position }}
                      </p>
                    </div>
                  </div>
                </div>
              </swiper-slide>
            </swiper-container>
            <div
              v-if="!dbTestimonials?.length"
              class="text-center text-teal-200 py-12 text-sm italic"
            >
              Belum ada testimoni.
            </div>
          </ClientOnly>
        </div>
      </div>
    </div>
  </section>
</template>
