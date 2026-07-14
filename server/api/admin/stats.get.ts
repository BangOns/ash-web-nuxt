export default defineEventHandler(async (event) => {
  try {
    const [
      totalNews,
      totalAnnouncements,
      totalAgenda,
      totalGallery,
      totalMessages,
      viewsResult,
      popularNews,
      recentMessages,
    ] = await Promise.all([
      prisma.news.count(),
      prisma.announcement.count(),
      prisma.agenda.count(),
      prisma.gallery.count(),
      prisma.visitorMessage.count(),
      prisma.news.aggregate({
        _sum: {
          totalViews: true,
        },
      }),
      prisma.news.findMany({
        orderBy: {
          totalViews: "desc",
        },
        take: 5,
      }),
      prisma.visitorMessage.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),
    ]);

    const totalViews = viewsResult._sum.totalViews || 0;

    const stats = {
      totalNews,
      totalViews,
      totalAnnouncements,
      totalAgenda,
      totalGallery,
      totalMessages,
      popularNews,
      recentMessages,
    };

    return sendSuccess(event, "Dashboard stats retrieved successfully", stats);
  } catch (err: any) {
    throw sendErrorResponse(550, err.message || "Failed to retrieve dashboard stats");
  }
});
