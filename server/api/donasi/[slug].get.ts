export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, "slug");
    if (!slug) {
      throw sendErrorResponse(400, "Slug/ID is required");
    }

    const campaign = await prisma.donationCampaign.findFirst({
      where: {
        OR: [
          { slug: slug },
          { id: slug }
        ]
      }
    });

    if (!campaign) {
      throw sendErrorResponse(404, "Campaign not found");
    }

    return sendSuccess(event, "Campaign retrieved successfully", campaign);
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Failed to retrieve campaign");
  }
});
