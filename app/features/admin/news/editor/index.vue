<script setup lang="ts">
import { ArrowLeft, Save, Upload, Eye } from "@lucide/vue";
import { useAdminNewsEditorManagement } from "../hooks/useAdminNewsEditorManagement";

const {
    newsId,
    form,
    loading,
    saving,
    previewMode,
    generateSlug,
    handleUpload,
    saveNews,
} = await useAdminNewsEditorManagement();
</script>

<template>
    <div class="space-y-6 max-w-4xl">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
                <NuxtLink
                    to="/admin/news"
                    class="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-xs cursor-pointer"
                >
                    <ArrowLeft class="w-5 h-5 text-gray-600" />
                </NuxtLink>
                <div>
                    <h1 class="text-2xl font-extrabold text-gray-800">
                        {{ newsId ? "Edit Artikel" : "Tulis Artikel Baru" }}
                    </h1>
                    <p class="text-gray-500 text-xs mt-0.5">
                        {{
                            newsId
                                ? "Ubah konten berita dan publikasikan perubahan."
                                : "Tulis berita menarik dan edukatif."
                        }}
                    </p>
                </div>
            </div>
            <div class="flex gap-3">
                <button
                    class="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-55 text-gray-700 font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                    @click="previewMode = !previewMode"
                >
                    <Eye class="w-4 h-4" />
                    {{ previewMode ? "Mode Edit" : "Pratinjau" }}
                </button>
                <button
                    :disabled="saving"
                    class="flex items-center gap-2 px-5 py-2.5 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer disabled:bg-gray-400"
                    @click="saveNews"
                >
                    <Save class="w-4 h-4" />
                    {{ saving ? "Menyimpan..." : "Simpan Berita" }}
                </button>
            </div>
        </div>

        <div v-if="loading" class="text-center py-12 text-gray-500">
            Memuat data artikel...
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column: Form Editor or Preview -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Preview Mode -->
                <div
                    v-if="previewMode"
                    class="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6"
                >
                    <img
                        :src="
                            form.thumbnail ||
                            'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800'
                        "
                        class="w-full aspect-video object-cover rounded-2xl bg-gray-100"
                    >
                    <h1
                        class="text-2xl font-extrabold text-gray-805 leading-snug"
                    >
                        {{ form.title || "Judul Artikel" }}
                    </h1>
                    <div class="flex items-center gap-2 text-xs text-gray-400">
                        <span>Kategori: {{ form.category }}</span>
                        <span>•</span>
                        <span>Status: {{ form.status }}</span>
                    </div>
                    <blockquote
                        class="border-l-4 border-teal-500 pl-4 py-1 text-gray-650 font-medium italic"
                    >
                        {{ form.excerpt || "Kutipan singkat berita..." }}
                    </blockquote>
                    <div
                        class="prose prose-teal max-w-none text-gray-600 text-sm leading-relaxed"
                        v-html="
                            sanitizeHtml(
                                form.content ||
                                    '<p>Konten artikel akan tampil di sini...</p>'
                            )
                        "
                    />
                </div>

                <!-- Editor Mode -->
                <div
                    v-else
                    class="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6"
                >
                    <div class="space-y-1">
                        <label
                            class="text-xs font-bold text-gray-500 uppercase"
                        >
                            Judul Artikel
                        </label>
                        <input
                            v-model="form.title"
                            type="text"
                            required
                            placeholder="Contoh: Penerimaan Santri Baru Gelombang 2"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            @input="generateSlug"
                        >
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                            >
                                Slug Rute (Url)
                            </label>
                            <input
                                v-model="form.slug"
                                type="text"
                                required
                                placeholder="penerimaan-santri-baru-gel-2"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                        </div>
                        <div class="space-y-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                            >
                                Kategori
                            </label>
                            <select
                                v-model="form.category"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                            >
                                <option value="Pendaftaran">Pendaftaran</option>
                                <option value="Kegiatan">Kegiatan</option>
                                <option value="Prestasi">Prestasi</option>
                                <option value="Umum">Umum</option>
                            </select>
                        </div>
                    </div>

                    <div class="space-y-1">
                        <label
                            class="text-xs font-bold text-gray-500 uppercase"
                        >
                            Kutipan Singkat (Excerpt)
                        </label>
                        <textarea
                            v-model="form.excerpt"
                            rows="2"
                            placeholder="Berikan rangkuman singkat dari berita ini..."
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                        />
                    </div>

                    <!-- HTML content editor -->
                    <div class="space-y-1">
                        <div class="flex justify-between items-center mb-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                            >
                                Isi Artikel (Mendukung HTML)
                            </label>
                            <div class="flex gap-2">
                                <button
                                    type="button"
                                    class="px-2.5 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-lg hover:bg-gray-200 cursor-pointer"
                                    @click="
                                        form.content += '<h3>Sub Judul</h3>'
                                    "
                                >
                                    H3
                                </button>
                                <button
                                    type="button"
                                    class="px-2.5 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-lg hover:bg-gray-200 cursor-pointer"
                                    @click="
                                        form.content +=
                                            '<p>Paragraf baru...</p>'
                                    "
                                >
                                    P
                                </button>
                                <button
                                    type="button"
                                    class="px-2.5 py-1 bg-gray-100 text-gray-700 text-[10px] font-bold rounded-lg hover:bg-gray-200 cursor-pointer"
                                    @click="
                                        form.content +=
                                            '<strong>Teks Tebal</strong>'
                                    "
                                >
                                    B
                                </button>
                            </div>
                        </div>
                        <textarea
                            v-model="form.content"
                            rows="12"
                            placeholder="Tulis artikel lengkap di sini..."
                            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                        />
                    </div>
                </div>
            </div>

            <!-- Right Column: Settings & Meta -->
            <div class="space-y-6">
                <!-- Publishing Status -->
                <div
                    class="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4"
                >
                    <h3
                        class="font-extrabold text-gray-800 text-sm border-b border-gray-100 pb-2"
                    >
                        Status Publikasi
                    </h3>
                    <div class="space-y-3">
                        <label class="flex items-center gap-3 cursor-pointer">
                            <input
                                v-model="form.status"
                                type="radio"
                                value="DRAFT"
                                class="text-teal-600 focus:ring-teal-500 w-4 h-4"
                            >
                            <div class="text-sm font-semibold text-gray-700">
                                Draf (Simpan Saja)
                            </div>
                        </label>
                        <label class="flex items-center gap-3 cursor-pointer">
                            <input
                                v-model="form.status"
                                type="radio"
                                value="PUBLISHED"
                                class="text-teal-600 focus:ring-teal-500 w-4 h-4"
                            >
                            <div class="text-sm font-semibold text-gray-700">
                                Terbitkan Langsung
                            </div>
                        </label>
                    </div>
                </div>

                <!-- Image Upload & Preview -->
                <div
                    class="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-4"
                >
                    <h3
                        class="font-extrabold text-gray-800 text-sm border-b border-gray-100 pb-2"
                    >
                        Gambar Sampul (Thumbnail)
                    </h3>
                    <div class="space-y-3">
                        <div class="space-y-1">
                            <label
                                class="text-[10px] font-bold text-gray-400 uppercase"
                            >
                                Link URL Gambar
                            </label>
                            <input
                                v-model="form.thumbnail"
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                        </div>
                        <div class="space-y-2">
                            <label
                                class="text-[10px] font-bold text-gray-400 uppercase block"
                            >
                                Unggah Foto Baru
                            </label>
                            <label
                                class="flex items-center gap-2 justify-center px-4 py-3 border border-dashed border-gray-200 hover:bg-gray-55/60 rounded-xl transition-colors cursor-pointer text-xs font-semibold text-gray-500"
                            >
                                <Upload class="w-4 h-4 text-gray-400" />
                                Pilih Berkas
                                <input
                                    type="file"
                                    class="hidden"
                                    accept="image/*"
                                    @change="handleUpload"
                                >
                            </label>
                        </div>
                        <div
                            class="relative rounded-xl overflow-hidden aspect-video bg-gray-50 border border-gray-200"
                        >
                            <img
                                :src="
                                    form.thumbnail ||
                                    'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800'
                                "
                                class="w-full h-full object-cover"
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
