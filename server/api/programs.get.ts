export default defineEventHandler(async (event) => {
  try {
    const data = await prisma.program.findMany({
      orderBy: { order: "asc" },
    });
    return sendSuccess(event, "Programs retrieved successfully", data);
  } catch (err: any) {
    throw sendErrorResponse(500, err.message || "Failed to retrieve programs");
  }
});
