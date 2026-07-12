export default defineEventHandler(async (event) => {
  try {
    const data = await prisma.news.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(event, "News articles retrieved successfully", data);
  } catch (err: any) {
    throw sendErrorResponse(500, err.message || "Failed to retrieve news articles");
  }
});
