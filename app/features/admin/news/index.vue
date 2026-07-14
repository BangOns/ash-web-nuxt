<script setup lang="ts">
import { Plus, Edit2, Trash2, Eye } from "@lucide/vue";
import { useAdminNewsManagement } from "./hooks/useAdminNewsManagement";

const { newsList, deleteNews } = await useAdminNewsManagement();
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-extrabold text-gray-800">
          Berita & Kegiatan CMS
        </h1>
        <p class="text-gray-500 mt-1">
          Kelola publikasi artikel, berita pesantren, dan info kegiatan.
        </p>
      </div>
      <NuxtLink
        to="/admin/news/editor"
        class="flex items-center gap-2 px-5 py-3 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold text-sm rounded-xl shadow-md transition-all font-sans cursor-pointer"
      >
        <Plus class="w-4 h-4" /> Tulis Berita Baru
      </NuxtLink>
    </div>

    <!-- News List Card -->
    <div
      class="bg-white border border-gray-200 rounded-3xl shadow-xs overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr
              class="bg-gray-50 text-gray-500 text-xs font-bold uppercase border-b border-gray-100"
            >
              <th class="p-6">Informasi Berita</th>
              <th class="p-6">Kategori</th>
              <th class="p-6">Status</th>
              <th class="p-6">Dibaca</th>
              <th class="p-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-sm">
            <tr v-if="!newsList?.length">
              <td colspan="5" class="p-12 text-center text-gray-400">
                Belum ada berita yang diterbitkan.
              </td>
            </tr>
            <tr
              v-for="news in newsList"
              :key="news.id"
              class="hover:bg-gray-50/50 transition-colors"
            >
              <td class="p-6 flex items-center gap-4 min-w-[320px]">
                <img
                  :src="news.thumbnail"
                  class="w-16 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200"
                >
                <div class="min-w-0">
                  <h4 class="font-bold text-gray-800 truncate max-w-[280px]">
                    {{ news.title }}
                  </h4>
                  <p class="text-xs text-gray-400 mt-1">
                    {{
                      new Date(news.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    }}
                  </p>
                </div>
              </td>
              <td class="p-6">
                <span
                  class="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg"
                >
                  {{ news.category }}
                </span>
              </td>
              <td class="p-6">
                <span
                  :class="[
                    'text-xs font-bold px-2.5 py-1 rounded-lg',
                    news.status === 'PUBLISHED'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-amber-50 text-amber-700',
                  ]"
                >
                  {{ news.status === "PUBLISHED" ? "Diterbitkan" : "Draf" }}
                </span>
              </td>
              <td class="p-6">
                <div
                  class="flex items-center gap-1.5 text-gray-500 font-semibold text-xs"
                >
                  <Eye class="w-4 h-4 text-gray-400" />
                  {{ news.totalViews }}
                </div>
              </td>
              <td class="p-6 text-right">
                <div class="flex gap-2 justify-end">
                  <NuxtLink
                    :to="`/admin/news/editor?id=${news.id}`"
                    class="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit2 class="w-4 h-4" />
                  </NuxtLink>
                  <button
                    class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    @click="deleteNews(news.id)"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
