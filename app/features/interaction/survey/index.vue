<script setup lang="ts">
import { Send } from "@lucide/vue";
import FormInput from "~/components/forms/FormInput.vue";
import FormSelect from "~/components/forms/FormSelect.vue";
import FormTextArea from "~/components/forms/FormTextArea.vue";
import { useSurveyForm } from "./hooks/useSurveyForm";

const { form, submitted } = useSurveyForm();
</script>

<template>
  <div class="space-y-6">
    <h2
      class="text-2xl font-bold text-primary-950 dark:text-white border-b border-primary-100 dark:border-primary-800 pb-4"
    >
      Survei Kepuasan Layanan
    </h2>
    <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
      Mohon kesediaan Anda mengisi kuesioner singkat ini guna mengukur indeks
      kepuasan pelayanan administrasi dan pendidikan di Pondok Pesantren
      Ashhaburratib.
    </p>

    <div
      v-if="submitted"
      class="bg-green-50 text-green-700 p-6 rounded-xl border border-green-200 text-center animate-fade-in"
    >
      <div
        class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h3 class="font-bold text-lg">Terima Kasih!</h3>
      <p class="text-sm mt-1">
        Survei Anda telah berhasil dikirim. Kami sangat menghargai partisipasi
        Anda.
      </p>
    </div>

    <form v-else @submit.prevent="form.handleSubmit()" class="space-y-5">
      <FormInput
        name="name"
        label="Nama Lengkap (Opsional)"
        placeholder="Masukkan nama Anda..."
      />

      <FormSelect name="status" label="Status Anda" required>
        <option value="">Pilih status</option>
        <option value="santri">Santri Aktif</option>
        <option value="wali">Wali Santri</option>
        <option value="alumni">Alumni</option>
        <option value="umum">Masyarakat Umum</option>
      </FormSelect>

      <!-- Satisfaction Radio Binding (TanStack Form custom binding) -->
      <component :is="form.Field" name="satisfaction" v-slot="{ field }">
        <div class="space-y-2">
          <label
            class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >Tingkat Kepuasan Pelayanan <span class="text-red-500">*</span></label
          >
          <div class="flex flex-wrap gap-4">
            <label
              v-for="rating in ['Sangat Puas', 'Puas', 'Cukup', 'Kurang']"
              :key="rating"
              :class="[
                'flex items-center gap-2 cursor-pointer p-3 rounded-xl border transition-all select-none',
                field.state.value === rating
                  ? 'border-[#0B4A3F] bg-teal-50/50 text-[#0B4A3F] dark:border-teal-550 dark:bg-teal-950/20'
                  : 'border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900',
              ]"
            >
              <input
                type="radio"
                :name="field.name"
                :value="rating"
                :checked="field.state.value === rating"
                @change="field.handleChange(rating)"
                class="w-4 h-4 text-[#0B4A3F] focus:ring-[#0B4A3F]"
              />
              <span class="text-sm dark:text-gray-300 font-semibold">{{ rating }}</span>
            </label>
          </div>
          <div
            v-if="field.state.meta.errors.length"
            class="text-xs text-red-500 font-semibold mt-1"
          >
            {{ field.state.meta.errors[0] }}
          </div>
        </div>
      </component>

      <FormTextArea
        name="feedback"
        label="Kritik & Saran Membangun (Opsional)"
        placeholder="Tulis masukan Anda di sini..."
        rows="4"
      />

      <button
        type="submit"
        class="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#0B4A3F] hover:bg-teal-700 text-white font-semibold rounded-xl transition-all shadow-md cursor-pointer"
      >
        <Send class="w-4 h-4" /> Kirim Kuesioner
      </button>
    </form>
  </div>
</template>
