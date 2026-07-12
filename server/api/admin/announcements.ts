export default defineEventHandler(async (event) => {
  try {
    const method = getMethod(event);

    if (method === "GET") {
      const data = await prisma.announcement.findMany({
        orderBy: { createdAt: "desc" },
      });
      return sendSuccess(event, "Announcements retrieved successfully", data);
    }

    if (method === "POST") {
      const body = await readBody(event);
      const { title, description } = body;
      const data = await prisma.announcement.create({
        data: { title, description },
      });
      return sendSuccess(event, "Pengumuman berhasil ditambahkan", data, null, 201);
    }

    if (method === "PUT") {
      const body = await readBody(event);
      const { id, title, description } = body;
      const data = await prisma.announcement.update({
        where: { id },
        data: { title, description },
      });
      return sendSuccess(event, "Pengumuman berhasil diperbarui", data);
    }

    if (method === "DELETE") {
      const query = getQuery(event);
      const id = query.id as string;
      if (!id) {
        throw sendErrorResponse(400, "ID wajib diisi");
      }
      const data = await prisma.announcement.delete({
        where: { id },
      });
      return sendSuccess(event, "Pengumuman berhasil dihapus", data);
    }
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Terjadi kesalahan pada server");
  }
});
