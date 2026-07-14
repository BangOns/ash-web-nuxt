import { ref } from "vue";
import type { Gallery } from "~/types";

/**
 * Hook untuk mengelola state dan logika halaman Galeri Foto/Video di panel Admin
 */
export const useAdminGalleryManagement = async () => {
  const galleryApi = useGalleryApi();
  const { uploadFile } = useFileUpload();

  // Memuat data galeri secara real-time dari API
  const { data: galleryItems, refresh } = await galleryApi.getAdminGallery();

  // State untuk visibilitas modal edit/tambah
  const showModal = ref(false);

  // Menyimpan data item galeri yang sedang diedit (null jika mode tambah)
  const editingItem = ref<Gallery | null>(null);

  // State form input data galeri
  const form = ref({
    id: "",
    title: "",
    description: "",
    type: "IMAGE" as "IMAGE" | "VIDEO",
    file: "",
    thumbnail: "",
  });

  /**
   * Membuka modal untuk menambah media baru dan mereset form
   */
  const openAdd = () => {
    editingItem.value = null;
    form.value = {
      id: "",
      title: "",
      description: "",
      type: "IMAGE",
      file: "",
      thumbnail: "",
    };
    showModal.value = true;
  };

  /**
   * Membuka modal untuk mengubah data media yang sudah ada
   * @param item Objek media galeri yang dipilih
   */
  const openEdit = (item: Gallery) => {
    editingItem.value = item;
    form.value = { ...item };
    showModal.value = true;
  };

  /**
   * Menangani proses upload berkas gambar atau video thumbnail ke server
   * @param e Event perubahan input file
   * @param field Target field form ('file' atau 'thumbnail') yang diupdate
   */
  const handleUpload = async (e: Event, field: "file" | "thumbnail") => {
    const target = e.target as HTMLInputElement;
    if (!target.files?.length) return;
    const file = target.files[0];
    const url = await uploadFile(file);
    if (url) {
      if (field === "file") {
        form.value.file = url;
        // Jika jenis media adalah foto (IMAGE), samakan thumbnail dengan foto tersebut
        if (form.value.type === "IMAGE") {
          form.value.thumbnail = url;
        }
      } else {
        form.value.thumbnail = url;
      }
    }
  };

  /**
   * Menyimpan data galeri (baik membuat baru maupun memperbarui yang lama)
   */
  const saveItem = async () => {
    try {
      if (editingItem.value) {
        await galleryApi.updateGallery(form.value);
      } else {
        await galleryApi.createGallery(form.value);
      }
      showModal.value = false;
      await refresh(); // Memperbarui daftar tampilan galeri
    } catch (err) {
      console.error("Gagal menyimpan galeri:", err);
    }
  };

  /**
   * Menghapus media galeri berdasarkan ID setelah konfirmasi
   * @param id ID media galeri
   */
  const deleteItem = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus media ini?")) return;
    try {
      await galleryApi.deleteGallery(id);
      await refresh(); // Memperbarui daftar tampilan galeri setelah dihapus
    } catch (err) {
      console.error("Gagal menghapus galeri:", err);
    }
  };

  // State filter untuk memilah tipe media: ALL (semua), IMAGE (foto), atau VIDEO (video)
  const filterType = ref("ALL");

  return {
    galleryItems,
    showModal,
    editingItem,
    form,
    filterType,
    openAdd,
    openEdit,
    handleUpload,
    saveItem,
    deleteItem,
  };
};
