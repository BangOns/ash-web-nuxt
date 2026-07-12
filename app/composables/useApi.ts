import type {
  HeroSettings,
  ProfileSettings,
  Program,
  Testimonial,
  Organization,
  News,
  Announcement,
  Agenda,
  Gallery,
  VisitorMessage,
  DashboardStats,
  StandardResponse,
} from "~/types";

// 1. Hero Settings API
export const useHeroApi = () => {
  const getHero = () =>
    useFetch<StandardResponse<HeroSettings>, Error, string, any, any, HeroSettings>(
      "/api/hero",
      {
        transform: (res) => res.data,
      }
    );
  const saveHero = async (body: HeroSettings) => {
    const res = await $fetch<StandardResponse<HeroSettings>>(
      "/api/admin/hero",
      {
        method: "POST",
        body,
      }
    );
    return res.data;
  };
  return { getHero, saveHero };
};

// 2. Profile Settings API
export const useProfileApi = () => {
  const getProfile = () =>
    useFetch<StandardResponse<ProfileSettings>, Error, string, any, any, ProfileSettings>(
      "/api/profile-settings",
      {
        transform: (res) => res.data,
      }
    );
  const saveProfile = async (body: ProfileSettings) => {
    const res = await $fetch<StandardResponse<ProfileSettings>>(
      "/api/admin/profile-settings",
      { method: "POST", body }
    );
    return res.data;
  };
  return { getProfile, saveProfile };
};

// 3. Programs API
export const useProgramsApi = () => {
  const getPrograms = () =>
    useFetch<StandardResponse<Program[]>, Error, string, any, any, Program[]>(
      "/api/programs",
      {
        transform: (res) => res.data,
      }
    );
  const getAdminPrograms = () =>
    useFetch<StandardResponse<Program[]>, Error, string, any, any, Program[]>(
      "/api/admin/programs",
      {
        transform: (res) => res.data,
      }
    );
  const createProgram = async (body: Omit<Program, "id">) => {
    const res = await $fetch<StandardResponse<Program>>(
      "/api/admin/programs",
      {
        method: "POST",
        body,
      }
    );
    return res.data;
  };
  const updateProgram = async (body: Program) => {
    const res = await $fetch<StandardResponse<Program>>(
      "/api/admin/programs",
      {
        method: "PUT",
        body,
      }
    );
    return res.data;
  };
  const deleteProgram = async (id: string) => {
    const res = await $fetch<StandardResponse<Program>>(
      `/api/admin/programs?id=${id}`,
      { method: "DELETE" }
    );
    return res.data;
  };

  return {
    getPrograms,
    getAdminPrograms,
    createProgram,
    updateProgram,
    deleteProgram,
  };
};

// 4. Testimonials API
export const useTestimonialsApi = () => {
  const getTestimonials = () =>
    useFetch<StandardResponse<Testimonial[]>, Error, string, any, any, Testimonial[]>(
      "/api/testimonials",
      {
        transform: (res) => res.data,
      }
    );
  const getAdminTestimonials = () =>
    useFetch<StandardResponse<Testimonial[]>, Error, string, any, any, Testimonial[]>(
      "/api/admin/testimonials",
      {
        transform: (res) => res.data,
      }
    );
  const createTestimonial = async (body: Omit<Testimonial, "id">) => {
    const res = await $fetch<StandardResponse<Testimonial>>(
      "/api/admin/testimonials",
      { method: "POST", body }
    );
    return res.data;
  };
  const updateTestimonial = async (body: Testimonial) => {
    const res = await $fetch<StandardResponse<Testimonial>>(
      "/api/admin/testimonials",
      { method: "PUT", body }
    );
    return res.data;
  };
  const deleteTestimonial = async (id: string) => {
    const res = await $fetch<StandardResponse<Testimonial>>(
      `/api/admin/testimonials?id=${id}`,
      {
        method: "DELETE",
      }
    );
    return res.data;
  };

  return {
    getTestimonials,
    getAdminTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };
};

