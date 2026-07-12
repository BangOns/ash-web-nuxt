<script setup lang="ts">
import { inject, ref } from "vue";
import FormBase from "./FormBase.vue";
import { Upload, FileText } from "@lucide/vue";

const props = defineProps<{
    name: string;
    label?: string;
    required?: boolean;
    class?: string;
    disabled?: boolean;
}>();

const form = inject<any>("formContext");
const uploading = ref(false);
const uploadApi = useUploadApi();

const onFileChange = async (e: Event, field: any) => {
    const target = e.target as HTMLInputElement;
    if (!target.files?.length) return;
    const file = target.files[0];
    uploading.value = true;
    try {
        const res = await uploadApi.upload(file);
        if (res?.url && field) {
            field.handleChange(res.url);
        }
    } catch (err) {
        console.error("Gagal mengunggah file:", err);
    } finally {
        uploading.value = false;
    }
};
</script>

<template>
    <component :is="form?.Field" :name="name" v-slot="{ field }">
        <FormBase
            :label="label"
            :required="required"
            :errors="field?.state?.meta?.errors"
            :class="$props.class"
        >
            <div class="flex flex-col gap-2">
                <div
                    v-if="field?.state?.value"
                    class="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 max-w-md"
                >
                    <FileText class="w-4 h-4 text-teal-650 shrink-0" />
                    <span class="truncate">{{
                        field?.state?.value?.split("/")?.pop()
                    }}</span>
                    <a
                        :href="field?.state?.value"
                        target="_blank"
                        class="ml-auto text-teal-650 hover:underline"
                        >Lihat</a
                    >
                </div>

                <label
                    :class="[
                        'cursor-pointer inline-flex items-center justify-center gap-2 w-fit px-4 py-2.5 rounded-xl border border-gray-250 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-800 transition-all select-none shadow-sm',
                        disabled || uploading
                            ? 'pointer-events-none opacity-50'
                            : '',
                    ]"
                >
                    <Upload class="w-4 h-4 text-gray-500" />
                    {{ uploading ? "Mengunggah..." : "Pilih Berkas" }}
                    <input
                        type="file"
                        class="hidden"
                        @change="onFileChange($event, field)"
                    />
                </label>
            </div>
        </FormBase>
    </component>
</template>
