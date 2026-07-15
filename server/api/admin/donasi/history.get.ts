export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const campaignId = query.campaignId as string;

    if (!campaignId) {
      throw sendErrorResponse(400, "campaignId is required");
    }

    const histories = await prisma.donationHistory.findMany({
      where: { campaignId },
      orderBy: { createdAt: "desc" },
    });

    return sendSuccess(event, "Histories retrieved successfully", histories);
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Failed to retrieve donation histories");
  }
});