// 5. Organization / Kepengurusan API
export const useOrganisasiApi = () => {
  const getMembers = () =>
    useFetch<StandardResponse<Organization[]>, Error, string, any, any, Organization[]>(
      "/api/organisasi",
      {
        transform: (res) => res.data,
      }
    );
  const getAdminMembers = () =>
    useFetch<StandardResponse<Organization[]>, Error, string, any, any, Organization[]>(
      "/api/admin/organisasi",
      {
        transform: (res) => res.data,
      }
    );
  const createMember = async (body: Omit<Organization, "id">) => {
    const res = await $fetch<StandardResponse<Organization>>(
      "/api/admin/organisasi",
      { method: "POST", body }
    );
    return res.data;
  };
  const updateMember = async (body: Organization) => {
    const res = await $fetch<StandardResponse<Organization>>(
      "/api/admin/organisasi",
      { method: "PUT", body }
    );
    return res.data;
  };
  const deleteMember = async (id: string) => {
    const res = await $fetch<StandardResponse<Organization>>(
      `/api/admin/organisasi?id=${id}`,
      {
        method: "DELETE",
      }
    );
    return res.data;
  };

  return {
    getMembers,
    getAdminMembers,
    createMember,
    updateMember,
    deleteMember,
  };
};

// 6. News / Artikel API
export const useNewsApi = () => {
  const getNews = () =>
    useFetch<StandardResponse<News[]>, Error, string, any, any, News[]>(
      "/api/news",
      {
        transform: (res) => res.data,
      }
    );
  const getSingleNews = (idOrSlug: string) =>
    useFetch<StandardResponse<News>, Error, string, any, any, News>(
      `/api/news/${idOrSlug}`,
      {
        transform: (res) => res.data,
      }
    );
  const getAdminNews = () =>
    useFetch<StandardResponse<News[]>, Error, string, any, any, News[]>(
      "/api/admin/news",
      {
        transform: (res) => res.data,
      }
    );
  const createNews = async (body: Omit<News, "id" | "totalViews" | "createdAt">) => {
    const res = await $fetch<StandardResponse<News>>("/api/admin/news", {
      method: "POST",
      body,
    });
    return res.data;
  };
  const updateNews = async (body: Omit<News, "totalViews" | "createdAt">) => {
    const res = await $fetch<StandardResponse<News>>("/api/admin/news", {
      method: "PUT",
      body,
    });
    return res.data;
  };
  const deleteNews = async (id: string) => {
    const res = await $fetch<StandardResponse<News>>(
      `/api/admin/news?id=${id}`,
      { method: "DELETE" }
    );
    return res.data;
  };

  return {
    getNews,
    getSingleNews,
    getAdminNews,
    createNews,
    updateNews,
    deleteNews,
  };
};

// 7. Announcements API
export const useAnnouncementsApi = () => {
  const getAnnouncements = () =>
    useFetch<StandardResponse<Announcement[]>, Error, string, any, any, Announcement[]>(
      "/api/announcements",
      {
        transform: (res) => res.data,
      }
    );
  const getAdminAnnouncements = () =>
    useFetch<StandardResponse<Announcement[]>, Error, string, any, any, Announcement[]>(
      "/api/admin/announcements",
      {
        transform: (res) => res.data,
      }
    );
  const createAnnouncement = async (
    body: Omit<Announcement, "id" | "createdAt">
  ) => {
    const res = await $fetch<StandardResponse<Announcement>>(
      "/api/admin/announcements",
      {
        method: "POST",
        body,
      }
    );
    return res.data;
  };
  const updateAnnouncement = async (body: Omit<Announcement, "createdAt">) => {
    const res = await $fetch<StandardResponse<Announcement>>(
      "/api/admin/announcements",
      {
        method: "PUT",
        body,
      }
    );
    return res.data;
  };
  const deleteAnnouncement = async (id: string) => {
    const res = await $fetch<StandardResponse<Announcement>>(
      `/api/admin/announcements?id=${id}`,
      {
        method: "DELETE",
      }
    );
    return res.data;
  };

  return {
    getAnnouncements,
    getAdminAnnouncements,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
  };
};

