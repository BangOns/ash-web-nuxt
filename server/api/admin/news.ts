export default defineEventHandler(async (event) => {
  try {
    const method = getMethod(event);

    if (method === "GET") {
      const data = await prisma.news.findMany({
        orderBy: { createdAt: "desc" },
      });
      return sendSuccess(event, "News retrieved successfully", data);
    }

    if (method === "POST") {
      const body = await readBody(event);
      const { title, slug, thumbnail, excerpt, content, category, status } =
        body;

      const finalSlug =
        slug ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      const data = await prisma.news.create({
        data: {
          title,
          slug: finalSlug,
          thumbnail,
          excerpt,
          content,
          category,
          status: status || "DRAFT",
        },
      });
      return sendSuccess(event, "Berita berhasil dibuat", data, null, 201);
    }

    if (method === "PUT") {
      const body = await readBody(event);
      const { id, title, slug, thumbnail, excerpt, content, category, status } =
        body;

      const finalSlug =
        slug ||
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      const data = await prisma.news.update({
        where: { id },
        data: {
          title,
          slug: finalSlug,
          thumbnail,
          excerpt,
          content,
          category,
          status: status || "DRAFT",
        },
      });
      return sendSuccess(event, "Berita berhasil diperbarui", data);
    }

    if (method === "DELETE") {
      const query = getQuery(event);
      const id = query.id as string;
      if (!id) {
        throw sendErrorResponse(400, "ID wajib diisi");
      }
      const data = await prisma.news.delete({
        where: { id },
      });
      return sendSuccess(event, "Berita berhasil dihapus", data);
    }
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Terjadi kesalahan pada server");
  }
});
