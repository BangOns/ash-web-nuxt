import { ref, provide } from "vue";
import { useForm } from "@tanstack/vue-form";
import { loginSchema, initialValues } from "../model";
import { useState } from "nuxt/app";
import type { LoginResponse, StandardResponse } from "~/types";

/**
 * Hook untuk mengelola form login admin menggunakan TanStack Form & Zod
 */
export const useLoginForm = () => {
  // State untuk menyimpan pesan error ketika proses login gagal
  const errorMsg = ref("");

  // State indikator loading saat memproses pengiriman data form login
  const loading = ref(false);

  // State user admin yang disimpan dalam session state global Nuxt
  const adminUser = useState<LoginResponse["user"] | null>("admin_user");

  // Inisialisasi formulir dengan TanStack Form
  const form = useForm({
    defaultValues: initialValues,
    validators: {
      onSubmit: loginSchema, // Melakukan validasi schema Zod saat form disubmit
    },
    onSubmit: async ({ value }) => {
      errorMsg.value = "";
      loading.value = true;
      try {
        // Mengirimkan data input (email, password) ke server API endpoint login
        const res = await $fetch<StandardResponse<LoginResponse>>(
          "/api/auth/login",
          {
            method: "POST",
            body: value,
          },
        );

        // Jika respons data login berhasil, simpan user ke session dan alihkan rute
        if (res.data?.success) {
          adminUser.value = res.data.user;
          await navigateTo("/admin");
        }
      } catch (error: unknown) {
        // Menangkap error dari server (misalnya password salah)
        const err = error as { data?: { statusMessage?: string } };
        errorMsg.value =
          err.data?.statusMessage || "Email atau password salah";
      } finally {
        loading.value = false;
      }
    },
  });

  // Menyediakan konteks form ke komponen input anak di bawahnya (seperti FormInput)
  provide("formContext", form);

  return {
    form,
    loading,
    errorMsg,
  };
};
