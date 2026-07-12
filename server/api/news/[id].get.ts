export default defineEventHandler(async (event) => {
  try {
    const id = getRouterParam(event, "id");
    if (!id) {
      throw sendErrorResponse(400, "ID atau slug berita wajib diisi");
    }

    // Find by slug first, then by ID
    let news = await prisma.news.findUnique({
      where: { slug: id },
    });

    if (!news) {
      news = await prisma.news.findUnique({
        where: { id },
      });
    }

    if (!news) {
      throw sendErrorResponse(404, "Berita tidak ditemukan");
    }

    // Increment views
    const updatedNews = await prisma.news.update({
      where: { id: news.id },
      data: { totalViews: { increment: 1 } },
    });

    return sendSuccess(event, "Detail berita berhasil dimuat", updatedNews);
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Gagal memuat detail berita");
  }
});
