export default defineEventHandler(async (event) => {
  try {
    const method = getMethod(event);

    if (method === "GET") {
      const data = await prisma.visitorMessage.findMany({
        orderBy: { createdAt: "desc" },
      });
      return sendSuccess(event, "Messages retrieved successfully", data);
    }

    if (method === "PUT") {
      const body = await readBody(event);
      const { id, status } = body;
      const data = await prisma.visitorMessage.update({
        where: { id },
        data: { status },
      });
      return sendSuccess(event, "Status pesan berhasil diperbarui", data);
    }

    if (method === "DELETE") {
      const query = getQuery(event);
      const id = query.id as string;
      if (!id) {
        throw sendErrorResponse(400, "ID wajib diisi");
      }
      const data = await prisma.visitorMessage.delete({
        where: { id },
      });
      return sendSuccess(event, "Pesan berhasil dihapus", data);
    }
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Terjadi kesalahan pada server");
  }
});
