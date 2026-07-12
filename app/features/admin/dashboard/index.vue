<script setup lang="ts">
import { FileText, Eye, Bell, Calendar, Image, Inbox } from "@lucide/vue";
import StatCard from "~/components/ui/StatCard.vue";
const { data: stats } = await useStatsApi().getStats();
</script>

<template>
    <div class="space-y-8">
        <div>
            <h1 class="text-3xl font-extrabold text-gray-800">
                Dashboard Ringkasan
            </h1>
            <p class="text-gray-500 mt-1">
                Status dan aktivitas terkini website Pondok Pesantren.
            </p>
        </div>

        <!-- Stats Grid -->
        <section class="space-y-5">
            <section class="flex justify-around">
                <StatCard
                    title="Total Berita"
                    :value="stats?.totalNews ?? 0"
                    :icon="FileText"
                    color="teal"
                />
                <StatCard
                    title="Total Views"
                    :value="stats?.totalViews ?? 0"
                    :icon="Eye"
                    color="blue"
                />
                <StatCard
                    title="Pengumuman"
                    :value="stats?.totalAnnouncements ?? 0"
                    :icon="Bell"
                    color="amber"
                />
            </section>
            <section class="flex justify-around">
                <StatCard
                    title="Agenda"
                    :value="stats?.totalAgenda ?? 0"
                    :icon="Calendar"
                    color="purple"
                />
                <StatCard
                    title="Galeri"
                    :value="stats?.totalGallery ?? 0"
                    :icon="Image"
                    color="pink"
                />
                <StatCard
                    title="Pesan Masuk"
                    :value="stats?.totalMessages ?? 0"
                    :icon="Inbox"
                    color="emerald"
                />
            </section>
        </section>

        <!-- Data Tables Grid -->
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <!-- Popular News -->
            <div
                class="bg-white border border-gray-200 rounded-3xl shadow-xs overflow-hidden"
            >
                <div
                    class="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50"
                >
                    <h3 class="font-bold text-gray-800">Berita Terpopuler</h3>
                    <span
                        class="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full uppercase"
                        >Top 5</span
                    >
                </div>
                <div class="divide-y divide-gray-100">
                    <div
                        v-if="!stats?.popularNews?.length"
                        class="p-8 text-center text-gray-400 text-sm"
                    >
                        Belum ada data berita.
                    </div>
                    <div
                        v-for="news in stats?.popularNews"
                        :key="news.id"
                        class="p-6 flex items-center justify-between hover:bg-gray-50/40 transition-all"
                    >
                        <div class="min-w-0 grow pr-4">
                            <h4
                                class="font-bold text-gray-800 text-sm truncate"
                            >
                                {{ news.title }}
                            </h4>
                            <p class="text-xs text-gray-400 mt-1">
                                {{ news.category }} •
                                {{
                                    new Date(news.createdAt).toLocaleDateString(
                                        "id-ID",
                                    )
                                }}
                            </p>
                        </div>
                        <div
                            class="flex items-center gap-2 text-teal-600 font-bold bg-teal-50/70 px-3 py-1.5 rounded-xl shrink-0"
                        >
                            <Eye class="w-4 h-4" />
                            <span class="text-sm">{{ news.totalViews }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Messages -->
            <div
                class="bg-white border border-gray-200 rounded-3xl shadow-xs overflow-hidden"
            >
                <div
                    class="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50"
                >
                    <h3 class="font-bold text-gray-800">Pesan Masuk Terbaru</h3>
                    <NuxtLink
                        to="/admin/messages"
                        class="text-xs font-bold text-teal-600 hover:underline"
                    >
                        Lihat Semua Inbox
                    </NuxtLink>
                </div>
                <div class="divide-y divide-gray-100">
                    <div
                        v-if="!stats?.recentMessages?.length"
                        class="p-8 text-center text-gray-400 text-sm"
                    >
                        Tidak ada pesan masuk.
                    </div>
                    <div
                        v-for="msg in stats?.recentMessages"
                        :key="msg.id"
                        class="p-6 flex items-start justify-between hover:bg-gray-50/40 transition-all"
                    >
                        <div class="min-w-0 grow pr-4">
                            <div class="flex items-center gap-2">
                                <h4 class="font-bold text-gray-800 text-sm">
                                    {{ msg.name }}
                                </h4>
                                <span
                                    :class="[
                                        'text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase',
                                        msg.status === 'UNREAD'
                                            ? 'bg-red-100 text-red-700'
                                            : 'bg-gray-100 text-gray-600',
                                    ]"
                                >
                                    {{
                                        msg.status === "UNREAD"
                                            ? "Baru"
                                            : "Dibaca"
                                    }}
                                </span>
                            </div>
                            <h5
                                class="text-xs font-semibold text-gray-600 mt-1 truncate"
                            >
                                {{ msg.subject }}
                            </h5>
                            <p
                                class="text-xs text-gray-400 mt-1.5 line-clamp-2 italic"
                            >
                                "{{ msg.message }}"
                            </p>
                        </div>
                        <span
                            class="text-[10px] text-gray-400 shrink-0 font-medium mt-1"
                        >
                            {{
                                new Date(msg.createdAt).toLocaleDateString(
                                    "id-ID",
                                )
                            }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
