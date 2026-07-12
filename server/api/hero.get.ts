export default defineEventHandler(async (event) => {
  try {
    const hero = await prisma.heroSettings.findUnique({
      where: { id: "hero" },
    });
    const fallback = {
      id: "hero",
      title: "Pondok Pesantren Ashhaburratib",
      subtitle:
        "Membentuk Generasi Qur'ani, Berakhlak Mulia, dan Berwawasan Luas",
      bgImage:
        "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=1200&auto=format&fit=crop",
      btnText: "Daftar Sekarang",
      btnLink: "/information/services",
    };
    return sendSuccess(
      event,
      "Hero settings retrieved successfully",
      hero || fallback
    );
  } catch (err: any) {
    throw sendErrorResponse(500, err.message || "Failed to retrieve hero settings");
  }
});
