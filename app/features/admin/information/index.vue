<script setup lang="ts">
import { Plus, Edit2, Trash2 } from "@lucide/vue";
import { useAdminInformationManagement } from "./hooks/useAdminInformationManagement";

const {
    announcements,
    showAnnModal,
    editingAnn,
    annForm,
    agendaList,
    showAgendaModal,
    editingAgenda,
    agendaForm,
    activeTab,
    openAddAnn,
    openEditAnn,
    saveAnn,
    deleteAnn,
    openAddAgenda,
    openEditAgenda,
    saveAgenda,
    deleteAgenda,
} = await useAdminInformationManagement();
</script>

<template>
    <div class="space-y-8 max-w-5xl">
        <div>
            <h1 class="text-3xl font-extrabold text-gray-800 font-sans">
                Informasi CMS
            </h1>
            <p class="text-gray-500 mt-1 font-sans">
                Manajemen publikasi Pengumuman Sekolah dan Agenda Kegiatan
                Pondok.
            </p>
        </div>

        <!-- Tabs Header -->
        <div class="flex border-b border-gray-200 gap-4">
            <button
                @click="activeTab = 'announcements'"
                :class="[
                    'px-6 py-3 font-bold text-sm border-b-2 transition-all cursor-pointer',
                    activeTab === 'announcements'
                        ? 'border-teal-600 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700',
                ]"
            >
                Pengumuman
            </button>
            <button
                @click="activeTab = 'agenda'"
                :class="[
                    'px-6 py-3 font-bold text-sm border-b-2 transition-all cursor-pointer',
                    activeTab === 'agenda'
                        ? 'border-teal-600 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700',
                ]"
            >
                Agenda Kegiatan
            </button>
        </div>

        <!-- Tab Contents -->
        <div class="mt-6">
            <!-- 1. PENGUMUMAN -->
            <div v-if="activeTab === 'announcements'" class="space-y-6">
                <div
                    class="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs"
                >
                    <div
                        class="flex justify-between items-center border-b border-gray-100 pb-4 mb-4"
                    >
                        <h3 class="font-extrabold text-gray-800 text-lg">
                            Daftar Pengumuman
                        </h3>
                        <button
                            @click="openAddAnn"
                            class="flex items-center gap-2 px-4 py-2 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer font-sans"
                        >
                            <Plus class="w-4 h-4" /> Tambah Pengumuman
                        </button>
                    </div>

                    <div class="divide-y divide-gray-100">
                        <div
                            v-if="!announcements?.length"
                            class="p-8 text-center text-gray-400 text-sm"
                        >
                            Belum ada pengumuman yang dibuat.
                        </div>
                        <div
                            v-for="ann in announcements"
                            :key="ann.id"
                            class="py-6 flex justify-between items-start"
                        >
                            <div class="space-y-1 pr-6 max-w-3xl">
                                <h4 class="font-bold text-gray-800 text-base">
                                    {{ ann.title }}
                                </h4>
                                <p class="text-xs text-gray-400 font-medium">
                                    Diposting pada:
                                    {{
                                        new Date(
                                            ann.createdAt,
                                        ).toLocaleDateString("id-ID")
                                    }}
                                </p>
                                <p
                                    class="text-sm text-gray-500 leading-relaxed mt-2"
                                >
                                    {{ ann.description }}
                                </p>
                            </div>
                            <div class="flex gap-2 shrink-0">
                                <button
                                    @click="openEditAnn(ann)"
                                    class="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                                >
                                    <Edit2 class="w-4 h-4" />
                                </button>
                                <button
                                    @click="deleteAnn(ann.id)"
                                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                >
                                    <Trash2 class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2. AGENDA KEGIATAN -->
            <div v-if="activeTab === 'agenda'" class="space-y-6">
                <div
                    class="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs"
                >
                    <div
                        class="flex justify-between items-center border-b border-gray-100 pb-4 mb-4"
                    >
                        <h3 class="font-extrabold text-gray-800 text-lg">
                            Agenda Mendatang
                        </h3>
                        <button
                            @click="openAddAgenda"
                            class="flex items-center gap-2 px-4 py-2 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer font-sans"
                        >
                            <Plus class="w-4 h-4" /> Tambah Agenda
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                            v-for="agenda in agendaList"
                            :key="agenda.id"
                            class="bg-gray-50 border border-gray-200/60 p-6 rounded-2xl flex flex-col justify-between"
                        >
                            <div>
                                <span
                                    class="text-[10px] font-bold bg-teal-50 text-teal-700 px-2.5 py-1 rounded-lg"
                                >
                                    {{ agenda.time || "Waktu Fleksibel" }}
                                </span>
                                <h4
                                    class="font-bold text-gray-800 text-base mt-2 mb-1"
                                >
                                    {{ agenda.title }}
                                </h4>
                                <p
                                    class="text-xs text-teal-600 font-semibold mb-2"
                                >
                                    Tempat: {{ agenda.location }}
                                </p>
                                <p class="text-xs text-gray-400">
                                    Tanggal:
                                    {{
                                        new Date(
                                            agenda.startDate,
                                        ).toLocaleDateString("id-ID")
                                    }}
                                    -
                                    {{
                                        new Date(
                                            agenda.endDate,
                                        ).toLocaleDateString("id-ID")
                                    }}
                                </p>
                                <p
                                    class="text-xs text-gray-505 mt-2 leading-relaxed"
                                >
                                    {{ agenda.description }}
                                </p>
                            </div>
                            <div
                                class="flex gap-2 border-t border-gray-200/50 mt-4 pt-3 justify-end"
                            >
                                <button
                                    @click="openEditAgenda(agenda)"
                                    class="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                                >
                                    <Edit2 class="w-4 h-4" />
                                </button>
                                <button
                                    @click="deleteAgenda(agenda.id)"
                                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                >
                                    <Trash2 class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modals -->
        <!-- 1. Announcement Modal -->
        <div
            v-if="showAnnModal"
            class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            @click.self="showAnnModal = false"
        >
            <div
                class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4"
            >
                <h3
                    class="font-bold text-gray-800 text-lg border-b border-gray-100 pb-2"
                >
                    {{
                        editingAnn ? "Edit Pengumuman" : "Buat Pengumuman Baru"
                    }}
                </h3>
                <div class="space-y-3">
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Judul Pengumuman</label
                        >
                        <input
                            v-model="annForm.title"
                            type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Isi Pengumuman</label
                        >
                        <textarea
                            v-model="annForm.description"
                            rows="5"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                        ></textarea>
                    </div>
                </div>
                <div
                    class="flex justify-end gap-3 border-t border-gray-100 pt-4"
                >
                    <button
                        @click="showAnnModal = false"
                        class="px-4 py-2 text-gray-500 hover:bg-gray-55/70 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        @click="saveAnn"
                        class="px-5 py-2.5 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>

        <!-- 2. Agenda Modal -->
        <div
            v-if="showAgendaModal"
            class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            @click.self="showAgendaModal = false"
        >
            <div
                class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4"
            >
                <h3
                    class="font-bold text-gray-800 text-lg border-b border-gray-100 pb-2"
                >
                    {{
                        editingAgenda
                            ? "Edit Agenda"
                            : "Buat Agenda Kegiatan Baru"
                    }}
                </h3>
                <div class="space-y-3">
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Judul Kegiatan</label
                        >
                        <input
                            v-model="agendaForm.title"
                            type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Deskripsi Singkat</label
                        >
                        <textarea
                            v-model="agendaForm.description"
                            rows="3"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                        ></textarea>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                                >Tempat / Lokasi</label
                            >
                            <input
                                v-model="agendaForm.location"
                                type="text"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div class="space-y-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                                >Waktu / Jam</label
                            >
                            <input
                                v-model="agendaForm.time"
                                type="text"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                placeholder="Misal: 08:00 - Selesai"
                            />
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                                >Tanggal Mulai</label
                            >
                            <input
                                v-model="agendaForm.startDate"
                                type="date"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div class="space-y-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                                >Tanggal Selesai</label
                            >
                            <input
                                v-model="agendaForm.endDate"
                                type="date"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>
                </div>
                <div
                    class="flex justify-end gap-3 border-t border-gray-100 pt-4"
                >
                    <button
                        @click="showAgendaModal = false"
                        class="px-4 py-2 text-gray-500 hover:bg-gray-55/70 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        @click="saveAgenda"
                        class="px-5 py-2.5 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
