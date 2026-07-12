<script setup lang="ts">
import { Plus, Edit2, Trash2, Save, Upload, Check } from "@lucide/vue";
import { useAdminLandingManagement } from "./hooks/useAdminLandingManagement";

const {
    hero,
    heroLoading,
    heroSaved,
    programs,
    showProgramModal,
    editingProgram,
    programForm,
    testimonials,
    showTestiModal,
    editingTesti,
    testiForm,
    activeTab,
    saveHero,
    handleHeroUpload,
    openAddProgram,
    openEditProgram,
    saveProgram,
    deleteProgram,
    openAddTesti,
    openEditTesti,
    handleTestiUpload,
    saveTesti,
    deleteTesti,
} = await useAdminLandingManagement();
</script>

<template>
    <div class="space-y-8 max-w-5xl">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-extrabold text-gray-800">
                    Landing Page CMS
                </h1>
                <p class="text-gray-500 mt-1">
                    Kelola seluruh konten yang muncul pada Halaman Utama (Home).
                </p>
            </div>
        </div>

        <!-- Tabs Header -->
        <div class="flex border-b border-gray-200 gap-4">
            <button
                @click="activeTab = 'hero'"
                :class="[
                    'px-6 py-3 font-bold text-sm border-b-2 transition-all cursor-pointer',
                    activeTab === 'hero'
                        ? 'border-teal-600 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700',
                ]"
            >
                Hero Section
            </button>
            <button
                @click="activeTab = 'programs'"
                :class="[
                    'px-6 py-3 font-bold text-sm border-b-2 transition-all cursor-pointer',
                    activeTab === 'programs'
                        ? 'border-teal-600 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700',
                ]"
            >
                Program Pendidikan
            </button>
            <button
                @click="activeTab = 'testimonials'"
                :class="[
                    'px-6 py-3 font-bold text-sm border-b-2 transition-all cursor-pointer',
                    activeTab === 'testimonials'
                        ? 'border-teal-600 text-teal-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700',
                ]"
            >
                Testimoni
            </button>
        </div>

        <!-- Tab Contents -->
        <div class="mt-6">
            <!-- 1. HERO SECTION -->
            <div
                v-if="activeTab === 'hero'"
                class="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6"
            >
                <h3
                    class="font-extrabold text-gray-800 text-lg border-b border-gray-100 pb-3"
                >
                    Hero Banner Utama
                </h3>

                <div v-if="hero" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <div class="space-y-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                                >Judul Utama</label
                            >
                            <input
                                v-model="hero.title"
                                type="text"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            />
                        </div>
                        <div class="space-y-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                                >Sub-Judul</label
                            >
                            <textarea
                                v-model="hero.subtitle"
                                rows="3"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none resize-none"
                            ></textarea>
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            <div class="space-y-1">
                                <label
                                    class="text-xs font-bold text-gray-500 uppercase"
                                    >Teks Tombol</label
                                >
                                <input
                                    v-model="hero.btnText"
                                    type="text"
                                    class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                />
                            </div>
                            <div class="space-y-1">
                                <label
                                    class="text-xs font-bold text-gray-500 uppercase"
                                    >Link Tombol</label
                                >
                                <input
                                    v-model="hero.btnLink"
                                    type="text"
                                    class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div class="space-y-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                                >Gambar Latar Belakang (URL)</label
                            >
                            <input
                                v-model="hero.bgImage"
                                type="text"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
                            />
                        </div>
                        <div class="space-y-2">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase block"
                                >Unggah Gambar Baru</label
                            >
                            <label
                                class="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-2xl p-6 hover:bg-gray-50 transition-all cursor-pointer"
                            >
                                <Upload class="w-8 h-8 text-gray-400 mb-2" />
                                <span
                                    class="text-xs font-semibold text-gray-500"
                                    >Pilih berkas gambar untuk mengganti</span
                                >
                                <input
                                    type="file"
                                    class="hidden"
                                    accept="image/*"
                                    @change="handleHeroUpload"
                                />
                            </label>
                        </div>
                        <div
                            class="relative rounded-2xl overflow-hidden aspect-video bg-gray-100 border border-gray-200"
                        >
                            <img
                                :src="hero.bgImage"
                                class="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div
                    class="flex items-center justify-between border-t border-gray-100 pt-6"
                >
                    <div
                        class="flex items-center gap-2 text-emerald-600 text-sm font-semibold"
                        v-if="heroSaved"
                    >
                        <Check
                            class="w-5 h-5 bg-emerald-100 rounded-full p-1"
                        />
                        Perubahan berhasil disimpan!
                    </div>
                    <div v-else></div>

                    <button
                        @click="saveHero"
                        :disabled="heroLoading"
                        class="flex items-center gap-2 px-6 py-3 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer disabled:bg-gray-400"
                    >
                        <Save class="w-4 h-4" />
                        Simpan Perubahan
                    </button>
                </div>
            </div>

            <!-- 2. PROGRAM PENDIDIKAN -->
            <div v-if="activeTab === 'programs'" class="space-y-6">
                <div
                    class="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs"
                >
                    <div
                        class="flex justify-between items-center border-b border-gray-100 pb-4 mb-4"
                    >
                        <h3 class="font-extrabold text-gray-800 text-lg">
                            Daftar Program
                        </h3>
                        <button
                            @click="openAddProgram"
                            class="flex items-center gap-2 px-4 py-2 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                        >
                            <Plus class="w-4 h-4" /> Tambah Program
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div
                            v-for="prog in programs"
                            :key="prog.id"
                            class="bg-gray-50 border border-gray-200/60 p-6 rounded-2xl flex flex-col justify-between"
                        >
                            <div>
                                <div
                                    class="w-10 h-10 bg-teal-100 text-teal-700 rounded-xl flex items-center justify-center font-bold text-sm mb-4"
                                >
                                    {{ prog.order }}
                                </div>
                                <h4
                                    class="font-bold text-gray-800 text-base mb-2"
                                >
                                    {{ prog.title }}
                                </h4>
                                <p
                                    class="text-xs text-gray-550 leading-relaxed"
                                >
                                    {{ prog.description }}
                                </p>
                                <div
                                    class="text-[10px] bg-teal-50 text-teal-800 font-bold px-2 py-1 rounded-md inline-block mt-3"
                                >
                                    Icon: {{ prog.icon }}
                                </div>
                            </div>
                            <div
                                class="flex gap-2 border-t border-gray-200/50 mt-4 pt-3 justify-end"
                            >
                                <button
                                    @click="openEditProgram(prog)"
                                    class="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                                >
                                    <Edit2 class="w-4 h-4" />
                                </button>
                                <button
                                    @click="deleteProgram(prog.id)"
                                    class="p-2 text-red-600 hover:bg-red-55 rounded-lg transition-colors cursor-pointer"
                                >
                                    <Trash2 class="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. TESTIMONI -->
            <div v-if="activeTab === 'testimonials'" class="space-y-6">
                <div
                    class="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs"
                >
                    <div
                        class="flex justify-between items-center border-b border-gray-100 pb-4 mb-4"
                    >
                        <h3 class="font-extrabold text-gray-800 text-lg">
                            Daftar Testimoni
                        </h3>
                        <button
                            @click="openAddTesti"
                            class="flex items-center gap-2 px-4 py-2 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer"
                        >
                            <Plus class="w-4 h-4" /> Tambah Testimoni
                        </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div
                            v-for="testi in testimonials"
                            :key="testi.id"
                            class="bg-gray-50 border border-gray-200/60 p-6 rounded-2xl flex gap-4"
                        >
                            <img
                                :src="testi.photo"
                                class="w-16 h-16 rounded-full object-cover bg-gray-200 shrink-0"
                            />
                            <div class="grow flex flex-col justify-between">
                                <div>
                                    <h4 class="font-bold text-gray-800 text-sm">
                                        {{ testi.name }}
                                    </h4>
                                    <p
                                        class="text-xs text-teal-650 font-semibold mb-2"
                                    >
                                        {{ testi.position }}
                                    </p>
                                    <p class="text-xs text-gray-550 italic">
                                        "{{ testi.testimonial }}"
                                    </p>
                                </div>
                                <div
                                    class="flex gap-2 justify-end border-t border-gray-200/50 mt-4 pt-3"
                                >
                                    <button
                                        @click="openEditTesti(testi)"
                                        class="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                                    >
                                        <Edit2 class="w-4 h-4" />
                                    </button>
                                    <button
                                        @click="deleteTesti(testi.id)"
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
        </div>

        <!-- Modals -->
        <!-- 1. Program Modal -->
        <div
            v-if="showProgramModal"
            class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            @click.self="showProgramModal = false"
        >
            <div
                class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4"
            >
                <h3
                    class="font-bold text-gray-800 text-lg border-b border-gray-100 pb-2"
                >
                    {{
                        editingProgram ? "Edit Program" : "Tambah Program Baru"
                    }}
                </h3>
                <div class="space-y-3">
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Nama Program</label
                        >
                        <input
                            v-model="programForm.title"
                            type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Deskripsi</label
                        >
                        <textarea
                            v-model="programForm.description"
                            rows="3"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                        ></textarea>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                                >Icon (Name)</label
                            >
                            <select
                                v-model="programForm.icon"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 animate-fade-in"
                            >
                                <option value="GraduationCap">
                                    GraduationCap
                                </option>
                                <option value="BookOpen">BookOpen</option>
                                <option value="ShieldCheck">ShieldCheck</option>
                                <option value="Briefcase">Briefcase</option>
                            </select>
                        </div>
                        <div class="space-y-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                                >Urutan</label
                            >
                            <input
                                v-model="programForm.order"
                                type="number"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                        </div>
                    </div>
                </div>
                <div
                    class="flex justify-end gap-3 border-t border-gray-100 pt-4"
                >
                    <button
                        @click="showProgramModal = false"
                        class="px-4 py-2 text-gray-550 hover:bg-gray-55/70 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        @click="saveProgram"
                        class="px-5 py-2.5 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>

        <!-- 2. Testi Modal -->
        <div
            v-if="showTestiModal"
            class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            @click.self="showTestiModal = false"
        >
            <div
                class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4"
            >
                <h3
                    class="font-bold text-gray-800 text-lg border-b border-gray-100 pb-2"
                >
                    {{
                        editingTesti
                            ? "Edit Testimoni"
                            : "Tambah Testimoni Baru"
                    }}
                </h3>
                <div class="space-y-3">
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Nama Lengkap</label
                        >
                        <input
                            v-model="testiForm.name"
                            type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Jabatan / Status</label
                        >
                        <input
                            v-model="testiForm.position"
                            type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Contoh: Alumni 2018"
                        />
                    </div>
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Isi Testimoni</label
                        >
                        <textarea
                            v-model="testiForm.testimonial"
                            rows="3"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
                        ></textarea>
                    </div>
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Foto (URL)</label
                        >
                        <input
                            v-model="testiForm.photo"
                            type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div class="space-y-2">
                        <label
                            class="text-xs font-bold text-gray-500 uppercase block"
                            >Unggah Foto Baru</label
                        >
                        <label
                            class="flex items-center gap-3 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer text-xs font-semibold text-gray-600"
                        >
                            <Upload class="w-4 h-4 text-gray-400" />
                            Pilih Foto
                            <input
                                type="file"
                                class="hidden"
                                accept="image/*"
                                @change="handleTestiUpload"
                            />
                        </label>
                    </div>
                </div>
                <div
                    class="flex justify-end gap-3 border-t border-gray-100 pt-4"
                >
                    <button
                        @click="showTestiModal = false"
                        class="px-4 py-2 text-gray-550 hover:bg-gray-55/70 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                        Batal
                    </button>
                    <button
                        @click="saveTesti"
                        class="px-5 py-2.5 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
