export default defineEventHandler(async (event) => {
  try {
    const method = getMethod(event);

    if (method === "GET") {
      const data = await prisma.gallery.findMany();
      return sendSuccess(event, "Gallery retrieved successfully", data);
    }

    if (method === "POST") {
      const body = await readBody(event);
      const { title, description, type, file, thumbnail } = body;
      const data = await prisma.gallery.create({
        data: {
          title,
          description,
          type: type || "IMAGE",
          file,
          thumbnail: thumbnail || file,
        },
      });
      return sendSuccess(event, "Media berhasil ditambahkan", data, null, 201);
    }

    if (method === "PUT") {
      const body = await readBody(event);
      const { id, title, description, type, file, thumbnail } = body;
      const data = await prisma.gallery.update({
        where: { id },
        data: {
          title,
          description,
          type: type || "IMAGE",
          file,
          thumbnail: thumbnail || file,
        },
      });
      return sendSuccess(event, "Media berhasil diperbarui", data);
    }

    if (method === "DELETE") {
      const query = getQuery(event);
      const id = query.id as string;
      if (!id) {
        throw sendErrorResponse(400, "ID wajib diisi");
      }
      const data = await prisma.gallery.delete({
        where: { id },
      });
      return sendSuccess(event, "Media berhasil dihapus", data);
    }
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Terjadi kesalahan pada server");
  }
});
