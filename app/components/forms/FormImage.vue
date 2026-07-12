<script setup lang="ts">
import { inject, ref } from "vue";
import FormBase from "./FormBase.vue";
import { Upload } from "@lucide/vue";

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
        console.error("Gagal mengunggah gambar:", err);
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
            <div class="flex items-center gap-4">
                <div
                    class="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 border border-gray-250 flex items-center justify-center shrink-0"
                >
                    <img
                        v-if="field?.state?.value"
                        :src="field.state.value"
                        class="w-full h-full object-cover"
                    />
                    <div v-else class="text-gray-400 text-xs">No image</div>
                    <div
                        v-if="uploading"
                        class="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-xs font-semibold"
                    >
                        Uploading...
                    </div>
                </div>

                <label
                    :class="[
                        'cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-250 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-800 transition-all select-none shadow-sm',
                        disabled || uploading
                            ? 'pointer-events-none opacity-50'
                            : '',
                    ]"
                >
                    <Upload class="w-4 h-4 text-gray-500" />
                    Unggah Gambar
                    <input
                        type="file"
                        accept="image/*"
                        class="hidden"
                        @change="onFileChange($event, field)"
                    />
                </label>
            </div>
        </FormBase>
    </component>
</template>
