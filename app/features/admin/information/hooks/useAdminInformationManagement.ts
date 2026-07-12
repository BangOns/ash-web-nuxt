import { ref } from "vue";

/**
 * Hook untuk mengelola state dan logika CMS Informasi (Pengumuman & Agenda Kegiatan)
 */
export const useAdminInformationManagement = async () => {
  const annApi = useAnnouncementsApi();
  const agendaApi = useAgendaApi();

  // ==========================================
  // STATE & LOGIKA PENGUMUMAN (ANNOUNCEMENTS)
  // ==========================================

  // Memuat data pengumuman secara real-time dari API
  const { data: announcements, refresh: refreshAnnouncements } =
    await annApi.getAdminAnnouncements();

  // State modal pengumuman
  const showAnnModal = ref(false);

  // Menyimpan data pengumuman yang sedang diedit (null jika mode tambah)
  const editingAnn = ref<any>(null);

  // Form input data pengumuman
  const annForm = ref({
    id: "",
    title: "",
    description: "",
  });

  /**
   * Membuka modal tambah pengumuman baru
   */
  const openAddAnn = () => {
    editingAnn.value = null;
    annForm.value = { id: "", title: "", description: "" };
    showAnnModal.value = true;
  };

  /**
   * Membuka modal edit pengumuman yang dipilih
   * @param ann Objek pengumuman
   */
  const openEditAnn = (ann: any) => {
    editingAnn.value = ann;
    annForm.value = { ...ann };
    showAnnModal.value = true;
  };

  /**
   * Menyimpan pengumuman (tambah baru / perbarui yang lama)
   */
  const saveAnn = async () => {
    try {
      if (editingAnn.value) {
        await annApi.updateAnnouncement(annForm.value);
      } else {
        await annApi.createAnnouncement(annForm.value);
      }
      showAnnModal.value = false;
      await refreshAnnouncements(); // Refresh list pengumuman
    } catch (err) {
      console.error("Gagal menyimpan pengumuman:", err);
    }
  };

  /**
   * Menghapus pengumuman berdasarkan ID
   * @param id ID pengumuman
   */
  const deleteAnn = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) return;
    try {
      await annApi.deleteAnnouncement(id);
      await refreshAnnouncements(); // Refresh list pengumuman setelah dihapus
    } catch (err) {
      console.error("Gagal menghapus pengumuman:", err);
    }
  };

  // ==========================================
  // STATE & LOGIKA AGENDA KEGIATAN (AGENDAS)
  // ==========================================

  // Memuat data agenda kegiatan dari API
  const { data: agendaList, refresh: refreshAgenda } =
    await agendaApi.getAdminAgenda();

  // State modal agenda
  const showAgendaModal = ref(false);

  // Menyimpan data agenda yang sedang diedit (null jika mode tambah)
  const editingAgenda = ref<any>(null);

  // Form input data agenda
  const agendaForm = ref({
    id: "",
    title: "",
    description: "",
    location: "",
    startDate: "",
    endDate: "",
    time: "",
  });

  /**
   * Membuka modal tambah agenda baru (default tanggal hari ini)
   */
  const openAddAgenda = () => {
    editingAgenda.value = null;
    agendaForm.value = {
      id: "",
      title: "",
      description: "",
      location: "",
      startDate: new Date().toISOString().split("T")[0] ?? "",
      endDate: new Date().toISOString().split("T")[0] ?? "",
      time: "",
    };
    showAgendaModal.value = true;
  };

  /**
   * Membuka modal edit agenda yang dipilih
   * @param agenda Objek agenda kegiatan
   */
  const openEditAgenda = (agenda: any) => {
    editingAgenda.value = agenda;
    agendaForm.value = {
      ...agenda,
      startDate: new Date(agenda.startDate).toISOString().split("T")[0],
      endDate: new Date(agenda.endDate).toISOString().split("T")[0],
    };
    showAgendaModal.value = true;
  };

  /**
   * Menyimpan agenda kegiatan (tambah baru / perbarui yang lama)
   */
  const saveAgenda = async () => {
    try {
      if (editingAgenda.value) {
        await agendaApi.updateAgenda(agendaForm.value);
      } else {
        await agendaApi.createAgenda(agendaForm.value);
      }
      showAgendaModal.value = false;
      await refreshAgenda(); // Refresh list agenda
    } catch (err) {
      console.error("Gagal menyimpan agenda:", err);
    }
  };

  /**
   * Menghapus agenda kegiatan berdasarkan ID
   * @param id ID agenda kegiatan
   */
  const deleteAgenda = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus agenda kegiatan ini?"))
      return;
    try {
      await agendaApi.deleteAgenda(id);
      await refreshAgenda(); // Refresh list agenda setelah dihapus
    } catch (err) {
      console.error("Gagal menghapus agenda:", err);
    }
  };

  // State tab aktif ('announcements' atau 'agenda')
  const activeTab = ref("announcements");

  return {
    announcements,
    showAnnModal,
    editingAnn,
    annForm,
    agendaList,
    showAgendaModal,
    editingAgenda,
    agendaForm,
    activeTab,
    openAddAnn,
    openEditAnn,
    saveAnn,
    deleteAnn,
    openAddAgenda,
    openEditAgenda,
    saveAgenda,
    deleteAgenda,
  };
};
