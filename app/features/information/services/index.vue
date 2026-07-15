<script setup lang="ts">
import { motion } from "motion-v";
import { CopyCheck, FolderOpen, HeartHandshake, PenTool } from "@lucide/vue";

const servicesData = [
    {
        title: "Pendaftaran Santri Baru",
        desc: "Layanan pendaftaran peserta didik atau santri baru terintegrasi secara online. Calon santri dapat mendaftar dari mana saja dengan mudah.",
        icon: PenTool,
    },
    {
        title: "Legalisir Dokumen",
        desc: "Pelayanan legalisir ijazah, transkrip nilai, dan dokumen administrasi lainnya bagi alumni Pondok Pesantren Ashhaburratib.",
        icon: CopyCheck,
    },
    {
        title: "Permohonan Surat Keterangan",
        desc: "Layanan permohonan surat keterangan aktif santri, surat rekomendasi, atau surat pindah/keluar bagi yang membutuhkan.",
        icon: FolderOpen,
    },
    {
        title: "Layanan Konseling",
        desc: "Konsultasi dan bimbingan psikologi bagi santri yang membutuhkan motivasi, penyelesaian masalah, atau arahan minat dan bakat.",
        icon: HeartHandshake,
    },
];
</script>

<template>
    <div class="space-y-8">
        <div>
            <h2
                class="text-3xl font-bold text-primary-950 dark:text-white mb-6 border-b border-primary-100 dark:border-primary-800 pb-4"
            >
                Layanan Administrasi
            </h2>
            <p class="text-gray-600 mb-8 leading-relaxed">
                Pondok Pesantren Ashhaburratib menyediakan berbagai jenis
                layanan administrasi untuk santri, wali santri, dan alumni demi
                mempermudah birokrasi dan memenuhi kebutuhan dokumen resmi.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                    v-for="(item, idx) in servicesData"
                    :key="idx"
                    :initial="{ opacity: 0, scale: 0.95 }"
                    :animate="{ opacity: 1, scale: 1 }"
                    :transition="{ delay: idx * 0.1 }"
                    class="bg-primary-50 dark:bg-primary-900 p-6 rounded-2xl border border-primary-100 dark:border-primary-700 hover:shadow-md transition-shadow group"
                >
                    <div
                        class="w-12 h-12 bg-white dark:bg-primary-900 rounded-xl flex items-center justify-center mb-4 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform shadow-sm"
                    >
                        <component :is="item.icon" class="w-6 h-6" />
                    </div>
                    <h3
                        class="text-lg font-bold text-primary-900 dark:text-white mb-2"
                    >
                        {{ item.title }}
                    </h3>
                    <p
                        class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                    >
                        {{ item.desc }}
                    </p>
                </motion.div>
            </div>
        </div>
    </div>
</template>
