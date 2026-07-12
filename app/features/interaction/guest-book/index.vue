<script setup lang="ts">
import { motion } from "motion-v";
import { User, Calendar } from "@lucide/vue";

const entries = [
    {
        name: "Ahmad Zainuddin",
        as: "Alumni 2018",
        date: "12 Mar 2026",
        msg: "Alhamdulillah asrama putra yang baru sangat nyaman. Bangga menjadi alumni Ashhaburratib. Sukses selalu.",
    },
    {
        name: "Budi Santoso",
        as: "Wali Santri",
        date: "05 Mar 2026",
        msg: "Pelayanan pendaftaran santri baru sangat informatif dan ramah. Terima kasih kepada panitia PSB.",
    },
    {
        name: "Siti Aminah",
        as: "Masyarakat Umum",
        date: "28 Feb 2026",
        msg: "Kajian rutin ahad kitab Hikam sangat menyejukkan hati. Terus syiarkan dakwah Islami.",
    },
];
</script>

<template>
    <div class="space-y-8">
        <div>
            <h2
                class="text-2xl font-bold text-primary-950 dark:text-white border-b border-primary-100 dark:border-primary-800 pb-4 mb-6"
            >
                Buku Tamu Pengunjung
            </h2>

            <!-- Form Add Entry -->
            <div
                class="bg-primary-50 dark:bg-primary-900/30 p-6 rounded-2xl border border-primary-100 dark:border-primary-800 mb-10"
            >
                <h3
                    class="font-bold text-primary-900 dark:text-white mb-4 text-sm"
                >
                    Isi Buku Tamu
                </h3>
                <div class="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Nama Anda"
                        class="w-full sm:w-1/3 px-4 py-2.5 rounded-xl border border-white dark:border-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-primary-950 text-sm shadow-sm"
                    />
                    <input
                        type="text"
                        placeholder="Asal/Instansi"
                        class="w-full sm:w-1/3 px-4 py-2.5 rounded-xl border border-white dark:border-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-primary-950 text-sm shadow-sm"
                    />
                    <input
                        type="text"
                        placeholder="Pesan singkat..."
                        class="w-full grow px-4 py-2.5 rounded-xl border border-white dark:border-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-primary-950 text-sm shadow-sm"
                    />
                    <button
                        class="bg-primary-600 hover:bg-primary-500 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md text-sm transition-colors whitespace-nowrap"
                    >
                        Kirim
                    </button>
                </div>
            </div>

            <!-- Entries List -->
            <div class="space-y-4">
                <h3
                    class="font-bold text-primary-900 dark:text-white mb-4 text-sm"
                >
                    Pesan Terbaru
                </h3>
                <motion.div
                    v-for="(entry, idx) in entries"
                    :key="idx"
                    :initial="{ opacity: 0, y: 10 }"
                    :animate="{ opacity: 1, y: 0 }"
                    :transition="{ delay: idx * 0.1 }"
                    class="p-5 bg-white dark:bg-primary-900/50 rounded-2xl border border-primary-100 dark:border-primary-800 flex gap-4"
                >
                    <div
                        class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-primary-600 dark:text-primary-300 shrink-0"
                    >
                        <User class="w-5 h-5" />
                    </div>
                    <div class="grow">
                        <div
                            class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1"
                        >
                            <h4
                                class="font-bold text-gray-900 dark:text-white text-sm"
                            >
                                {{ entry.name }}
                                <span
                                    class="font-normal text-xs text-primary-500 ml-2"
                                >
                                    ({{ entry.as }})
                                </span>
                            </h4>
                            <span
                                class="text-xs text-gray-400 flex items-center gap-1 mt-1 sm:mt-0"
                            >
                                <Calendar class="w-3 h-3" /> {{ entry.date }}
                            </span>
                        </div>
                        <p
                            class="text-gray-600 dark:text-gray-300 text-sm italic"
                        >
                            {{ entry.msg }}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    </div>
</template>
