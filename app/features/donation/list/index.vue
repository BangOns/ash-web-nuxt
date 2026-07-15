<script setup lang="ts">
import { useDonationApi } from "~/composables/useApi";

const donationApi = useDonationApi();
const { data: campaigns, pending, error } = await donationApi.getCampaigns();

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(val);
};

const calculatePercentage = (collected: number, target: number) => {
    if (!target) return 0;
    return Math.min(100, Math.round((collected / target) * 100));
};

const getDaysRemaining = (endDateStr: string) => {
    const end = new Date(endDateStr);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} Hari lagi` : "Selesai";
};
</script>

<template>
    <div class="max-w-6xl mx-auto pb-16">
        <div v-if="pending" class="flex justify-center py-12">
            <div
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B4A3F]"
            ></div>
        </div>

        <div
            v-else-if="error"
            class="text-center py-12 bg-white/90 backdrop-blur-md rounded-3xl border border-red-150 p-8 shadow-md shadow-teal-900/5"
        >
            <p class="text-red-650 font-bold">Gagal memuat data donasi.</p>
            <p class="text-gray-500 text-sm mt-1">
                Silakan coba beberapa saat lagi.
            </p>
        </div>

        <div
            v-else-if="!campaigns || campaigns.length === 0"
            class="text-center py-16 bg-white/90 backdrop-blur-md rounded-3xl border border-gray-150 p-8 shadow-md shadow-teal-900/5"
        >
            <p class="text-gray-600 font-bold text-lg">
                Belum ada program donasi aktif saat ini.
            </p>
            <p class="text-gray-500 text-sm mt-1">
                Kembali lagi nanti untuk melihat program terbaru kami.
            </p>
        </div>

        <div
            v-else
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            <div
                v-for="campaign in campaigns"
                :key="campaign.id"
                class="bg-white/90 backdrop-blur-md rounded-3xl border border-gray-150 shadow-md shadow-teal-900/5 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 border-white hover:scale-[1.01]"
            >
                <!-- Card Image & Status -->
                <div class="relative aspect-video w-full bg-gray-100 shrink-0">
                    <img
                        :src="campaign.banner"
                        class="w-full h-full object-cover"
                        alt="Banner Campaign"
                    />
                    <div class="absolute top-4 left-4">
                        <span
                            v-if="campaign.status === 'CLOSED'"
                            class="bg-red-500 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider"
                        >
                            Selesai
                        </span>
                        <span
                            v-else
                            class="bg-teal-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider animate-pulse"
                        >
                            Aktif
                        </span>
                    </div>
                </div>

                <!-- Card Content -->
                <div class="p-6 grow flex flex-col justify-between">
                    <div class="space-y-4">
                        <h3
                            class="font-bold text-gray-800 text-lg lg:text-xl leading-snug line-clamp-2"
                        >
                            <NuxtLink
                                :to="`/donasi/${campaign.slug}`"
                                class="hover:text-[#0B4A3F] transition-colors"
                            >
                                {{ campaign.title }}
                            </NuxtLink>
                        </h3>

                        <p
                            class="text-gray-500 text-sm line-clamp-3 leading-relaxed"
                        >
                            {{ campaign.description }}
                        </p>
                    </div>

                    <!-- Progress & Numbers -->
                    <div class="mt-6 space-y-4 border-t border-gray-100 pt-4">
                        <!-- Progress Bar -->
                        <div class="space-y-1.5">
                            <div
                                class="flex justify-between items-center text-xs font-bold"
                            >
                                <span class="text-teal-650">Kolektif</span>
                                <span class="text-gray-700"
                                    >{{
                                        calculatePercentage(
                                            campaign.collectedAmount,
                                            campaign.targetAmount,
                                        )
                                    }}%</span
                                >
                            </div>
                            <div
                                class="w-full bg-gray-150 h-2 rounded-full overflow-hidden"
                            >
                                <div
                                    class="bg-primary-500 h-full rounded-full transition-all duration-550"
                                    :style="`width: ${calculatePercentage(campaign.collectedAmount, campaign.targetAmount)}%`"
                                ></div>
                            </div>
                        </div>

                        <!-- Amounts -->
                        <div class="flex justify-between items-center text-xs">
                            <div>
                                <p class="text-gray-400 font-medium">
                                    Terkumpul
                                </p>
                                <p
                                    class="font-extrabold text-[#0B4A3F] text-sm mt-0.5"
                                >
                                    {{
                                        formatCurrency(campaign.collectedAmount)
                                    }}
                                </p>
                            </div>
                            <div class="text-right">
                                <p class="text-gray-400 font-medium">Target</p>
                                <p
                                    class="font-bold text-gray-700 text-sm mt-0.5"
                                >
                                    {{ formatCurrency(campaign.targetAmount) }}
                                </p>
                            </div>
                        </div>

                        <!-- Footer Details -->
                        <div
                            class="flex justify-between items-center text-xs font-semibold text-gray-500 border-t border-gray-50/80 pt-3"
                        >
                            <span
                                >Berakhir:
                                {{
                                    new Date(
                                        campaign.endDate,
                                    ).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                    })
                                }}</span
                            >
                            <span
                                class="text-teal-650 font-bold bg-teal-50 px-2 py-0.5 rounded-md"
                            >
                                {{ getDaysRemaining(campaign.endDate) }}
                            </span>
                        </div>

                        <!-- Button Action -->
                        <NuxtLink
                            :to="`/donasi/${campaign.slug}`"
                            class="w-full block text-center py-3 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer mt-4"
                        >
                            {{
                                campaign.status === "CLOSED"
                                    ? "Lihat Detail Program"
                                    : "Sedekah Sekarang"
                            }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
