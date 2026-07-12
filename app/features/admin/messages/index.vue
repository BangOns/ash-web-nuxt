<script setup lang="ts">
import { Trash2, Eye, EyeOff, Mail, Phone, Calendar } from "@lucide/vue";
import { useAdminMessagesManagement } from "./hooks/useAdminMessagesManagement";

const { messages, selectedMessage, viewMessage, toggleStatus, deleteMessage } =
    await useAdminMessagesManagement();
</script>

<template>
    <div class="space-y-8 max-w-5xl">
        <div>
            <h1 class="text-3xl font-extrabold text-gray-800">
                Pesan Masuk CMS
            </h1>
            <p class="text-gray-500 mt-1">
                Daftar masukan, saran, dan pertanyaan dari pengunjung website.
            </p>
        </div>

        <!-- Inbox Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left side: Message List -->
            <div
                class="lg:col-span-1 bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden flex flex-col max-h-150"
            >
                <div class="p-5 border-b border-gray-150 bg-gray-50/50">
                    <h3 class="font-bold text-gray-800 text-sm">
                        Kotak Masuk ({{ messages?.length ?? 0 }})
                    </h3>
                </div>
                <div class="grow overflow-y-auto divide-y divide-gray-100">
                    <div
                        v-if="!messages?.length"
                        class="p-8 text-center text-gray-400 text-xs"
                    >
                        Belum ada pesan masuk.
                    </div>
                    <div
                        v-for="msg in messages"
                        :key="msg.id"
                        @click="viewMessage(msg)"
                        :class="[
                            'p-5 cursor-pointer hover:bg-gray-50/40 transition-colors text-left flex flex-col gap-1',
                            selectedMessage?.id === msg.id
                                ? 'bg-teal-50/40 border-l-4 border-teal-600'
                                : '',
                            msg.status === 'UNREAD' ? 'bg-amber-50/20' : '',
                        ]"
                    >
                        <div class="flex justify-between items-center">
                            <span
                                class="font-bold text-gray-800 text-xs truncate max-w-30"
                                >{{ msg.name }}</span
                            >
                            <span class="text-[9px] text-gray-400">{{
                                new Date(msg.createdAt).toLocaleDateString(
                                    "id-ID",
                                )
                            }}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <h4
                                :class="[
                                    'text-xs truncate max-w-40',
                                    msg.status === 'UNREAD'
                                        ? 'font-bold text-gray-900'
                                        : 'text-gray-650',
                                ]"
                            >
                                {{ msg.subject }}
                            </h4>
                            <span
                                v-if="msg.status === 'UNREAD'"
                                class="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"
                            ></span>
                        </div>
                        <p
                            class="text-[10px] text-gray-455 truncate mt-0.5 leading-relaxed"
                        >
                            {{ msg.message }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Right side: Message Details -->
            <div
                class="lg:col-span-2 bg-white border border-gray-200 rounded-3xl shadow-sm p-8 flex flex-col justify-between min-h-100"
            >
                <div
                    v-if="!selectedMessage"
                    class="grow flex flex-col items-center justify-center text-gray-455 space-y-3"
                >
                    <Mail class="w-12 h-12 text-gray-300" />
                    <p class="text-sm font-medium">
                        Pilih pesan di sebelah kiri untuk membaca detail
                    </p>
                </div>

                <div v-else class="space-y-6 grow">
                    <!-- Header detail -->
                    <div
                        class="flex justify-between items-start border-b border-gray-100 pb-5"
                    >
                        <div>
                            <h2
                                class="text-lg font-bold text-gray-800 leading-snug"
                            >
                                {{ selectedMessage.subject }}
                            </h2>
                            <div
                                class="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-2 font-medium"
                            >
                                <span class="flex items-center gap-1.5">
                                    <Mail class="w-3.5 h-3.5 text-gray-400" />
                                    {{ selectedMessage.email }}
                                </span>
                                <span
                                    v-if="selectedMessage.phone"
                                    class="flex items-center gap-1.5"
                                >
                                    <Phone class="w-3.5 h-3.5 text-gray-400" />
                                    {{ selectedMessage.phone }}
                                </span>
                                <span class="flex items-center gap-1.5">
                                    <Calendar
                                        class="w-3.5 h-3.5 text-gray-400"
                                    />
                                    {{
                                        new Date(
                                            selectedMessage.createdAt,
                                        ).toLocaleString("id-ID", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })
                                    }}
                                </span>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <span
                                :class="[
                                    'text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wide',
                                    selectedMessage.status === 'UNREAD'
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-emerald-100 text-emerald-800',
                                ]"
                            >
                                {{
                                    selectedMessage.status === "UNREAD"
                                        ? "Baru"
                                        : "Dibaca"
                                }}
                            </span>
                        </div>
                    </div>

                    <!-- Body message -->
                    <div
                        class="text-sm text-gray-655 leading-relaxed whitespace-pre-line bg-gray-50/50 p-6 rounded-2xl border border-gray-200/50"
                    >
                        {{ selectedMessage.message }}
                    </div>
                </div>

                <!-- Footer actions -->
                <div
                    v-if="selectedMessage"
                    class="flex justify-between items-center border-t border-gray-100 pt-6 mt-6 shrink-0"
                >
                    <div class="flex gap-2">
                        <button
                            @click="toggleStatus(selectedMessage)"
                            class="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                        >
                            <component
                                :is="
                                    selectedMessage.status === 'READ'
                                        ? EyeOff
                                        : Eye
                                "
                                class="w-4 h-4 text-gray-500"
                            />
                            Tandai
                            {{
                                selectedMessage.status === "READ"
                                    ? "Belum Dibaca"
                                    : "Sudah Dibaca"
                            }}
                        </button>
                    </div>
                    <button
                        @click="deleteMessage(selectedMessage.id)"
                        class="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-655 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                        <Trash2 class="w-4 h-4 text-red-600" />
                        Hapus Pesan
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
