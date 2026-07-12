export default defineEventHandler(async (event) => {
  try {
    const data = await prisma.announcement.findMany({
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(event, "Announcements retrieved successfully", data);
  } catch (err: any) {
    throw sendErrorResponse(
      500,
      err.message || "Failed to retrieve announcements",
    );
  }
});
