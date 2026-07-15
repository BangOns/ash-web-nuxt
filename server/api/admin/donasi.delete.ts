export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const id = query.id as string;

    if (!id) {
      throw sendErrorResponse(400, "ID is required");
    }

    const campaign = await prisma.donationCampaign.delete({
      where: { id },
    });

    return sendSuccess(event, "Campaign berhasil dihapus", campaign);
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Gagal menghapus campaign");
  }
});
