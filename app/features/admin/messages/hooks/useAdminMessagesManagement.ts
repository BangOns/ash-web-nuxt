import { ref } from "vue";
import type { VisitorMessage } from "~/types";

/**
 * Hook untuk mengelola kotak masuk pesan pengunjung website pada panel Admin
 */
export const useAdminMessagesManagement = async () => {
  const msgApi = useMessagesApi();

  // Memuat data seluruh pesan masuk dari API
  const { data: messages, refresh } = await msgApi.getAdminMessages();

  // State untuk menyimpan pesan yang sedang terpilih/dibuka detailnya
  const selectedMessage = ref<VisitorMessage | null>(null);

  /**
   * Menampilkan isi detail pesan dan mengubah statusnya menjadi dibaca (READ) jika sebelumnya bertipe UNREAD
   * @param msg Objek pesan yang dipilih
   */
  const viewMessage = async (msg: VisitorMessage) => {
    selectedMessage.value = msg;
    if (msg.status === "UNREAD") {
      try {
        await msgApi.updateMessageStatus(msg.id, "READ");
        selectedMessage.value.status = "READ"; // Sinkronkan status reaktif lokal
        await refresh(); // Memperbarui daftar kotak masuk
      } catch (err) {
        console.error("Gagal memperbarui status pesan:", err);
      }
    }
  };

  /**
   * Mengubah status pesan (menandai Belum Dibaca <=> Sudah Dibaca)
   * @param msg Objek pesan
   */
  const toggleStatus = async (msg: VisitorMessage) => {
    const newStatus = msg.status === "READ" ? "UNREAD" : "READ";
    try {
      await msgApi.updateMessageStatus(msg.id, newStatus);
      if (selectedMessage.value?.id === msg.id) {
        selectedMessage.value.status = newStatus;
      }
      await refresh(); // Memperbarui daftar kotak masuk
    } catch (err) {
      console.error("Gagal mengubah status pesan:", err);
    }
  };

  /**
   * Menghapus pesan masuk berdasarkan ID dari database setelah konfirmasi
   * @param id ID pesan masuk
   */
  const deleteMessage = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pesan ini?")) return;
    try {
      await msgApi.deleteMessage(id);
      if (selectedMessage.value?.id === id) {
        selectedMessage.value = null; // Menghilangkan detail panel jika pesan yang dihapus sedang dibuka
      }
      await refresh(); // Memperbarui daftar kotak masuk setelah dihapus
    } catch (err) {
      console.error("Gagal menghapus pesan:", err);
    }
  };

  return {
    messages,
    selectedMessage,
    viewMessage,
    toggleStatus,
    deleteMessage,
  };
};
