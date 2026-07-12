export default defineEventHandler(async (event) => {
  try {
    const method = getMethod(event);

    if (method === "GET") {
      const data = await prisma.organization.findMany({
        orderBy: { order: "asc" },
      });
      return sendSuccess(event, "Organization list retrieved successfully", data);
    }

    if (method === "POST") {
      const body = await readBody(event);
      const { name, position, photo, order } = body;
      const data = await prisma.organization.create({
        data: {
          name,
          position,
          photo,
          order: Number(order) || 0,
        },
      });
      return sendSuccess(event, "Pengurus berhasil ditambahkan", data, null, 201);
    }

    if (method === "PUT") {
      const body = await readBody(event);
      const { id, name, position, photo, order } = body;
      const data = await prisma.organization.update({
        where: { id },
        data: {
          name,
          position,
          photo,
          order: Number(order) || 0,
        },
      });
      return sendSuccess(event, "Pengurus berhasil diperbarui", data);
    }

    if (method === "DELETE") {
      const query = getQuery(event);
      const id = query.id as string;
      if (!id) {
        throw sendErrorResponse(400, "ID wajib diisi");
      }
      const data = await prisma.organization.delete({
        where: { id },
      });
      return sendSuccess(event, "Pengurus berhasil dihapus", data);
    }
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Terjadi kesalahan pada server");
  }
});
