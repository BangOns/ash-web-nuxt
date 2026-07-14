<script setup lang="ts">
import { Send, Star } from "@lucide/vue";
import FormInput from "~/components/forms/FormInput.vue";
import FormTextArea from "~/components/forms/FormTextArea.vue";
import { useSuggestionsForm } from "./hooks/useSuggestionsForm";

const { form, submitted, hoverRating } = useSuggestionsForm();
</script>

<template>
  <div class="space-y-6">
    <h2
      class="text-2xl font-bold text-primary-950 dark:text-white border-b border-primary-100 dark:border-primary-800 pb-4"
    >
      Kritik & Saran
    </h2>
    <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
      Masukan dari Anda sangat berharga bagi kami untuk terus berbenah dan
      memberikan layanan pendidikan yang lebih baik di masa mendatang.
    </p>

    <div
      v-if="submitted"
      class="bg-primary-50 text-primary-700 p-6 rounded-xl border border-primary-200 text-center animate-fade-in"
    >
      <h3 class="font-bold text-lg">Terima Kasih!</h3>
      <p class="text-sm mt-1">Saran & Ulasan Anda telah kami terima.</p>
    </div>

    <form v-else class="space-y-5" @submit.prevent="form.handleSubmit()">
      <!-- Star Rating Field (TanStack Form custom binding) -->
      <component :is="form.Field" v-slot="{ field }" name="rating">
        <div class="space-y-2">
          <label
            class="block text-sm font-semibold text-gray-700 dark:text-gray-300"
          >
            Penilaian (Bintang) <span class="text-red-500">*</span>
          </label>
          <div class="flex gap-2">
            <button
              v-for="star in [1, 2, 3, 4, 5]"
              :key="star"
              type="button"
              class="focus:outline-none transition-transform hover:scale-110 cursor-pointer"
              @click="field.handleChange(star)"
              @mouseenter="hoverRating = star"
              @mouseleave="hoverRating = 0"
            >
              <Star
                :class="[
                  'w-8 h-8 transition-colors',
                  star <= (hoverRating || field.state.value)
                    ? 'fill-yellow-400 text-yellow-500'
                    : 'text-gray-300 dark:text-gray-600',
                ]"
              />
            </button>
          </div>
          <div
            v-if="field.state.meta.errors.length"
            class="text-xs text-red-500 font-semibold mt-1"
          >
            {{ field.state.meta.errors[0] }}
          </div>
        </div>
      </component>

      <FormInput
        name="name"
        label="Nama (Opsional)"
        placeholder="Nama Anda..."
      />

      <FormTextArea
        name="message"
        label="Pesan / Saran"
        required
        placeholder="Ketik saran dan masukan Anda..."
        rows="4"
      />

      <button
        type="submit"
        class="w-full sm:w-auto px-8 py-3 bg-[#0B4A3F] hover:bg-teal-700 text-white font-semibold rounded-xl transition-all shadow-md flex justify-center items-center gap-2 cursor-pointer"
      >
        <Send class="w-4 h-4" /> Kirim Saran
      </button>
    </form>
  </div>
</template>
