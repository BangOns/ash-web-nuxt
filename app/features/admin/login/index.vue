<script setup lang="ts">
import FormInput from "~/components/forms/FormInput.vue";
import { useLoginForm } from "./hooks/useLoginForm";

const { form, loading, errorMsg } = useLoginForm();
</script>

<template>
    <div
        class="min-h-screen bg-linear-to-br from-teal-900 via-[#0B4A3F] to-amber-950 flex items-center justify-center p-6 font-sans"
    >
        <div
            class="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20"
        >
            <div class="text-center mb-8">
                <div
                    class="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center font-extrabold text-teal-950 text-3xl shadow-md mx-auto mb-4"
                >
                    A
                </div>
                <h2 class="text-2xl font-extrabold text-[#0B4A3F]">
                    Masuk Administrator
                </h2>
                <p class="text-gray-500 text-sm mt-2">
                    CMS Pondok Pesantren Ashhaburratib
                </p>
            </div>

            <form @submit.prevent="form.handleSubmit()" class="space-y-6">
                <div
                    v-if="errorMsg"
                    class="bg-red-50 text-red-700 text-sm p-4 rounded-xl border border-red-150 text-center font-medium"
                >
                    {{ errorMsg }}
                </div>

                <FormInput
                    name="email"
                    label="Alamat Email"
                    type="email"
                    placeholder="admin@ashhaburratib.or.id"
                    required
                />

                <FormInput
                    name="password"
                    label="Kata Sandi"
                    type="password"
                    placeholder="••••••••"
                    required
                />

                <button
                    type="submit"
                    :disabled="loading"
                    class="w-full py-3.5 bg-[#0B4A3F] hover:bg-[#0E5C4E] disabled:bg-gray-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-teal-950/20 text-sm uppercase tracking-wider flex justify-center items-center gap-2 cursor-pointer"
                >
                    <span v-if="loading">Memuat...</span>
                    <span v-else>Masuk ke Dashboard</span>
                </button>
            </form>
        </div>
    </div>
</template>
