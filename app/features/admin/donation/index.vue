<script setup lang="ts">
import { ref, computed } from "vue";
import {
    Plus,
    Edit2,
    Trash2,
    Coins,
    History,
    Save,
    X,
    Calendar,
    Heart,
} from "@lucide/vue";
import { useDonationApi } from "~/composables/useApi";
import type { DonationCampaign, DonationHistory } from "~/types";

const donationApi = useDonationApi();

// Fetch initial data
const { data: campaigns, refresh } = await donationApi.getAdminCampaigns();

// Stats
const totalCampaigns = computed(() => campaigns.value?.length || 0);
const activeCampaigns = computed(
    () => campaigns.value?.filter((c) => c.status === "PUBLISHED").length || 0,
);
const closedCampaigns = computed(
    () => campaigns.value?.filter((c) => c.status === "CLOSED").length || 0,
);
const totalCollected = computed(
    () => campaigns.value?.reduce((sum, c) => sum + c.collectedAmount, 0) || 0,
);

// State for Campaign Form Modal
const showFormModal = ref(false);
const editingCampaign = ref<DonationCampaign | null>(null);
const form = ref<{
    id: string;
    title: string;
    slug: string;
    banner: string;
    description: string;
    targetAmount: number;
    whatsappNumber: string;
    whatsappTemplate: string;
    startDate: string;
    endDate: string;
    status: "DRAFT" | "PUBLISHED" | "CLOSED";
}>({
    id: "",
    title: "",
    slug: "",
    banner: "",
    description: "",
    targetAmount: 0,
    whatsappNumber: "",
    whatsappTemplate: "",
    startDate: "",
    endDate: "",
    status: "DRAFT",
});

// State for Nominal Modal
const showNominalModal = ref(false);
const targetCampaign = ref<DonationCampaign | null>(null);
const nominalForm = ref({
    amount: 0,
    type: "ADDITION" as "ADDITION" | "REDUCTION",
    note: "",
});

// State for History Modal
const showHistoryModal = ref(false);
const histories = ref<DonationHistory[]>([]);
const historiesLoading = ref(false);

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(val);
};

const calculatePercentage = (collected: number, target: number) => {
    if (!target) return 0;
    return Math.min(100, Math.round((collected / target) * 100));
};

const generateSlug = () => {
    if (!editingCampaign.value) {
        form.value.slug = form.value.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
    }
};

