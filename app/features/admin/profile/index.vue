<script setup lang="ts">
import { Plus, Edit2, Trash2, Save, Upload, Check } from "@lucide/vue";
import { useAdminProfileManagement } from "./hooks/useAdminProfileManagement";

const {
  profile,
  profileLoading,
  profileSaved,
  members,
  showMemberModal,
  editingMember,
  memberForm,
  activeTab,
  saveProfile,
  openAddMember,
  openEditMember,
  handleMemberUpload,
  saveMember,
  deleteMember,
} = await useAdminProfileManagement();
</script>

<template>
  <div class="space-y-8 max-w-5xl">
    <div>
      <h1 class="text-3xl font-extrabold text-gray-800 font-sans">
        Profil Pondok CMS
      </h1>
      <p class="text-gray-500 mt-1 font-sans">
        Kelola sejarah, visi misi, sambutan pimpinan, dan struktur organisasi.
      </p>
    </div>

    <!-- Tabs Header -->
    <div class="flex border-b border-gray-200 gap-4">
      <button
        @click="activeTab = 'profile'"
        :class="[
          'px-6 py-3 font-bold text-sm border-b-2 transition-all cursor-pointer',
          activeTab === 'profile'
            ? 'border-teal-600 text-teal-600'
            : 'border-transparent text-gray-500 hover:text-gray-700',
        ]"
      >
        Profil & Sambutan
      </button>
      <button
        @click="activeTab = 'structure'"
        :class="[
          'px-6 py-3 font-bold text-sm border-b-2 transition-all cursor-pointer',
          activeTab === 'structure'
            ? 'border-teal-600 text-teal-600'
            : 'border-transparent text-gray-500 hover:text-gray-700',
        ]"
      >
        Struktur Organisasi
      </button>
    </div>

    <!-- Tab Contents -->
    <div class="mt-6">
      <!-- Tab 1: Profil & Sambutan -->
      <div
        v-if="activeTab === 'profile'"
        class="bg-white p-8 rounded-3xl border border-gray-200 shadow-xs space-y-6"
      >
        <h3
          class="font-extrabold text-gray-800 text-lg border-b border-gray-100 pb-3"
        >
          Konten Profil Utama
        </h3>

        <div v-if="profile" class="space-y-6">
          <div class="space-y-1">
            <label class="text-xs font-bold text-gray-500 uppercase"
              >Sejarah Singkat</label
            >
            <textarea
              v-model="profile.sejarah"
              rows="5"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1">
              <label class="text-xs font-bold text-gray-500 uppercase"
                >Visi Pondok</label
              >
              <textarea
                v-model="profile.visi"
                rows="4"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              ></textarea>
            </div>
            <div class="space-y-1">
              <label class="text-xs font-bold text-gray-500 uppercase"
                >Misi Pondok (Gunakan Baris Baru)</label
              >
              <textarea
                v-model="profile.misi"
                rows="4"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
              ></textarea>
            </div>
          </div>

          <div class="space-y-1">
            <label class="text-xs font-bold text-gray-500 uppercase"
              >Sambutan Pimpinan</label
            >
            <textarea
              v-model="profile.sambutan"
              rows="6"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 focus:outline-none"
            ></textarea>
          </div>
        </div>

        <div
          class="flex items-center justify-between border-t border-gray-100 pt-6"
        >
          <div
            class="flex items-center gap-2 text-emerald-600 text-sm font-semibold"
            v-if="profileSaved"
          >
            <Check class="w-5 h-5 bg-emerald-100 rounded-full p-1" />
            Perubahan profil berhasil disimpan!
          </div>
          <div v-else></div>

          <button
            @click="saveProfile"
            :disabled="profileLoading"
            class="flex items-center gap-2 px-6 py-3 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold rounded-xl text-sm transition-all shadow-md cursor-pointer disabled:bg-gray-400 font-sans"
          >
            <Save class="w-4 h-4" />
            Simpan Profil
          </button>
        </div>
      </div>

      <!-- Tab 2: Struktur Organisasi -->
      <div v-if="activeTab === 'structure'" class="space-y-6">
        <div class="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs">
          <div
            class="flex justify-between items-center border-b border-gray-100 pb-4 mb-4"
          >
            <h3 class="font-extrabold text-gray-800 text-lg">
              Struktur Kepengurusan
            </h3>
            <button
              @click="openAddMember"
              class="flex items-center gap-2 px-4 py-2 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer font-sans"
            >
              <Plus class="w-4 h-4" /> Tambah Pengurus
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="member in members"
              :key="member.id"
              class="bg-gray-50 border border-gray-200/60 p-6 rounded-2xl flex flex-col justify-between"
            >
              <div class="flex items-start gap-4">
                <img
                  :src="member.photo"
                  class="w-16 h-16 rounded-xl object-cover bg-gray-200 shrink-0 shadow-sm border border-gray-200"
                />
                <div>
                  <h4 class="font-bold text-gray-800 text-sm leading-snug">
                    {{ member.name }}
                  </h4>
                  <p class="text-xs text-teal-650 font-bold mt-1">
                    {{ member.position }}
                  </p>
                  <p class="text-[10px] text-gray-400 mt-2 font-bold">
                    Urutan Tampil: {{ member.order }}
                  </p>
                </div>
              </div>
              <div
                class="flex gap-2 border-t border-gray-200/50 mt-4 pt-3 justify-end"
              >
                <button
                  @click="openEditMember(member)"
                  class="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Edit2 class="w-4 h-4" />
                </button>
                <button
                  @click="deleteMember(member.id)"
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

    <!-- Member Modal -->
    <div
      v-if="showMemberModal"
      class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      @click.self="showMemberModal = false"
    >
      <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <h3
          class="font-bold text-gray-800 text-lg border-b border-gray-100 pb-2"
        >
          {{ editingMember ? "Edit Pengurus" : "Tambah Pengurus Baru" }}
        </h3>
        <div class="space-y-3">
          <div class="space-y-1">
            <label class="text-xs font-bold text-gray-500 uppercase"
              >Nama Lengkap</label
            >
            <input
              v-model="memberForm.name"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div class="space-y-1">
            <label class="text-xs font-bold text-gray-500 uppercase"
              >Jabatan</label
            >
            <input
              v-model="memberForm.position"
              type="text"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Contoh: Kepala Madrasah MA"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-1">
              <label class="text-xs font-bold text-gray-500 uppercase"
                >Urutan Tampil</label
              >
              <input
                v-model="memberForm.order"
                type="number"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-bold text-gray-500 uppercase"
                >Foto (URL)</label
              >
              <input
                v-model="memberForm.photo"
                type="text"
                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold text-gray-500 uppercase block"
              >Unggah Foto Baru</label
            >
            <label
              class="flex items-center gap-3 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-55 transition-colors cursor-pointer text-xs font-semibold text-gray-600"
            >
              <Upload class="w-4 h-4 text-gray-400" />
              Pilih Foto
              <input
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleMemberUpload"
              />
            </label>
          </div>
        </div>
        <div class="flex justify-end gap-3 border-t border-gray-100 pt-4">
          <button
            @click="showMemberModal = false"
            class="px-4 py-2 text-gray-500 hover:bg-gray-55/70 rounded-xl text-xs font-semibold cursor-pointer"
          >
            Batal
          </button>
          <button
            @click="saveMember"
            class="px-5 py-2.5 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
