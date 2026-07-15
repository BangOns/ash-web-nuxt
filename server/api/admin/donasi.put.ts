export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const {
      id,
      title,
      slug,
      banner,
      description,
      targetAmount,
      whatsappNumber,
      whatsappTemplate,
      startDate,
      endDate,
      status,
    } = body;

    if (!id || !title || !slug || !targetAmount || !whatsappNumber || !whatsappTemplate || !startDate || !endDate) {
      throw sendErrorResponse(400, "Semua field wajib diisi");
    }

    // Check unique slug on other campaigns
    const existing = await prisma.donationCampaign.findFirst({
      where: {
        slug,
        id: { not: id }
      },
    });
    if (existing) {
      throw sendErrorResponse(400, "Slug sudah digunakan");
    }

    const campaign = await prisma.donationCampaign.update({
      where: { id },
      data: {
        title,
        slug,
        banner,
        description,
        targetAmount: Number(targetAmount),
        whatsappNumber,
        whatsappTemplate,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status,
      },
    });

    return sendSuccess(event, "Campaign berhasil diupdate", campaign);
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Gagal mengupdate campaign");
  }
});
