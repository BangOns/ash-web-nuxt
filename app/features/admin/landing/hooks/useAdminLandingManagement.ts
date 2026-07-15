import { ref } from "vue";
import type { Program, Testimonial } from "~/types";

/**
 * Hook untuk mengelola state dan logika Landing Page CMS (Hero, Program Pendidikan, & Testimoni)
 */
export const useAdminLandingManagement = async () => {
  const heroApi = useHeroApi();
  const programsApi = useProgramsApi();
  const testimonialsApi = useTestimonialsApi();
  const { uploadFile } = useAppFileUpload();

  // Memuat seluruh data landing page secara paralel
  const [heroRes, programsRes, testimonialsRes] = await Promise.all([
    heroApi.getHero(),
    programsApi.getPrograms(),
    testimonialsApi.getTestimonials(),
  ]);

  const { data: hero, refresh: refreshHero } = heroRes;
  const { data: programs, refresh: refreshPrograms } = programsRes;
  const { data: testimonials, refresh: refreshTestimonials } = testimonialsRes;

  // ==========================================
  // STATE & LOGIKA HERO SECTION
  // ==========================================

  const heroLoading = ref(false);
  const heroSaved = ref(false);

  /**
   * Menyimpan perubahan konten Hero banner
   */
  const saveHero = async () => {
    heroLoading.value = true;
    heroSaved.value = false;
    try {
      if (hero.value) {
        await heroApi.saveHero(hero.value);
        heroSaved.value = true;
        setTimeout(() => (heroSaved.value = false), 3000); // Reset notifikasi sukses setelah 3 detik
        await refreshHero();
      }
    } catch (err) {
      console.error("Gagal menyimpan hero:", err);
    } finally {
      heroLoading.value = false;
    }
  };

  /**
   * Mengunggah gambar background baru untuk Hero
   */
  const handleHeroUpload = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target.files?.length) return;
    const file = target.files[0];
    if (!file) return;
    const url = await uploadFile(file);
    if (hero.value && url) hero.value.bgImage = url;
  };

  // ==========================================
  // STATE & LOGIKA PROGRAM PENDIDIKAN
  // ==========================================

  const showProgramModal = ref(false);
  const editingProgram = ref<Program | null>(null);
  const programForm = ref({
    id: "",
    title: "",
    description: "",
    icon: "GraduationCap",
    order: 1,
  });

  /**
   * Membuka modal tambah program baru
   */
  const openAddProgram = () => {
    editingProgram.value = null;
    programForm.value = {
      id: "",
      title: "",
      description: "",
      icon: "GraduationCap",
      order: (programs.value?.length || 0) + 1,
    };
    showProgramModal.value = true;
  };

  /**
   * Membuka modal edit program yang dipilih
   * @param prog Objek program
   */
  const openEditProgram = (prog: Program) => {
    editingProgram.value = prog;
    programForm.value = { ...prog };
    showProgramModal.value = true;
  };

  /**
   * Menyimpan program pendidikan (tambah baru / perbarui yang lama)
   */
  const saveProgram = async () => {
    try {
      if (editingProgram.value) {
        await programsApi.updateProgram(programForm.value);
      } else {
        await programsApi.createProgram(programForm.value);
      }
      showProgramModal.value = false;
      await refreshPrograms(); // Refresh daftar program
    } catch (err) {
      console.error("Gagal menyimpan program:", err);
    }
  };

  /**
   * Menghapus program berdasarkan ID setelah konfirmasi
   * @param id ID program
   */
  const deleteProgram = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus program ini?")) return;
    try {
      await programsApi.deleteProgram(id);
      await refreshPrograms(); // Refresh daftar program setelah dihapus
    } catch (err) {
      console.error("Gagal menghapus program:", err);
    }
  };

  // ==========================================
  // STATE & LOGIKA TESTIMONI
  // ==========================================

  const showTestiModal = ref(false);
  const editingTesti = ref<Testimonial | null>(null);
  const testiForm = ref({
    id: "",
    name: "",
    position: "",
    photo: "",
    testimonial: "",
  });

  /**
   * Membuka modal tambah testimoni baru
   */
  const openAddTesti = () => {
    editingTesti.value = null;
    testiForm.value = {
      id: "",
      name: "",
      position: "",
      photo:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      testimonial: "",
    };
    showTestiModal.value = true;
  };

  /**
   * Membuka modal edit testimoni yang dipilih
   * @param testi Objek testimoni
   */
  const openEditTesti = (testi: Testimonial) => {
    editingTesti.value = testi;
    testiForm.value = { ...testi };
    showTestiModal.value = true;
  };

  /**
   * Mengunggah foto baru untuk testimoni
   */
  const handleTestiUpload = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target.files?.length) return;
    const file = target.files[0];
    if (!file) return;
    const url = await uploadFile(file);
    if (url) testiForm.value.photo = url;
  };

  /**
   * Menyimpan testimoni (tambah baru / perbarui yang lama)
   */
  const saveTesti = async () => {
    try {
      if (editingTesti.value) {
        await testimonialsApi.updateTestimonial(testiForm.value);
      } else {
        await testimonialsApi.createTestimonial(testiForm.value);
      }
      showTestiModal.value = false;
      await refreshTestimonials(); // Refresh daftar testimoni
    } catch (err) {
      console.error("Gagal menyimpan testimoni:", err);
    }
  };

  /**
   * Menghapus testimoni berdasarkan ID setelah konfirmasi
   * @param id ID testimoni
   */
  const deleteTesti = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) return;
    try {
      await testimonialsApi.deleteTestimonial(id);
      await refreshTestimonials(); // Refresh daftar testimoni setelah dihapus
    } catch (err) {
      console.error("Gagal menghapus testimoni:", err);
    }
  };

  // State tab aktif ('hero', 'programs', atau 'testimonials')
  const activeTab = ref("hero");

  return {
    hero,
    heroLoading,
    heroSaved,
    programs,
    showProgramModal,
    editingProgram,
    programForm,
    testimonials,
    showTestiModal,
    editingTesti,
    testiForm,
    activeTab,
    saveHero,
    handleHeroUpload,
    openAddProgram,
    openEditProgram,
    saveProgram,
    deleteProgram,
    openAddTesti,
    openEditTesti,
    handleTestiUpload,
    saveTesti,
    deleteTesti,
  };
};
