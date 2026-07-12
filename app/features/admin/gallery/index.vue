<script setup lang="ts">
import {
    Plus,
    Edit2,
    Trash2,
    Upload,
    Video,
    Image as ImageIcon,
} from "@lucide/vue";
import { useAdminGalleryManagement } from "./hooks/useAdminGalleryManagement";

const {
    galleryItems,
    showModal,
    editingItem,
    form,
    filterType,
    openAdd,
    openEdit,
    handleUpload,
    saveItem,
    deleteItem,
} = await useAdminGalleryManagement();
</script>

<template>
    <div class="space-y-8 max-w-5xl">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-extrabold text-gray-800">
                    Galeri Foto & Video CMS
                </h1>
                <p class="text-gray-500 mt-1">
                    Kelola konten dokumentasi kegiatan pondok pesantren.
                </p>
            </div>
            <button
                @click="openAdd"
                class="flex items-center gap-2 px-5 py-3 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer font-sans"
            >
                <Plus class="w-4 h-4" /> Unggah Media Baru
            </button>
        </div>

        <!-- Filters -->
        <div class="flex border-b border-gray-200 gap-4">
            <button
                @click="filterType = 'ALL'"
                :class="[
                    'px-6 py-3 font-bold text-sm border-b-2 transition-all cursor-pointer',
                    filterType === 'ALL'
                        ? 'border-teal-600 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700',
                ]"
            >
                Semua Media
            </button>
            <button
                @click="filterType = 'IMAGE'"
                :class="[
                    'px-6 py-3 font-bold text-sm border-b-2 transition-all cursor-pointer',
                    filterType === 'IMAGE'
                        ? 'border-teal-600 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700',
                ]"
            >
                Foto
            </button>
            <button
                @click="filterType = 'VIDEO'"
                :class="[
                    'px-6 py-3 font-bold text-sm border-b-2 transition-all cursor-pointer',
                    filterType === 'VIDEO'
                        ? 'border-teal-600 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700',
                ]"
            >
                Video
            </button>
        </div>

        <!-- Media Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
                v-for="item in galleryItems?.filter(
                    (i) => filterType === 'ALL' || i.type === filterType,
                )"
                :key="item.id"
                class="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
                <div class="relative aspect-video bg-gray-100">
                    <img
                        :src="item.thumbnail"
                        class="w-full h-full object-cover"
                    />
                    <div
                        class="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white p-2 rounded-xl"
                    >
                        <ImageIcon
                            v-if="item.type === 'IMAGE'"
                            class="w-4 h-4"
                        />
                        <Video v-else class="w-4 h-4" />
                    </div>
                </div>
                <div class="p-5 grow flex flex-col justify-between">
                    <div>
                        <h4
                            class="font-bold text-gray-800 text-base leading-snug truncate"
                        >
                            {{ item.title }}
                        </h4>
                        <p
                            class="text-xs text-gray-550 mt-1 line-clamp-2 leading-relaxed"
                        >
                            {{ item.description }}
                        </p>
                    </div>
                    <div
                        class="flex gap-2 border-t border-gray-100 mt-4 pt-3 justify-end"
                    >
                        <button
                            @click="openEdit(item)"
                            class="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                        >
                            <Edit2 class="w-4 h-4" />
                        </button>
                        <button
                            @click="deleteItem(item.id)"
                            class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                            <Trash2 class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Upload/Edit Modal -->
        <div
            v-if="showModal"
            class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            @click.self="showModal = false"
        >
            <div
                class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4"
            >
                <h3
                    class="font-bold text-gray-800 text-lg border-b border-gray-100 pb-2"
                >
                    {{
                        editingItem ? "Edit Media Galeri" : "Unggah Media Baru"
                    }}
                </h3>
                <div class="space-y-3">
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Judul Media</label
                        >
                        <input
                            v-model="form.title"
                            type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Deskripsi Singkat</label
                        >
                        <textarea
                            v-model="form.description"
                            rows="2"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                        ></textarea>
                    </div>
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Jenis Media</label
                        >
                        <select
                            v-model="form.type"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                        >
                            <option value="IMAGE">Foto</option>
                            <option value="VIDEO">Video</option>
                        </select>
                    </div>

                    <div class="space-y-1">
                        <label
                            class="text-xs font-bold text-gray-500 uppercase"
                        >
                            {{
                                form.type === "IMAGE"
                                    ? "URL File Foto"
                                    : "URL File Video (YouTube/Lainnya)"
                            }}
                        </label>
                        <input
                            v-model="form.file"
                            type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    <div class="space-y-2">
                        <label
                            class="text-xs font-bold text-gray-500 uppercase block"
                            >Unggah File Baru</label
                        >
                        <label
                            class="flex items-center gap-3 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-xs font-semibold text-gray-600"
                        >
                            <Upload class="w-4 h-4 text-gray-400" />
                            Pilih Berkas
                            <input
                                type="file"
                                class="hidden"
                                @change="handleUpload($event, 'file')"
                            />
                        </label>
                    </div>

                    <!-- Video thumbnail settings -->
                    <div
                        v-if="form.type === 'VIDEO'"
                        class="space-y-3 pt-2 border-t border-gray-100"
                    >
                        <div class="space-y-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                                >URL Thumbnail Video</label
                            >
                            <input
                                v-model="form.thumbnail"
                                type="text"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                        <div class="space-y-2">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase block"
                                >Unggah Thumbnail Baru</label
                            >
                            <label
                                class="flex items-center gap-3 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-xs font-semibold text-gray-600"
                            >
                                <Upload class="w-4 h-4 text-gray-400" />
                                Pilih Thumbnail
                                <input
                                    type="file"
                                    class="hidden"
                                    accept="image/*"
                                    @change="handleUpload($event, 'thumbnail')"
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div
                    class="flex justify-end gap-3 border-t border-gray-100 pt-4"
                >
                    <button
                        @click="showModal = false"
                        class="px-4 py-2 text-gray-500 hover:bg-gray-55/70 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        @click="saveItem"
                        class="px-5 py-2.5 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
