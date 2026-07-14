<script setup lang="ts">
const waNumber = "628979415635";

const registerMessage = encodeURIComponent(
    "Assalamualaikum Admin Ashhaburratib, saya ingin mendaftar ke Pondok Pesantren.",
);
const contactMessage = encodeURIComponent(
    "Assalamualaikum Admin Ashhaburratib, ada beberapa hal yang ingin saya tanyakan.",
);
</script>

<template>
    <section
        class="py-24 bg-linear-to-t from-teal-50 to-white relative text-center"
    >
        <div class="container mx-auto px-6 lg:px-12">
            <h2
                class="text-[#0B4A3F] text-4xl font-extrabold uppercase mb-6 drop-shadow-sm"
            >
                Mari Bergabung
                <span
                    class="text-transparent bg-clip-text bg-linear-to-r from-teal-600 to-amber-500"
                >
                    Bersama Kami
                </span>
            </h2>

            <p class="text-[#0B4A3F]/70 text-lg max-w-2xl mx-auto mb-10">
                Pendaftaran santri baru telah dibuka. Siapkan masa depan
                gemilang putra-putri Anda.
            </p>

            <div class="flex justify-center gap-4 flex-wrap">
                <NuxtLink
                    :to="`https://wa.me/${waNumber}?text=${registerMessage}`"
                    target="_blank"
                    class="px-10 py-4 rounded-full bg-linear-to-r from-[#0B4A3F] to-[#07332b] text-white font-bold tracking-wide shadow-xl shadow-[#0B4A3F]/30 hover:-translate-y-1 transition-transform uppercase border border-[#0B4A3F]/20"
                >
                    Daftar Sekarang
                </NuxtLink>

                <NuxtLink
                    :to="`https://wa.me/${waNumber}?text=${contactMessage}`"
                    target="_blank"
                    class="px-10 py-4 rounded-full border-2 border-[#0B4A3F] text-[#0B4A3F] font-bold tracking-wide hover:bg-[#0B4A3F] hover:text-white transition-colors uppercase"
                >
                    Hubungi Kami
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
