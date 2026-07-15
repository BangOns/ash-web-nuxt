<script setup lang="ts">
import { Send } from "@lucide/vue";
import FormInput from "~/components/forms/FormInput.vue";
import FormSelect from "~/components/forms/FormSelect.vue";
import FormTextArea from "~/components/forms/FormTextArea.vue";
import FormFile from "~/components/forms/FormFile.vue";
import { useYourVoiceForm } from "./hooks/useYourVoiceForm";

const { form, submitted } = useYourVoiceForm();
</script>

<template>
    <div class="space-y-6">
        <h2
            class="text-2xl font-bold text-primary-950 border-b border-primary-100 dark:border-primary-800 pb-4"
        >
            Kotak Aspirasi Suara Anda
        </h2>
        <p class="text-gray-600 text-sm leading-relaxed mb-6">
            Sampaikan pendapat, pengaduan, atau aspirasi Anda langsung kepada
            pimpinan pondok. Seluruh data identitas pelapor akan dijaga
            kerahasiaannya.
        </p>

        <div
            v-if="submitted"
            class="bg-primary-50 text-primary-700 p-6 rounded-xl border border-primary-200 text-center animate-fade-in"
        >
            <h3 class="font-bold text-lg">Aspirasi Telah Diterima</h3>
            <p class="text-sm mt-1">
                Terima kasih atas kepedulian Anda. Aspirasi ini akan kami
                sampaikan ke pihak terkait.
            </p>
        </div>

        <form v-else class="space-y-5" @submit.prevent="form.handleSubmit()">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormInput
                    name="name"
                    label="Nama (Opsional / Samaran)"
                    placeholder="Hamba Allah..."
                />
                <FormInput
                    name="email"
                    label="Email/Kontak (Untuk Balasan)"
                    type="email"
                    placeholder="email@contoh.com..."
                />
            </div>

            <FormSelect name="topic" label="Topik Aspirasi" required>
                <option value="">-- Pilih Topik --</option>
                <option value="fasilitas">Fasilitas & Sarana Prasarana</option>
                <option value="pengasuhan">Sistem Pengasuhan & Keamanan</option>
                <option value="pendidikan">Kurikulum & Pembelajaran</option>
                <option value="keuangan">Administrasi & Keuangan</option>
                <option value="lainnya">Lainnya</option>
            </FormSelect>

            <FormTextArea
                name="message"
                label="Isi Pesan / Pengaduan"
                required
                placeholder="Jelaskan secara detail aspirasi Anda..."
                :rows="5"
            />

            <FormFile
                name="attachment"
                label="Lampiran Foto/Bukti (Opsional)"
            />

            <button
                type="submit"
                class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0B4A3F] hover:bg-teal-700 text-white font-semibold rounded-xl transition-all shadow-md cursor-pointer"
            >
                <Send class="w-4 h-4" /> Sampaikan Suara Anda
            </button>
        </form>
    </div>
</template>
