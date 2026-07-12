<script setup lang="ts">
import { motion } from "motion-v";

const infographics = [
    {
        title: "Alur Pendaftaran Santri Baru",
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop",
        desc: "Panduan langkah demi langkah proses pendaftaran santri baru mulai dari registrasi online, tes seleksi, hingga daftar ulang.",
    },
    {
        title: "Rincian Biaya Pendidikan MTs",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
        desc: "Infografis mengenai rincian biaya pendidikan bulanan dan tahunan bagi santri tingkat Madrasah Tsanawiyah.",
    },
    {
        title: "Jadwal Harian Santri (24 Jam)",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop",
        desc: "Distribusi waktu kegiatan santri dalam sehari semalam dari bangun tidur tahajud hingga istirahat malam.",
    },
];
</script>

<template>
    <div class="space-y-8">
        <div>
            <h2
                class="text-3xl font-bold text-primary-950 dark:text-white mb-6 border-b border-primary-100 dark:border-primary-800 pb-4"
            >
                Galeri Infografis
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Kumpulan desain infografis untuk mempermudah pemahaman mengenai
                alur, rincian biaya, maupun jadwal kegiatan di Pondok Pesantren.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                    v-for="(item, idx) in infographics"
                    :key="idx"
                    :initial="{ opacity: 0, scale: 0.95 }"
                    :animate="{ opacity: 1, scale: 1 }"
                    :transition="{ delay: idx * 0.1 }"
                    class="bg-white dark:bg-primary-900 rounded-2xl border border-primary-100 dark:border-primary-800 overflow-hidden shadow-sm hover:shadow-md transition-all group"
                >
                    <div class="h-64 overflow-hidden relative">
                        <img
                            :src="item.image"
                            :alt="item.title"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div
                            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                        >
                            <span
                                class="bg-white text-primary-900 px-4 py-2 rounded-full font-bold text-sm shadow-lg"
                                >Lihat Pratinjau Penuh</span
                            >
                        </div>
                    </div>
                    <div class="p-6">
                        <h3
                            class="text-xl font-bold text-primary-900 dark:text-white mb-2"
                        >
                            {{ item.title }}
                        </h3>
                        <p class="text-gray-600 dark:text-gray-300 text-sm">
                            {{ item.desc }}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    </div>
</template>
