<script setup lang="ts">
import { inject } from "vue";
import FormBase from "./FormBase.vue";
import { Upload } from "@lucide/vue";

import type { Component } from "vue";

defineProps<{
    name: string;
    label?: string;
    required?: boolean;
    class?: string;
    disabled?: boolean;
}>();

interface FormContext {
    Field: Component;
}

interface FieldContext {
    handleChange: (value: string) => void;
    handleBlur?: () => void;
    state: {
        value: string | undefined | null;
        meta: {
            errors: Array<{ message?: string } | string | undefined> | string;
        };
    };
}

const form = inject<FormContext | null>("formContext", null);
const { uploadFile, uploading } = useAppFileUpload();

const onFileChange = async (e: Event, field: FieldContext) => {
    const target = e.target as HTMLInputElement;
    if (!target.files?.length) return;
    const file = target.files[0];
    if (!file) return;
    const url = await uploadFile(file);
    if (url && field) {
        field.handleChange(url);
    }
};
</script>

<template>
    <component :is="form.Field" v-if="form" v-slot="{ field }" :name="name">
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
                    >
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
                    >
                </label>
            </div>
        </FormBase>
    </component>
    <FormBase
        v-else
        :label="label"
        :required="required"
        :class="$props.class"
    >
        <div class="flex items-center gap-4">
            <div class="relative w-24 h-24 rounded-2xl overflow-hidden bg-gray-50 border border-gray-250 flex items-center justify-center shrink-0">
                <div class="text-gray-400 text-xs">No image</div>
            </div>
            <label class="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-250 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-800 transition-all select-none shadow-sm opacity-50 pointer-events-none">
                <Upload class="w-4 h-4 text-gray-500" />
                Unggah Gambar
            </label>
        </div>
    </FormBase>
</template>
