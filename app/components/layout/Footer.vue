<script setup>
import { Mail, MapPin, Phone } from "@lucide/vue";

// Menyimpan tahun saat ini ke dalam variabel agar template HTML lebih bersih
const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="bg-white text-gray-800 pt-16 pb-8 border-t border-gray-100">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
            >
                <div class="space-y-4">
                    <div class="flex items-center gap-3 mb-6">
                        <div
                            class="w-10 h-10 rounded-xl bg-primary-700 flex items-center justify-center text-white font-bold text-xl shadow-md"
                        >
                            A
                        </div>
                        <span class="font-bold text-xl text-primary-950">
                            Yayasan Ashhaburratib Al Madani
                        </span>
                    </div>
                    <p class="text-gray-500 text-sm leading-relaxed">
                        Yayasan Ashhaburratib Al Madani is an Islamic foundation
                        dedicated to nurturing the next generation of Muslims
                        with strong morals, intellect, and global awareness.
                    </p>
                    <div class="flex space-x-4 pt-2">
                        <a
                            href="#"
                            class="flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </a>
                        <a
                            href="#"
                            class="flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <rect
                                    x="2"
                                    y="2"
                                    width="20"
                                    height="20"
                                    rx="5"
                                    ry="5"
                                ></rect>
                                <path
                                    d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                                ></path>
                                <line
                                    x1="17.5"
                                    y1="6.5"
                                    x2="17.51"
                                    y2="6.5"
                                ></line>
                            </svg>
                        </a>
                        <a
                            href="#"
                            class="flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.003 3.003 0 0 0-2.11 2.108C0 8.029 0 12 0 12s0 3.971.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.524 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.971 24 12 24 12s0-3.971-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </a>
                        <a
                            href="#"
                            class="flex items-center justify-center text-gray-400 hover:text-primary-600 transition-colors"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                                />
                            </svg>
                        </a>
                    </div>
                </div>

                <div>
                    <h3
                        class="text-lg font-bold text-gray-900 mb-6 pb-2 inline-block"
                    >
                        Quick Links
                    </h3>
                    <ul class="space-y-3">
                        <li>
                            <NuxtLink
                                to="/profile"
                                class="text-gray-500 hover:text-yellow-600 transition-colors flex items-center gap-2 text-sm"
                            >
                                <span
                                    class="w-1.5 h-1.5 rounded-full bg-yellow-500"
                                ></span>
                                Profile
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/news"
                                class="text-gray-500 hover:text-yellow-600 transition-colors flex items-center gap-2 text-sm"
                            >
                                <span
                                    class="w-1.5 h-1.5 rounded-full bg-yellow-500"
                                ></span>
                                News
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/information/announcements"
                                class="text-gray-500 hover:text-yellow-600 transition-colors flex items-center gap-2 text-sm"
                            >
                                <span
                                    class="w-1.5 h-1.5 rounded-full bg-yellow-500"
                                ></span>
                                Announcements
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="/gallery/photos"
                                class="text-gray-500 hover:text-yellow-600 transition-colors flex items-center gap-2 text-sm"
                            >
                                <span
                                    class="w-1.5 h-1.5 rounded-full bg-yellow-500"
                                ></span>
                                Gallery
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3
                        class="text-lg font-bold text-gray-900 mb-6 pb-2 inline-block"
                    >
                        Contact Us
                    </h3>
                    <ul class="space-y-4">
                        <li class="flex items-start gap-3">
                            <MapPin
                                class="w-5 h-5 text-gray-400 shrink-0 mt-0.5"
                            />
                            <span class="text-gray-500 text-sm">
                                Jl Mangga RT 06 RW 05<br />
                                Kel. Beji, Kec. Beji<br />
                                Kota Depok, Jawa Barat
                            </span>
                        </li>
                        <li class="flex items-center gap-3">
                            <Phone class="w-5 h-5 text-gray-400 shrink-0" />
                            <span class="text-gray-500 text-sm"
                                >+628979415635</span
                            >
                        </li>
                        <li class="flex items-center gap-3">
                            <Mail class="w-5 h-5 text-gray-400 shrink-0" />
                            <span class="text-gray-500 text-sm"
                                >info@ashhaburratib.com</span
                            >
                        </li>
                    </ul>
                </div>

                <div>
                    <h3
                        class="text-lg font-bold text-gray-900 mb-6 pb-2 inline-block"
                    >
                        Newsletter
                    </h3>
                    <p class="text-gray-500 text-sm mb-4">
                        Subscribe to our newsletter to receive the latest
                        updates and news.
                    </p>
                    <form @submit.prevent class="space-y-2">
                        <input
                            type="email"
                            placeholder="Your email address"
                            class="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                        />
                        <button
                            type="submit"
                            class="w-full bg-primary-950 hover:bg-primary-900 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div
                class="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between"
            >
                <p class="text-gray-400 text-sm">
                    © {{ currentYear }} Yayasan Ashhaburratib Al Madani. All
                    rights reserved.
                </p>
                <div class="flex gap-4 mt-4 md:mt-0">
                    <NuxtLink
                        to="/privacy"
                        class="text-gray-400 hover:text-gray-900 text-sm transition-colors"
                        >Privacy Policy</NuxtLink
                    >
                    <NuxtLink
                        to="/terms"
                        class="text-gray-400 hover:text-gray-900 text-sm transition-colors"
                        >Terms of Service</NuxtLink
                    >
                </div>
            </div>
        </div>
    </footer>
</template>