// Campaign Form Methods
const openAdd = () => {
    editingCampaign.value = null;
    form.value = {
        id: "",
        title: "",
        slug: "",
        banner: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600",
        description: "",
        targetAmount: 0,
        whatsappNumber: "08123456789",
        whatsappTemplate:
            "Assalamu'alaikum.\n\nSaya ingin berdonasi untuk program:\n\n*[JUDUL]*\n\nMohon informasi mengenai tata cara penyaluran donasi.\n\nTerima kasih.",
        startDate: new Date().toISOString().split("T")[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        status: "DRAFT",
    };
    showFormModal.value = true;
};

const openEdit = (c: DonationCampaign) => {
    editingCampaign.value = c;
    form.value = {
        id: c.id,
        title: c.title,
        slug: c.slug,
        banner: c.banner,
        description: c.description,
        targetAmount: c.targetAmount,
        whatsappNumber: c.whatsappNumber,
        whatsappTemplate: c.whatsappTemplate,
        startDate: new Date(c.startDate).toISOString().split("T")[0],
        endDate: new Date(c.endDate).toISOString().split("T")[0],
        status: c.status,
    };
    showFormModal.value = true;
};

const saveCampaign = async () => {
    try {
        if (editingCampaign.value) {
            await donationApi.updateCampaign(form.value);
        } else {
            await donationApi.createCampaign(form.value);
        }
        showFormModal.value = false;
        await refresh();
    } catch (err: any) {
        alert(err.data?.message || "Gagal menyimpan campaign");
    }
};

const deleteCampaign = async (id: string) => {
    if (
        !confirm(
            "Apakah Anda yakin ingin menghapus campaign ini? Seluruh data histori donasi juga akan dihapus permanen.",
        )
    )
        return;
    try {
        await donationApi.deleteCampaign(id);
        await refresh();
    } catch (err: any) {
        alert(err.data?.message || "Gagal menghapus campaign");
    }
};

// Nominal Update Methods
const openUpdateNominal = (c: DonationCampaign) => {
    targetCampaign.value = c;
    nominalForm.value = {
        amount: 0,
        type: "ADDITION",
        note: "",
    };
    showNominalModal.value = true;
};

const saveNominal = async () => {
    if (!targetCampaign.value) return;
    try {
        await donationApi.updateNominal({
            campaignId: targetCampaign.value.id,
            amount: nominalForm.value.amount,
            type: nominalForm.value.type,
            note: nominalForm.value.note,
        });
        showNominalModal.value = false;
        await refresh();
    } catch (err: any) {
        alert(err.data?.message || "Gagal memperbarui nominal donasi");
    }
};

// History Methods
const openHistory = async (c: DonationCampaign) => {
    targetCampaign.value = c;
    histories.value = [];
    showHistoryModal.value = true;
    historiesLoading.value = true;
    try {
        const { data } = await donationApi.getCampaignHistories(c.id);
        if (data.value) {
            histories.value = data.value;
        }
    } catch (err) {
        console.error("Gagal memuat histori:", err);
    } finally {
        historiesLoading.value = false;
    }
};
</script>

<template>
    <div class="space-y-8 max-w-5xl">
        <!-- Header -->
        <div class="flex justify-between items-center">
            <div>
                <h1 class="text-3xl font-extrabold text-gray-800 font-sans">
                    CMS Donasi & Sedekah
                </h1>
                <p class="text-gray-500 mt-1 font-sans">
                    Kelola program sedekah, target donasi, progres pengumpulan
                    dana, dan redirect WhatsApp.
                </p>
            </div>
            <button
                class="flex items-center gap-2 px-5 py-3 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold text-sm rounded-xl shadow-md transition-all cursor-pointer font-sans"
                @click="openAdd"
            >
                <Plus class="w-4 h-4" /> Tambah Program
            </button>
        </div>

        <!-- Stats Panel -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
                class="bg-white border border-gray-200 p-6 rounded-3xl flex items-center gap-4 shadow-xs"
            >
                <div class="p-3 bg-teal-50 text-teal-650 rounded-2xl">
                    <Heart class="w-6 h-6" />
                </div>
                <div>
                    <p class="text-xs text-gray-400 font-bold uppercase">
                        Total Program
                    </p>
                    <p class="text-2xl font-black text-gray-800 mt-0.5">
                        {{ totalCampaigns }}
                    </p>
                </div>
            </div>

            <div
                class="bg-white border border-gray-200 p-6 rounded-3xl flex items-center gap-4 shadow-xs"
            >
                <div class="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                    <Calendar class="w-6 h-6" />
                </div>
                <div>
                    <p class="text-xs text-gray-400 font-bold uppercase">
                        Program Aktif
                    </p>
                    <p class="text-2xl font-black text-gray-800 mt-0.5">
                        {{ activeCampaigns }}
                    </p>
                </div>
            </div>

            <div
                class="bg-white border border-gray-200 p-6 rounded-3xl flex items-center gap-4 shadow-xs"
            >
                <div class="p-3 bg-red-50 text-red-500 rounded-2xl">
                    <X class="w-6 h-6" />
                </div>
                <div>
                    <p class="text-xs text-gray-400 font-bold uppercase">
                        Program Selesai
                    </p>
                    <p class="text-2xl font-black text-gray-800 mt-0.5">
                        {{ closedCampaigns }}
                    </p>
                </div>
            </div>

            <div
                class="bg-white border border-gray-200 p-6 rounded-3xl flex items-center gap-4 shadow-xs"
            >
                <div class="p-3 bg-yellow-50 text-yellow-600 rounded-2xl">
                    <Coins class="w-6 h-6" />
                </div>
                <div>
                    <p class="text-xs text-gray-400 font-bold uppercase">
                        Total Terkumpul
                    </p>
                    <p class="text-xl font-black text-gray-800 mt-0.5 truncate">
                        {{ formatCurrency(totalCollected) }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Campaigns List -->
        <div
            class="bg-white border border-gray-200 rounded-3xl shadow-xs overflow-hidden"
        >
            <div
                class="p-6 border-b border-gray-100 flex justify-between items-center"
            >
                <h3 class="font-extrabold text-gray-850 text-lg">
                    Daftar Program Donasi
                </h3>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr
                            class="bg-gray-50 border-b border-gray-150 text-[10px] font-bold text-gray-400 uppercase tracking-wider"
                        >
                            <th class="p-6">Program</th>
                            <th class="p-6">Target / Terkumpul</th>
                            <th class="p-6">Progress</th>
                            <th class="p-6">Status</th>
                            <th class="p-6 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 text-sm">
                        <tr
                            v-for="c in campaigns"
                            :key="c.id"
                            class="hover:bg-gray-50/50 transition-colors"
                        >
                            <!-- Column 1: Info -->
                            <td class="p-6 flex items-start gap-4">
                                <img
                                    :src="c.banner"
                                    class="w-16 h-10 object-cover rounded-lg bg-gray-100 shadow-xs shrink-0 border border-gray-200"
                                />
                                <div class="space-y-0.5">
                                    <h4
                                        class="font-bold text-gray-800 leading-snug line-clamp-1 max-w-sm"
                                    >
                                        {{ c.title }}
                                    </h4>
                                    <p
                                        class="text-xs text-gray-450 font-semibold"
                                    >
                                        Slug: {{ c.slug }}
                                    </p>
                                </div>
                            </td>

                            <!-- Column 2: Amounts -->
                            <td class="p-6">
                                <div class="space-y-0.5">
                                    <p
                                        class="font-semibold text-gray-500 text-xs"
                                    >
                                        Target:
                                        {{ formatCurrency(c.targetAmount) }}
                                    </p>
                                    <p
                                        class="font-extrabold text-[#0B4A3F] text-xs"
                                    >
                                        Terkumpul:
                                        {{ formatCurrency(c.collectedAmount) }}
                                    </p>
                                </div>
                            </td>

                            <!-- Column 3: Progress Bar -->
                            <td class="p-6">
                                <div class="w-36 space-y-1.5">
                                    <div
                                        class="w-full bg-gray-200 h-2 rounded-full overflow-hidden"
                                    >
                                        <div
                                            class="bg-emerald-500 h-full rounded-full transition-all duration-350"
                                            :style="`width: ${calculatePercentage(c.collectedAmount, c.targetAmount)}%`"
                                        ></div>
                                    </div>
                                    <div
                                        class="flex justify-between items-center text-[10px] font-bold text-gray-500"
                                    >
                                        <span
                                            >{{
                                                calculatePercentage(
                                                    c.collectedAmount,
                                                    c.targetAmount,
                                                )
                                            }}%</span
                                        >
                                        <span>{{
                                            new Date(
                                                c.endDate,
                                            ).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "short",
                                            })
                                        }}</span>
                                    </div>
                                </div>
                            </td>

                            <!-- Column 4: Status -->
                            <td class="p-6">
                                <span
                                    v-if="c.status === 'PUBLISHED'"
                                    class="bg-teal-100 text-teal-700 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider"
                                >
                                    Aktif
                                </span>
                                <span
                                    v-else-if="c.status === 'CLOSED'"
                                    class="bg-red-100 text-red-650 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider"
                                >
                                    Selesai
                                </span>
                                <span
                                    v-else
                                    class="bg-gray-150 text-gray-600 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider"
                                >
                                    Draft
                                </span>
                            </td>

                            <!-- Column 5: Action Buttons -->
                            <td
                                class="p-6 text-right space-x-1.5 shrink-0 whitespace-nowrap"
                            >
                                <!-- Update Nominal Button -->
                                <button
                                    class="p-2 text-yellow-600 hover:bg-yellow-50 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1 font-bold text-xs"
                                    title="Update Nominal"
                                    @click="openUpdateNominal(c)"
                                >
                                    <Coins class="w-4 h-4" /> + Nominal
                                </button>
                                <!-- History Logs Button -->
                                <button
                                    class="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1 font-bold text-xs"
                                    title="Riwayat Donasi"
                                    @click="openHistory(c)"
                                >
                                    <History class="w-4 h-4" /> Riwayat
                                </button>
                                <!-- Edit Button -->
                                <button
                                    class="p-2 text-teal-600 hover:bg-teal-50 rounded-xl transition-colors cursor-pointer"
                                    title="Edit Program"
                                    @click="openEdit(c)"
                                >
                                    <Edit2 class="w-4 h-4" />
                                </button>
                                <!-- Delete Button -->
                                <button
                                    class="p-2 text-red-600 hover:bg-red-55 rounded-xl transition-colors cursor-pointer"
                                    title="Hapus Program"
                                    @click="deleteCampaign(c.id)"
                                >
                                    <Trash2 class="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                        <tr v-if="!campaigns || campaigns.length === 0">
                            <td
                                colspan="5"
                                class="p-8 text-center text-gray-400"
                            >
                                Belum ada program donasi. Silakan tambah program
                                baru.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Campaign Form Modal -->
        <div
            v-if="showFormModal"
            class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            @click.self="showFormModal = false"
        >
            <div
                class="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 overflow-y-auto max-h-[90vh]"
            >
                <h3
                    class="font-bold text-gray-800 text-lg border-b border-gray-100 pb-2"
                >
                    {{
                        editingCampaign
                            ? "Edit Program Donasi"
                            : "Tambah Program Donasi Baru"
                    }}
                </h3>

                <div class="space-y-3">
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Judul Program</label
                        >
                        <input
                            v-model="form.title"
                            type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-550"
                            @input="generateSlug"
                        />
                    </div>

                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Slug URL</label
                        >
                        <input
                            v-model="form.slug"
                            type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-550"
                            :disabled="!!editingCampaign"
                        />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                                >Target Donasi (IDR)</label
                            >
                            <input
                                v-model="form.targetAmount"
                                type="number"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-550"
                            />
                        </div>
                        <div class="space-y-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                                >Status</label
                            >
                            <select
                                v-model="form.status"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-550 bg-white"
                            >
                                <option value="DRAFT">Draft</option>
                                <option value="PUBLISHED">
                                    Aktif (Published)
                                </option>
                                <option value="CLOSED">Selesai (Closed)</option>
                            </select>
                        </div>
                    </div>

                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Banner Image URL</label
                        >
                        <input
                            v-model="form.banner"
                            type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-550"
                        />
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                                >Tanggal Mulai</label
                            >
                            <input
                                v-model="form.startDate"
                                type="date"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-550"
                            />
                        </div>
                        <div class="space-y-1">
                            <label
                                class="text-xs font-bold text-gray-500 uppercase"
                                >Tanggal Berakhir</label
                            >
                            <input
                                v-model="form.endDate"
                                type="date"
                                class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-550"
                            />
                        </div>
                    </div>

                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Nomor WhatsApp Admin</label
                        >
                        <input
                            v-model="form.whatsappNumber"
                            type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-550"
                            placeholder="Contoh: 08123456789"
                        />
                    </div>

                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Template Pesan WhatsApp</label
                        >
                        <textarea
                            v-model="form.whatsappTemplate"
                            rows="4"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-550"
                            placeholder="Gunakan [JUDUL] untuk menyisipkan judul program otomatis"
                        />
                    </div>

                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Deskripsi Program</label
                        >
                        <textarea
                            v-model="form.description"
                            rows="4"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-550"
                        />
                    </div>
                </div>

                <div
                    class="flex justify-end gap-3 border-t border-gray-100 pt-4"
                >
                    <button
                        class="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl text-xs font-semibold cursor-pointer"
                        @click="showFormModal = false"
                    >
                        Batal
                    </button>
                    <button
                        class="px-5 py-2.5 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer inline-flex items-center gap-1.5"
                        @click="saveCampaign"
                    >
                        <Save class="w-4 h-4" /> Simpan Program
                    </button>
                </div>
            </div>
        </div>

        <!-- Update Nominal Modal -->
        <div
            v-if="showNominalModal"
            class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            @click.self="showNominalModal = false"
        >
            <div
                class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4"
            >
                <h3
                    class="font-bold text-gray-800 text-lg border-b border-gray-100 pb-2"
                >
                    Update Nominal Donasi Manual
                </h3>
                <p class="text-xs text-gray-400">
                    Program: <b>{{ targetCampaign?.title }}</b>
                </p>

                <div class="space-y-3">
                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Jenis Koreksi</label
                        >
                        <select
                            v-model="nominalForm.type"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-550 bg-white"
                        >
                            <option value="ADDITION">
                                Penambahan (+) Dana Diterima
                            </option>
                            <option value="REDUCTION">
                                Pengurangan (-) Koreksi Salah Input
                            </option>
                        </select>
                    </div>

                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Nominal Dana (IDR)</label
                        >
                        <input
                            v-model="nominalForm.amount"
                            type="number"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-550"
                        />
                    </div>

                    <div class="space-y-1">
                        <label class="text-xs font-bold text-gray-500 uppercase"
                            >Catatan / Keterangan</label
                        >
                        <input
                            v-model="nominalForm.note"
                            type="text"
                            class="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-550"
                            placeholder="Contoh: Sedekah Hamba Allah via transfer Mandiri"
                        />
                    </div>
                </div>

                <div
                    class="flex justify-end gap-3 border-t border-gray-100 pt-4"
                >
                    <button
                        class="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-xl text-xs font-semibold cursor-pointer"
                        @click="showNominalModal = false"
                    >
                        Batal
                    </button>
                    <button
                        class="px-5 py-2.5 bg-[#0B4A3F] hover:bg-[#0E5C4E] text-white font-bold rounded-xl text-xs shadow-sm cursor-pointer"
                        @click="saveNominal"
                    >
                        Simpan Perubahan
                    </button>
                </div>
            </div>
        </div>

        <!-- History Logs Modal -->
        <div
            v-if="showHistoryModal"
            class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            @click.self="showHistoryModal = false"
        >
            <div
                class="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4"
            >
                <div
                    class="flex justify-between items-center border-b border-gray-100 pb-2"
                >
                    <h3 class="font-bold text-gray-800 text-lg">
                        Riwayat Update Nominal Donasi
                    </h3>
                    <button
                        class="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-650 cursor-pointer"
                        @click="showHistoryModal = false"
                    >
                        <X class="w-5 h-5" />
                    </button>
                </div>

                <p class="text-xs text-gray-400">
                    Program: <b>{{ targetCampaign?.title }}</b>
                </p>

                <div v-if="historiesLoading" class="flex justify-center py-8">
                    <div
                        class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0B4A3F]"
                    ></div>
                </div>

                <div
                    v-else
                    class="overflow-y-auto max-h-[50vh] border border-gray-150 rounded-2xl"
                >
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr
                                class="bg-gray-50 border-b border-gray-150 text-[10px] font-bold text-gray-400 uppercase tracking-wider"
                            >
                                <th class="p-4">Tanggal</th>
                                <th class="p-4">Nominal</th>
                                <th class="p-4">Jenis</th>
                                <th class="p-4">Catatan</th>
                                <th class="p-4">Admin</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100 text-xs">
                            <tr
                                v-for="h in histories"
                                :key="h.id"
                                class="hover:bg-gray-50/50"
                            >
                                <td class="p-4 whitespace-nowrap text-gray-500">
                                    {{
                                        new Date(
                                            h.createdAt,
                                        ).toLocaleDateString("id-ID", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })
                                    }}
                                </td>
                                <td class="p-4 font-bold text-gray-800">
                                    {{ formatCurrency(h.amount) }}
                                </td>
                                <td class="p-4">
                                    <span
                                        v-if="h.type === 'ADDITION'"
                                        class="bg-emerald-50 text-emerald-700 text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase"
                                    >
                                        Tambah
                                    </span>
                                    <span
                                        v-else
                                        class="bg-red-50 text-red-650 text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase"
                                    >
                                        Kurang
                                    </span>
                                </td>
                                <td
                                    class="p-4 text-gray-600 font-medium max-w-48 truncate"
                                    :title="h.note"
                                >
                                    {{ h.note || "-" }}
                                </td>
                                <td class="p-4 text-gray-500 font-semibold">
                                    {{ h.createdBy }}
                                </td>
                            </tr>
                            <tr v-if="!histories || histories.length === 0">
                                <td
                                    colspan="5"
                                    class="p-6 text-center text-gray-400"
                                >
                                    Belum ada riwayat update nominal untuk
                                    program ini.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
