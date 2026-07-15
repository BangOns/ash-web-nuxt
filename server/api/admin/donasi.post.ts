export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const {
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

    if (!title || !slug || !targetAmount || !whatsappNumber || !whatsappTemplate || !startDate || !endDate) {
      throw sendErrorResponse(400, "Semua field wajib diisi");
    }

    // Check unique slug
    const existing = await prisma.donationCampaign.findUnique({
      where: { slug },
    });
    if (existing) {
      throw sendErrorResponse(400, "Slug sudah digunakan");
    }

    const campaign = await prisma.donationCampaign.create({
      data: {
        title,
        slug,
        banner: banner || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600",
        description,
        targetAmount: Number(targetAmount),
        collectedAmount: 0,
        whatsappNumber,
        whatsappTemplate,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: status || "DRAFT",
      },
    });

    return sendSuccess(event, "Campaign berhasil dibuat", campaign);
  } catch (err: any) {
    if (err.statusCode) throw err;
    throw sendErrorResponse(500, err.message || "Gagal membuat campaign");
  }
});