// 8. Agenda API
export const useAgendaApi = () => {
  const getAgenda = () =>
    useFetch<StandardResponse<Agenda[]>, Error, string, any, any, Agenda[]>(
      "/api/agenda",
      {
        transform: (res) => res.data,
      }
    );
  const getAdminAgenda = () =>
    useFetch<StandardResponse<Agenda[]>, Error, string, any, any, Agenda[]>(
      "/api/admin/agenda",
      {
        transform: (res) => res.data,
      }
    );
  const createAgenda = async (body: Omit<Agenda, "id">) => {
    const res = await $fetch<StandardResponse<Agenda>>("/api/admin/agenda", {
      method: "POST",
      body,
    });
    return res.data;
  };
  const updateAgenda = async (body: Agenda) => {
    const res = await $fetch<StandardResponse<Agenda>>("/api/admin/agenda", {
      method: "PUT",
      body,
    });
    return res.data;
  };
  const deleteAgenda = async (id: string) => {
    const res = await $fetch<StandardResponse<Agenda>>(
      `/api/admin/agenda?id=${id}`,
      { method: "DELETE" }
    );
    return res.data;
  };

  return {
    getAgenda,
    getAdminAgenda,
    createAgenda,
    updateAgenda,
    deleteAgenda,
  };
};

// 9. Gallery API
export const useGalleryApi = () => {
  const getGallery = (type?: "IMAGE" | "VIDEO") =>
    useFetch<StandardResponse<Gallery[]>, Error, string, any, any, Gallery[]>(
      "/api/gallery",
      {
        query: { type },
        transform: (res) => res.data,
      }
    );
  const getAdminGallery = () =>
    useFetch<StandardResponse<Gallery[]>, Error, string, any, any, Gallery[]>(
      "/api/admin/gallery",
      {
        transform: (res) => res.data,
      }
    );
  const createGallery = async (body: Omit<Gallery, "id">) => {
    const res = await $fetch<StandardResponse<Gallery>>("/api/admin/gallery", {
      method: "POST",
      body,
    });
    return res.data;
  };
  const updateGallery = async (body: Gallery) => {
    const res = await $fetch<StandardResponse<Gallery>>("/api/admin/gallery", {
      method: "PUT",
      body,
    });
    return res.data;
  };
  const deleteGallery = async (id: string) => {
    const res = await $fetch<StandardResponse<Gallery>>(
      `/api/admin/gallery?id=${id}`,
      { method: "DELETE" }
    );
    return res.data;
  };

  return {
    getGallery,
    getAdminGallery,
    createGallery,
    updateGallery,
    deleteGallery,
  };
};

// 10. Messages API
export const useMessagesApi = () => {
  const submitMessage = async (
    body: Omit<VisitorMessage, "id" | "status" | "createdAt">
  ) => {
    const res = await $fetch<StandardResponse<VisitorMessage>>(
      "/api/messages",
      {
        method: "POST",
        body,
      }
    );
    return res.data;
  };
  const getAdminMessages = () =>
    useFetch<StandardResponse<VisitorMessage[]>, Error, string, any, any, VisitorMessage[]>(
      "/api/admin/messages",
      {
        transform: (res) => res.data,
      }
    );
  const updateMessageStatus = async (id: string, status: "READ" | "UNREAD") => {
    const res = await $fetch<StandardResponse<VisitorMessage>>(
      "/api/admin/messages",
      {
        method: "PUT",
        body: { id, status },
      }
    );
    return res.data;
  };
  const deleteMessage = async (id: string) => {
    const res = await $fetch<StandardResponse<VisitorMessage>>(
      `/api/admin/messages?id=${id}`,
      {
        method: "DELETE",
      }
    );
    return res.data;
  };

  return {
    submitMessage,
    getAdminMessages,
    updateMessageStatus,
    deleteMessage,
  };
};

// 11. Dashboard Stats API
export const useStatsApi = () => {
  const getStats = () =>
    useFetch<StandardResponse<DashboardStats>, Error, string, any, any, DashboardStats>(
      "/api/admin/stats",
      {
        transform: (res) => res.data,
      }
    );
  return { getStats };
};

// 12. Upload File API
export const useUploadApi = () => {
  const upload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await $fetch<StandardResponse<{ url: string }>>(
      "/api/admin/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    return res.data;
  };
  return { upload };
};
