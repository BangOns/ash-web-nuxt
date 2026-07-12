export default defineEventHandler(async (event) => {
  try {
    const method = getMethod(event);

    if (method === "GET") {
      const data = await prisma.testimonial.findMany();
      return sendSuccess(event, "Testimonials retrieved successfully", data);
    }

    if (method === "POST") {
      const body = await readBody(event);
      const { name, position, photo, testimonial } = body;
      const data = await prisma.testimonial.create({
        data: { name, position, photo, testimonial },
      });
      return sendSuccess(event, "Testimoni berhasil ditambahkan", data, null, 201);
    }

    if (method === "PUT") {
      const body = await readBody(event);
      const { id, name, position, photo, testimonial } = body;
      const data = await prisma.testimonial.update({
        where: { id },
        data: { name, position, photo, testimonial },
      });
      return sendSuccess(event, "Testimoni berhasil diperbarui", data);
    }

    if (method === "DELETE") {
      const query = getQuery(event);
      const id = query.id as string;
      if (!id) {
        throw sendErrorResponse(400, "ID wajib diisi");
      }
      const data = await prisma.testimonial.delete({
        where: { id },
      });
      return sendSuccess(event, "Testimoni berhasil dihapus", data);
    }
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Terjadi kesalahan pada server");
  }
});
