import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

/**
 * Hook untuk mengelola editor pembuatan/pengubahan artikel berita
 */
export const useAdminNewsEditorManagement = async () => {
  const route = useRoute();
  const router = useRouter();

  // Mendapatkan query parameter 'id' berita untuk mendeteksi mode edit
  const newsId = route.query.id as string;
  const newsApi = useNewsApi();
  const uploadApi = useUploadApi();

  // State form isian artikel berita
  const form = ref({
    id: "",
    title: "",
    slug: "",
    thumbnail: "",
    excerpt: "",
    content: "",
    category: "Umum",
    status: "DRAFT" as "DRAFT" | "PUBLISHED",
  });

  // State indikator loading data, penyimpanan, dan mode pratinjau
  const loading = ref(false);
  const saving = ref(false);
  const previewMode = ref(false);

  /**
   * Membuat slug URL secara otomatis dari judul berita (hanya di mode tambah berita baru)
   */
  const generateSlug = () => {
    if (!newsId) {
      form.value.slug = form.value.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-") // Mengganti karakter non-alfanumerik dengan strip (-)
        .replace(/(^-|-$)/g, ""); // Menghilangkan strip di awal/akhir
    }
  };

  // Muat data artikel berita jika `newsId` terdeteksi (Mode Edit)
  onMounted(async () => {
    if (newsId) {
      loading.value = true;
      try {
        const { data } = await newsApi.getSingleNews(newsId);
        if (data.value) {
          form.value = {
            id: data.value.id,
            title: data.value.title,
            slug: data.value.slug,
            thumbnail: data.value.thumbnail,
            excerpt: data.value.excerpt,
            content: data.value.content,
            category: data.value.category,
            status: data.value.status,
          };
        }
      } catch (err) {
        console.error("Gagal memuat berita:", err);
      } finally {
        loading.value = false;
      }
    }
  });

  /**
   * Mengunggah gambar sampul (thumbnail) artikel berita baru
   */
  const handleUpload = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target.files?.length) return;
    const file = target.files[0];
    if (!file) return;
    try {
      const res = await uploadApi.upload(file);
      if (res?.url) form.value.thumbnail = res.url;
    } catch (err) {
      console.error("Upload gagal:", err);
    }
  };

  /**
   * Menyimpan data berita (membuat berita baru atau melakukan pembaruan)
   */
  const saveNews = async () => {
    saving.value = true;
    try {
      if (newsId) {
        await newsApi.updateNews(form.value);
      } else {
        await newsApi.createNews(form.value);
      }
      await router.push("/admin/news"); // Alihkan kembali ke halaman daftar berita admin
    } catch (err) {
      console.error("Gagal menyimpan berita:", err);
    } finally {
      saving.value = false;
    }
  };

  return {
    newsId,
    form,
    loading,
    saving,
    previewMode,
    generateSlug,
    handleUpload,
    saveNews,
  };
};
