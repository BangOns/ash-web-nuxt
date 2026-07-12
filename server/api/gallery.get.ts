export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const type = query.type as string;

    let data;
    if (type) {
      data = await prisma.gallery.findMany({
        where: { type: type.toUpperCase() as "IMAGE" | "VIDEO" },
      });
    } else {
      data = await prisma.gallery.findMany();
    }
    return sendSuccess(event, "Gallery retrieved successfully", data);
  } catch (err: any) {
    throw sendErrorResponse(500, err.message || "Failed to retrieve gallery");
  }
});
