export default defineEventHandler(async (event) => {
  try {
    const profile = await prisma.profileSettings.findUnique({
      where: { id: "profile" },
    });
    const fallback = {
      id: "profile",
      sejarah:
        "Pondok Pesantren Ashhaburratib didirikan dengan tekad mulia...",
      visi: "Terwujudnya generasi Rabbani...",
      misi: "1. Menyelenggarakan pendidikan...",
      sambutan: "Assalamu'alaikum Wr. Wb. Selamat datang...",
    };
    return sendSuccess(
      event,
      "Profile settings retrieved successfully",
      profile || fallback
    );
  } catch (err: any) {
    throw sendErrorResponse(500, err.message || "Failed to retrieve profile settings");
  }
});
