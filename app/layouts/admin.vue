<script setup lang="ts">
import { ref } from "vue";
import { useState } from "nuxt/app";
import {
    LayoutDashboard,
    Home,
    User,
    FileText,
    Info,
    Image,
    Inbox,
    LogOut,
    Menu,
    X,
} from "@lucide/vue";
import { useRoute } from "vue-router";
import type { LoginResponse } from "~/types";

const route = useRoute();
const sidebarOpen = ref(false);
const adminUser = useState<LoginResponse["user"] | null>("admin_user");

const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Landing Page", href: "/admin/landing", icon: Home },
    { name: "Profil Pondok", href: "/admin/profile", icon: User },
    { name: "Berita & Kegiatan", href: "/admin/news", icon: FileText },
    { name: "Pengumuman & Agenda", href: "/admin/information", icon: Info },
    { name: "Galeri Foto & Video", href: "/admin/gallery", icon: Image },
    { name: "Pesan Masuk", href: "/admin/messages", icon: Inbox },
];

const logout = async () => {
    try {
        await $fetch("/api/auth/logout", { method: "POST" });
        adminUser.value = null;
        await navigateTo("/admin/login");
    } catch (error) {
        console.error("Gagal logout:", error);
    }
};
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex font-sans">
        <!-- Desktop Sidebar -->
        <aside
            class="hidden lg:flex flex-col w-72 bg-[#0B4A3F] text-white shrink-0 border-r border-[#08352D] shadow-xl"
        >
            <div
                class="p-6 border-b border-[#08352D] flex items-center gap-3 bg-[#083A31]"
            >
                <div
                    class="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center font-bold text-teal-950 text-xl shadow-md"
                >
                    A
                </div>
                <div>
                    <h1 class="font-extrabold text-sm tracking-wide uppercase">
                        Ashhaburratib
                    </h1>
                    <p class="text-xs text-teal-200">Admin Dashboard</p>
                </div>
            </div>

            <nav class="grow p-6 space-y-2 overflow-y-auto">
                <NuxtLink
                    v-for="item in menuItems"
                    :key="item.name"
                    :to="item.href"
                    :class="[
                        'flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-sm transition-all',
                        route.path === item.href
                            ? 'bg-yellow-400 text-teal-950 font-bold shadow-md shadow-yellow-400/10'
                            : 'text-teal-100 hover:bg-[#0E5C4E] hover:text-white',
                    ]"
                >
                    <component :is="item.icon" class="w-5 h-5" />
                    {{ item.name }}
                </NuxtLink>
            </nav>

            <div class="p-6 border-t border-[#08352D] bg-[#083A31]">
                <div class="flex items-center gap-3 mb-4">
                    <div
                        class="w-9 h-9 rounded-full bg-teal-850 border border-teal-650 flex items-center justify-center text-white font-bold text-sm shrink-0"
                    >
                        {{ adminUser?.name?.charAt(0) || "A" }}
                    </div>
                    <div class="truncate max-w-37.5">
                        <p class="font-bold text-xs text-white">
                            {{ adminUser?.name || "Admin" }}
                        </p>
                        <p class="text-[10px] text-teal-300 truncate">
                            {{ adminUser?.email }}
                        </p>
                    </div>
                </div>
                <button
                    class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-600/20 hover:bg-red-600 hover:text-white text-red-200 rounded-xl text-sm font-semibold transition-all border border-red-500/30 cursor-pointer"
                    @click="logout"
                >
                    <LogOut class="w-4 h-4" />
                    Keluar
                </button>
            </div>
        </aside>

        <!-- Mobile Sidebar overlay -->
        <div
            v-if="sidebarOpen"
            class="fixed inset-0 bg-black/50 z-40 lg:hidden"
            @click="sidebarOpen = false"
        />

        <!-- Mobile Sidebar -->
        <aside
            :class="[
                'fixed top-0 bottom-0 left-0 w-72 bg-[#0B4A3F] text-white z-50 flex flex-col transition-transform duration-300 lg:hidden border-r border-[#08352D] shadow-2xl',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full',
            ]"
        >
            <div
                class="p-6 border-b border-[#08352D] flex items-center justify-between bg-[#083A31]"
            >
                <div class="flex items-center gap-3">
                    <div
                        class="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center font-bold text-teal-950 text-xl"
                    >
                        A
                    </div>
                    <div>
                        <h1
                            class="font-extrabold text-sm tracking-wide uppercase"
                        >
                            Ashhaburratib
                        </h1>
                        <p class="text-xs text-teal-200">Admin Dashboard</p>
                    </div>
                </div>
                <button
                    class="text-teal-100 hover:text-white"
                    @click="sidebarOpen = false"
                >
                    <X class="w-6 h-6" />
                </button>
            </div>

            <nav class="grow p-6 space-y-2 overflow-y-auto">
                <NuxtLink
                    v-for="item in menuItems"
                    :key="item.name"
                    :to="item.href"
                    :class="[
                        'flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-sm transition-all',
                        route.path === item.href
                            ? 'bg-yellow-400 text-teal-950 font-bold'
                            : 'text-teal-100 hover:bg-[#0E5C4E] hover:text-white',
                    ]"
                    @click="sidebarOpen = false"
                >
                    <component :is="item.icon" class="w-5 h-5" />
                    {{ item.name }}
                </NuxtLink>
            </nav>

            <div class="p-6 border-t border-[#08352D] bg-[#083A31]">
                <div class="flex items-center gap-3 mb-4">
                    <div
                        class="w-9 h-9 rounded-full bg-teal-800 flex items-center justify-center text-white font-bold text-sm shrink-0"
                    >
                        {{ adminUser?.name?.charAt(0) || "A" }}
                    </div>
                    <div class="truncate">
                        <p class="font-bold text-xs text-white">
                            {{ adminUser?.name || "Admin" }}
                        </p>
                        <p class="text-[10px] text-teal-300 truncate">
                            {{ adminUser?.email }}
                        </p>
                    </div>
                </div>
                <button
                    class="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-600/20 hover:bg-red-600 hover:text-white text-red-200 rounded-xl text-sm font-semibold transition-all border border-red-500/30 cursor-pointer"
                    @click="logout"
                >
                    <LogOut class="w-4 h-4" />
                    Keluar
                </button>
            </div>
        </aside>

        <!-- Main Content Wrapper -->
        <div class="grow flex flex-col min-w-0">
            <!-- Top Navbar -->
            <header
                class="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 lg:px-8 shadow-sm shrink-0"
            >
                <div class="flex items-center gap-4">
                    <button
                        class="text-gray-500 hover:text-gray-800 lg:hidden focus:outline-none"
                        @click="sidebarOpen = true"
                    >
                        <Menu class="w-6 h-6" />
                    </button>
                    <h2 class="text-lg font-bold text-gray-800">
                        Panel Administrasi
                    </h2>
                </div>
                <div class="flex items-center gap-4">
                    <NuxtLink
                        to="/"
                        target="_blank"
                        class="text-sm font-semibold text-teal-600 hover:text-teal-700 bg-teal-50 px-4 py-2 rounded-xl transition-all"
                    >
                        Lihat Website
                    </NuxtLink>
                </div>
            </header>

            <!-- Page Content -->
            <main class="grow p-6 lg:p-8 overflow-y-auto">
                <slot />
            </main>
        </div>
    </div>
</template>
