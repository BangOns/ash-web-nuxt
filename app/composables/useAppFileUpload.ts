import { ref } from "vue";

export const useAppFileUpload = () => {
  const uploadApi = useUploadApi();
  const uploading = ref(false);

  const uploadFile = async (file: File): Promise<string | null> => {
    if (!file) return null;
    uploading.value = true;
    try {
      const res = await uploadApi.upload(file);
      return res?.url || null;
    } catch (err) {
      console.error("Gagal mengunggah file:", err);
      return null;
    } finally {
      uploading.value = false;
    }
  };

  const handleUploadFromEvent = async (e: Event): Promise<string | null> => {
    const target = e.target as HTMLInputElement;
    if (!target.files?.length) return null;
    const file = target.files[0];
    if (!file) return null;
    return await uploadFile(file);
  };

  return {
    uploadFile,
    handleUploadFromEvent,
    uploading,
  };
};
