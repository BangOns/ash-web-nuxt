import { ref } from "vue";
import type { Organization } from "~/types";

/**
 * Hook untuk mengelola data profil utama pondok pesantren dan kepengurusan organisasi di panel Admin
 */
export const useAdminProfileManagement = async () => {
  const profileApi = useProfileApi();
  const organisasiApi = useOrganisasiApi();
  const { uploadFile } = useFileUpload();

  // Memuat data profil & kepengurusan secara paralel
  const [profileRes, membersRes] = await Promise.all([
    profileApi.getProfile(),
    organisasiApi.getMembers(),
  ]);

  const { data: profile, refresh: refreshProfile } = profileRes;
  const { data: members, refresh: refreshMembers } = membersRes;

  // ==========================================
  // STATE & LOGIKA PROFIL (SEJARAH, VISI, MISI)
  // ==========================================

  const profileLoading = ref(false);
  const profileSaved = ref(false);

  /**
   * Menyimpan perubahan teks Sejarah, Visi, Misi, dan Sambutan Pimpinan
   */
  const saveProfile = async () => {
    profileLoading.value = true;
    profileSaved.value = false;
    try {
      if (profile.value) {
        await profileApi.saveProfile(profile.value);
        profileSaved.value = true;
        setTimeout(() => (profileSaved.value = false), 3000); // Sembunyikan notifikasi setelah 3 detik
        await refreshProfile();
      }
    } catch (err) {
      console.error("Gagal menyimpan profil:", err);
    } finally {
      profileLoading.value = false;
    }
  };

  // ==========================================
  // STATE & LOGIKA STRUKTUR KEPENGURUSAN
  // ==========================================


  const showMemberModal = ref(false);
  const editingMember = ref<Organization | null>(null);
  const memberForm = ref({
    id: "",
    name: "",
    position: "",
    photo: "",
    order: 1,
  });

  /**
   * Membuka modal tambah pengurus/anggota baru
   */
  const openAddMember = () => {
    editingMember.value = null;
    memberForm.value = {
      id: "",
      name: "",
      position: "",
      photo:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200",
      order: (members.value?.length || 0) + 1,
    };
    showMemberModal.value = true;
  };

  /**
   * Membuka modal edit pengurus yang terpilih
   * @param member Objek pengurus
   */
  const openEditMember = (member: Organization) => {
    editingMember.value = member;
    memberForm.value = { ...member };
    showMemberModal.value = true;
  };

  /**
   * Mengunggah foto baru untuk pengurus
   */
  const handleMemberUpload = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target.files?.length) return;
    const file = target.files[0];
    const url = await uploadFile(file);
    if (url) memberForm.value.photo = url;
  };

  /**
   * Menyimpan data pengurus (tambah baru / perbarui yang lama)
   */
  const saveMember = async () => {
    try {
      if (editingMember.value) {
        await organisasiApi.updateMember(memberForm.value);
      } else {
        await organisasiApi.createMember(memberForm.value);
      }
      showMemberModal.value = false;
      await refreshMembers(); // Refresh daftar pengurus
    } catch (err) {
      console.error("Gagal menyimpan anggota:", err);
    }
  };

  /**
   * Menghapus data pengurus dari database setelah konfirmasi
   * @param id ID pengurus
   */
  const deleteMember = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus anggota struktur ini?"))
      return;
    try {
      await organisasiApi.deleteMember(id);
      await refreshMembers(); // Refresh daftar pengurus setelah dihapus
    } catch (err) {
      console.error("Gagal menghapus anggota:", err);
    }
  };

  // State tab aktif ('profile' atau 'structure')
  const activeTab = ref("profile");

  return {
    profile,
    profileLoading,
    profileSaved,
    members,
    showMemberModal,
    editingMember,
    memberForm,
    activeTab,
    saveProfile,
    openAddMember,
    openEditMember,
    handleMemberUpload,
    saveMember,
    deleteMember,
  };
};
