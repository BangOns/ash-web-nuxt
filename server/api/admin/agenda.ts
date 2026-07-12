export default defineEventHandler(async (event) => {
  try {
    const method = getMethod(event);

    if (method === "GET") {
      const data = await prisma.agenda.findMany({
        orderBy: { startDate: "asc" },
      });
      return sendSuccess(event, "Agenda retrieved successfully", data);
    }

    if (method === "POST") {
      const body = await readBody(event);
      const { title, description, location, startDate, endDate, time } = body;
      const data = await prisma.agenda.create({
        data: {
          title,
          description,
          location,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          time: time || "",
        },
      });
      return sendSuccess(event, "Agenda berhasil ditambahkan", data, null, 201);
    }

    if (method === "PUT") {
      const body = await readBody(event);
      const { id, title, description, location, startDate, endDate, time } = body;
      const data = await prisma.agenda.update({
        where: { id },
        data: {
          title,
          description,
          location,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          time: time || "",
        },
      });
      return sendSuccess(event, "Agenda berhasil diperbarui", data);
    }

    if (method === "DELETE") {
      const query = getQuery(event);
      const id = query.id as string;
      if (!id) {
        throw sendErrorResponse(400, "ID wajib diisi");
      }
      const data = await prisma.agenda.delete({
        where: { id },
      });
      return sendSuccess(event, "Agenda berhasil dihapus", data);
    }
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Terjadi kesalahan pada server");
  }
});
