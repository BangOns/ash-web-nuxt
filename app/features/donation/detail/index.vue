<script setup lang="ts">
import { useRoute } from "vue-router";
import { useDonationApi } from "~/composables/useApi";
import { ArrowLeft, MessageCircle } from "@lucide/vue";

const route = useRoute();
const slug = route.params.slug as string;

const donationApi = useDonationApi();
const {
    data: campaign,
    pending,
    error,
} = await donationApi.getSingleCampaign(slug);

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

const getWhatsAppLink = (c: any) => {
    if (!c) return "#";
    let text = c.whatsappTemplate || "";

    // Replace placeholders if any
    text = text
        .replace(/\[JUDUL\]/gi, c.title)
        .replace(/\[PROGRAM\]/gi, c.title)
        .replace(/\{title\}/gi, c.title);

    // Clean phone number (remove non-digits, replace leading 0 with 62)
    let phone = c.whatsappNumber.replace(/\D/g, "");
    if (phone.startsWith("0")) {
        phone = "62" + phone.slice(1);
    }

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};
</script>

<template>
    <div class="max-w-4xl mx-auto space-y-8 pb-16">
        <!-- Back Link -->
        <NuxtLink
            to="/donasi"
            class="inline-flex items-center gap-2 text-sm font-semibold text-teal-650 hover:text-[#0B4A3F] transition-colors"
        >
            <ArrowLeft class="w-4 h-4" /> Kembali ke Daftar Program
        </NuxtLink>

        <div v-if="pending" class="flex justify-center py-12">
            <div
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B4A3F]"
            ></div>
        </div>

        <div
            v-else-if="error || !campaign"
            class="text-center py-12 bg-white rounded-3xl border border-red-100 p-8"
        >
            <p class="text-red-650 font-bold">
                Program donasi tidak ditemukan.
            </p>
            <p class="text-gray-500 text-sm mt-1">
                Pastikan URL yang Anda tuju sudah benar.
            </p>
        </div>

        <div
            v-else
            class="bg-white rounded-3xl border border-gray-200 shadow-xs overflow-hidden"
        >
            <!-- Banner Image -->
            <div
                class="relative w-full aspect-video md:aspect-21/9 bg-gray-100 border-b border-gray-200"
            >
                <img
                    :src="campaign.banner"
                    class="w-full h-full object-cover"
                    alt="Banner Program"
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
                        class="bg-teal-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider"
                    >
                        Aktif
                    </span>
                </div>
            </div>

            <!-- Detail Contents -->
            <div class="p-6 md:p-8 space-y-8">
                <!-- Header info -->
                <div class="space-y-4">
                    <h1
                        class="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight leading-snug"
                    >
                        {{ campaign.title }}
                    </h1>

                    <div
                        class="flex flex-wrap gap-4 text-xs font-bold text-gray-500"
                    >
                        <span
                            >Dimulai:
                            {{
                                new Date(campaign.startDate).toLocaleDateString(
                                    "id-ID",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    },
                                )
                            }}</span
                        >
                        <span>•</span>
                        <span
                            >Berakhir:
                            {{
                                new Date(campaign.endDate).toLocaleDateString(
                                    "id-ID",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    },
                                )
                            }}</span
                        >
                        <span>•</span>
                        <span class="text-teal-650">{{
                            getDaysRemaining(campaign.endDate)
                        }}</span>
                    </div>
                </div>

                <!-- Progress Widget (Stays fixed beside or inside layout) -->
                <div
                    class="bg-teal-50/50 border border-teal-100 rounded-2xl p-6 space-y-6"
                >
                    <div class="space-y-2">
                        <div
                            class="flex justify-between items-center text-sm font-bold"
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
                            class="w-full bg-gray-200 h-3 rounded-full overflow-hidden"
                        >
                            <div
                                class="bg-primary-500 h-full rounded-full transition-all duration-550"
                                :style="`width: ${calculatePercentage(campaign.collectedAmount, campaign.targetAmount)}%`"
                            ></div>
                        </div>
                    </div>

                    <!-- Amounts & Target -->
                    <div class="grid grid-cols-2 gap-6 text-sm">
                        <div>
                            <p class="text-gray-400 font-medium">
                                Dana Terkumpul
                            </p>
                            <p
                                class="font-extrabold text-[#0B4A3F] text-xl mt-1"
                            >
                                {{ formatCurrency(campaign.collectedAmount) }}
                            </p>
                        </div>
                        <div class="text-right">
                            <p class="text-gray-400 font-medium">
                                Target Donasi
                            </p>
                            <p class="font-bold text-gray-700 text-xl mt-1">
                                {{ formatCurrency(campaign.targetAmount) }}
                            </p>
                        </div>
                    </div>

                    <!-- Action Button -->
                    <div class="pt-2">
                        <a
                            v-if="campaign.status !== 'CLOSED'"
                            :href="getWhatsAppLink(campaign)"
                            target="_blank"
                            class="w-full flex items-center justify-center gap-3 py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition-all shadow-md cursor-pointer text-base text-center"
                        >
                            <MessageCircle class="w-5 h-5 fill-current" />
                            Sedekah Sekarang (Hubungi via WhatsApp)
                        </a>
                        <div
                            v-else
                            class="w-full text-center py-4 bg-gray-250 text-gray-500 font-extrabold rounded-xl select-none"
                        >
                            Program Donasi Ini Sudah Selesai / Ditutup
                        </div>
                    </div>
                </div>

                <!-- Campaign full description -->
                <div class="space-y-4 border-t border-gray-100 pt-6">
                    <h3 class="text-lg font-bold text-gray-800">
                        Tentang Program Ini
                    </h3>
                    <div
                        class="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap"
                    >
                        {{ campaign.description }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
