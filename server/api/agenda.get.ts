export default defineEventHandler(async (event) => {
  try {
    const data = await prisma.agenda.findMany({
      orderBy: { startDate: "asc" },
    });
    return sendSuccess(event, "Agenda retrieved successfully", data);
  } catch (err: any) {
    throw sendErrorResponse(500, err.message || "Failed to retrieve agenda");
  }
});
