export default defineEventHandler(async (event) => {
  try {
    const data = await prisma.organization.findMany({
      orderBy: { order: "asc" },
    });
    return sendSuccess(event, "Organization structure retrieved successfully", data);
  } catch (err: any) {
    throw sendErrorResponse(500, err.message || "Failed to retrieve organization structure");
  }
});
