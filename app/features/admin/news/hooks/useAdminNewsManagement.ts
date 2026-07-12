/**
 * Hook untuk mengelola daftar artikel/berita di panel Admin
 */
export const useAdminNewsManagement = async () => {
  const newsApi = useNewsApi();
  
  // Memuat seluruh daftar berita dari database
  const { data: newsList, refresh } = await newsApi.getAdminNews();

  /**
   * Menghapus artikel berita berdasarkan ID dari database setelah konfirmasi
   * @param id ID artikel berita
   */
  const deleteNews = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) return;
    try {
      await newsApi.deleteNews(id);
      await refresh(); // Memperbarui tampilan daftar berita setelah terhapus
    } catch (err) {
      console.error("Gagal menghapus berita:", err);
    }
  };

  return {
    newsList,
    deleteNews,
  };
};
