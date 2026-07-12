export default defineEventHandler(async (event) => {
  try {
    const method = getMethod(event);

    if (method === "GET") {
      const data = await prisma.program.findMany({
        orderBy: { order: "asc" },
      });
      return sendSuccess(event, "Programs retrieved successfully", data);
    }

    if (method === "POST") {
      const body = await readBody(event);
      const { title, description, icon, order } = body;
      const data = await prisma.program.create({
        data: {
          title,
          description,
          icon,
          order: Number(order) || 0,
        },
      });
      return sendSuccess(event, "Program pendidikan berhasil ditambahkan", data, null, 201);
    }

    if (method === "PUT") {
      const body = await readBody(event);
      const { id, title, description, icon, order } = body;
      const data = await prisma.program.update({
        where: { id },
        data: {
          title,
          description,
          icon,
          order: Number(order) || 0,
        },
      });
      return sendSuccess(event, "Program pendidikan berhasil diperbarui", data);
    }

    if (method === "DELETE") {
      const query = getQuery(event);
      const id = query.id as string;
      if (!id) {
        throw sendErrorResponse(400, "ID wajib diisi");
      }
      const data = await prisma.program.delete({
        where: { id },
      });
      return sendSuccess(event, "Program pendidikan berhasil dihapus", data);
    }
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Terjadi kesalahan pada server");
  }
});
