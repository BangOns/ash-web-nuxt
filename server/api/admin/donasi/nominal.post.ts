export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { campaignId, amount, type, note } = body;

    if (!campaignId || amount === undefined || !type) {
      throw sendErrorResponse(400, "campaignId, amount, dan type wajib diisi");
    }

    if (type !== "ADDITION" && type !== "REDUCTION") {
      throw sendErrorResponse(400, "Type harus ADDITION atau REDUCTION");
    }

    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      throw sendErrorResponse(400, "Nominal harus berupa angka positif");
    }

    const campaign = await prisma.donationCampaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) {
      throw sendErrorResponse(404, "Campaign tidak ditemukan");
    }

    const multiplier = type === "ADDITION" ? 1 : -1;
    const delta = numericAmount * multiplier;
    const newCollected = Math.max(0, campaign.collectedAmount + delta);

    const adminName = event.context.admin?.name || "Admin";

    const [updatedCampaign, history] = await prisma.$transaction([
      prisma.donationCampaign.update({
        where: { id: campaignId },
        data: { collectedAmount: newCollected },
      }),
      prisma.donationHistory.create({
        data: {
          campaignId,
          amount: numericAmount,
          type,
          note: note || "",
          createdBy: adminName,
        },
      }),
    ]);

    return sendSuccess(event, "Nominal donasi berhasil diperbarui", {
      campaign: updatedCampaign,
      history,
    });
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Gagal memperbarui nominal donasi");
  }
});
