<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { navLinks } from "~/config/list-nav";
import { ChevronDown, Menu, X } from "@lucide/vue";

const isOpen = ref(false);
const isScrolled = ref(false);
const route = useRoute();

const isLinkActive = (href: string) => {
    if (href === "/") {
        return route.path === "/";
    }
    return route.path.startsWith(href);
};

// 1. Ganti menjadi Computed Properties agar reaktif
const isSolid = computed(() => isScrolled.value || isOpen.value);

const navBg = computed(() =>
    isSolid.value
        ? "bg-white/95 backdrop-blur-md shadow-md border-gray-100"
        : "bg-transparent border-transparent",
);

const textColor = computed(() =>
    isSolid.value ? "text-[#0B4A3F]" : "text-white/90",
);

const hoverTextColor = computed(() =>
    isSolid.value ? "hover:text-[#12866B]" : "hover:text-yellow-400",
);

const activeTextColor = computed(() =>
    isSolid.value ? "text-[#12866B]" : "text-yellow-400",
);

const logoBg = computed(() =>
    isSolid.value
        ? "bg-linear-to-r from-teal-400 to-[#12866B]"
        : "bg-[#B5E9D5]",
);

const logoText = computed(() =>
    isSolid.value ? "text-white" : "text-[#0B4A3F]",
);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 30;
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
});

onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
    <header
        class="fixed top-0 z-50 w-full transition-all duration-300 ease-in-out"
        :class="navBg"
    >
        <section class="container mx-auto px-6 lg:px-12">
            <section class="flex items-center justify-between h-20 md:h-24">
                <section class="shrink-0 flex items-center w-auto lg:w-1/4">
                    <NuxtLink href="/" class="flex items-center gap-3 group">
                        <div
                            class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg transition-colors"
                        >
                            <img src="/assets/img/logo-ash.png" />
                        </div>
                        <span
                            class="font-extrabold text-xl hidden sm:block tracking-wide uppercase transition-colors"
                            :class="isSolid ? 'text-[#0B4A3F]' : 'text-white'"
                        >
                            Ashhaburratib
                        </span>
                    </NuxtLink>
                </section>

                <nav class="hidden lg:flex flex-1 justify-center space-x-8">
                    <div
                        v-for="link in navLinks"
                        :key="link.name"
                        class="relative group flex items-center h-full"
                    >
                        <button
                            v-if="link.subLinks"
                            class="flex items-center py-2 text-[13px] font-bold tracking-widest uppercase transition-colors"
                            :class="[
                                isLinkActive(link.href)
                                    ? activeTextColor
                                    : textColor,
                                hoverTextColor,
                            ]"
                        >
                            {{ link.name }}
                            <ChevronDown
                                class="ml-1 w-4 h-4 group-hover:rotate-180 transition-transform duration-200"
                            />
                        </button>
                        <NuxtLink
                            v-else
                            :to="link.href"
                            class="flex items-center py-2 text-[13px] font-bold tracking-widest uppercase transition-colors relative"
                            :class="[
                                isLinkActive(link.href)
                                    ? activeTextColor
                                    : textColor,
                                hoverTextColor,
                            ]"
                        >
                            {{ link.name }}

                            <span
                                v-if="isLinkActive(link.href) && !isSolid"
                                class="absolute -bottom-1 left-0 w-full h-0.5 bg-yellow-400 rounded-full"
                            />
                            <span
                                v-if="isLinkActive(link.href) && isSolid"
                                class="absolute -bottom-1 left-0 w-full h-0.5 bg-[#12866B] rounded-full"
                            />
                        </NuxtLink>

                        <div
                            v-if="link.subLinks"
                            class="absolute top-5 left-1/2 -translate-x-1/2 pt-4 w-60 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 ease-in-out z-50"
                        >
                            <div
                                class="rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] bg-white overflow-hidden border border-gray-100 p-2"
                            >
                                <NuxtLink
                                    v-for="subLink in link.subLinks"
                                    :key="subLink.name"
                                    :to="subLink.href"
                                    class="block px-4 py-3 text-sm font-semibold rounded-xl transition-colors"
                                    :class="
                                        route.path === subLink.href
                                            ? 'text-[#12866B] bg-teal-50'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-[#0B4A3F]'
                                    "
                                >
                                    {{ subLink.name }}
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </nav>

                <div class="lg:hidden flex items-center">
                    <button
                        @click="isOpen = !isOpen"
                        class="inline-flex items-center justify-center p-2 rounded-md transition-colors"
                        :class="
                            isSolid
                                ? 'text-[#0B4A3F] hover:bg-teal-50'
                                : 'text-white hover:bg-white/10'
                        "
                    >
                        <span class="sr-only">Open main menu</span>
                        <X v-if="isOpen" class="block h-6 w-6" />
                        <Menu v-else class="block h-6 w-6" />
                    </button>
                </div>
            </section>
        </section>

        <aside
            class="lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white"
            :class="
                isOpen
                    ? 'max-h-screen border-t border-gray-100 shadow-xl'
                    : 'max-h-0'
            "
        >
            <section class="px-4 py-6 space-y-4">
                <section v-for="link in navLinks" :key="link.name">
                    <section class="space-y-2" v-if="link.subLinks">
                        <div
                            class="px-3 py-2 text-sm font-bold tracking-widest uppercase text-[#0B4A3F]"
                        >
                            {{ link.name }}
                        </div>
                        <div
                            class="pl-6 space-y-1 border-l-2 border-gray-100 ml-3"
                        >
                            <NuxtLink
                                v-for="subLink in link.subLinks"
                                :key="subLink.name"
                                :to="subLink.href"
                                class="block px-4 py-3 text-sm font-semibold rounded-xl transition-colors"
                                :class="
                                    route.path === subLink.href
                                        ? 'text-[#12866B] bg-teal-50'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#0B4A3F]'
                                "
                            >
                                {{ subLink.name }}
                            </NuxtLink>
                        </div>
                    </section>

                    <NuxtLink
                        v-else
                        :to="link.href"
                        class="flex items-center py-2 text-[13px] font-bold tracking-widest uppercase transition-colors relative"
                        :class="[
                            isLinkActive(link.href)
                                ? activeTextColor
                                : textColor,
                            hoverTextColor,
                        ]"
                    >
                        {{ link.name }}
                    </NuxtLink>
                </section>
            </section>
        </aside>
    </header>
</template>
