export default defineEventHandler(async (event) => {
  try {
    const campaigns = await prisma.donationCampaign.findMany({
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(event, "All campaigns retrieved successfully", campaigns);
  } catch (err: any) {
    throw sendErrorResponse(500, err.message || "Failed to retrieve campaigns");
  }
});
