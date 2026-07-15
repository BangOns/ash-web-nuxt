export default defineEventHandler(async (event) => {
  try {
    const campaigns = await prisma.donationCampaign.findMany({
      where: {
        status: {
          in: ["PUBLISHED", "CLOSED"],
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return sendSuccess(event, "Campaigns retrieved successfully", campaigns);
  } catch (err: any) {
    throw sendErrorResponse(500, err.message || "Failed to retrieve campaigns");
  }
});
